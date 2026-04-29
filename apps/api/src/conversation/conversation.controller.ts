// routes/conversation.routes.js
// POST /api/conversations             — patient starts a chat with a doctor
// GET  /api/conversations             — list my conversations (patient or doctor)
// GET  /api/conversations/:id         — get one conversation (validates membership)

import { Router } from "express";
 import { prisma } from "@repo/database";
import { redis } from "@repo/redis";
import { isAuth } from "../middlewares/auth";
import TryCatch from "../middlewares/trycatch";
import { StartConversationSchema, UUIDParam } from "@repo/zod";

import { Request, Response } from "express";
const router = Router();

router.use(isAuth);

const keys = {
  userOnline: (userId : string) => `online:${userId}`,
  accessTokenBL: (jti : string) => `at:bl:${jti}`,
  convsCache: (userId : string ) => `cache:convs:${userId}`,
  msgRateLimit: (userId : string ) => `rl:msg:${userId}`,
};
 


// const StartConversationSchema = z.object({
//   doctorId: z.string().uuid(),
// });

export const assertParticipant = async (conversationId: string, userId: string, res: Response) => {
  const isParticipant = await prisma.conversationParticipant.findUnique({
    where: { conversationId_userId: { conversationId, userId } },
  });

  if (!isParticipant) {
    res.status(403).json({ error: "Access denied" });
    return false;
  }
  return true;
};


export const startConversationWithDoctor = TryCatch(async (req:Request, res: Response) => {

   const { doctorId } = StartConversationSchema.parse(req.body);
   const patientId = req.user.id;

   if (patientId === doctorId) {
     return res.status(400).json({ error: "Cannot chat with yourself" });
   }

   // Doctor must exist, be DOCTOR role, and verified
   const doctor = await prisma.user.findFirst({
     where: {
       id: doctorId,
       role: "DOCTOR",
       status: "ACTIVE",
       doctorProfile: { isVerified: true },
     },
     select: { id: true },
   });
   if (!doctor) {
     return res
       .status(404)
       .json({ error: "Doctor not found or not yet verified" });
   }

   // Find existing 1-on-1 conversation between this exact pair
   const existing = await prisma.conversation.findFirst({
     where: {
       AND: [
         { participants: { some: { userId: patientId } } },
         { participants: { some: { userId: doctorId } } },
       ],
     },
     include: {
       participants: {
         include: {
           user: {
             select: {
               id: true,
               role: true,
               profile: {
                 select: { firstName: true, lastName: true, avatarUrl: true },
               },
             },
           },
         },
       },
     },
   });

   if (existing) return res.json({ conversation: existing, created: false });

   const conversation = await prisma.conversation.create({
     data: {
       participants: {
         create: [{ userId: patientId }, { userId: doctorId }],
       },
     },
     include: {
       participants: {
         include: {
           user: {
             select: {
               id: true,
               role: true,
               profile: {
                 select: { firstName: true, lastName: true, avatarUrl: true },
               },
             },
           },
         },
       },
     },
   });

   // Invalidate conversation list cache for both users
   await Promise.all([
     redis.del(keys.convsCache(patientId)),
     redis.del(keys.convsCache(doctorId)),
   ]);

   res.status(201).json({ conversation, created: true });



})
export const listMyConversations = TryCatch(async (req: Request, res: Response) => {
 const cacheKey = keys.convsCache(req.user.id);
 const cached = await redis.get(cacheKey);
 if (cached) return res.json(JSON.parse(cached));

 const conversations = await prisma.conversation.findMany({
   where: { participants: { some: { userId: req.user.id } } },
   orderBy: { lastMessageAt: "desc" },
   include: {
     participants: {
       include: {
         user: {
           select: {
             id: true,
             role: true,
             profile: {
               select: { firstName: true, lastName: true, avatarUrl: true },
             },
           },
         },
       },
     },
     messages: {
       orderBy: { createdAt: "desc" },
       take: 1,
       select: {
         content: true,
         mediaType: true,
         createdAt: true,
         senderId: true,
         isDeleted: true,
       },
     },
     _count: {
       select: {
         messages: {
           where: {
             senderId: { not: req.user.id },
             isDeleted: false,
           },
         },
       },
     },
   },
 });

 // Batch online check
 const pipeline = redis.pipeline();
 conversations.forEach((c) => {
   const other = c.participants.find((p) => p.userId !== req.user.id);
   if (other) pipeline.exists(keys.userOnline(other.userId));
 });
 const onlineResults = await pipeline.exec();

 const result = conversations.map((c, i) => {
   const other = c.participants.find((p) => p.userId !== req.user.id);
    return {
      id: c.id,
      lastMessageAt: c.lastMessageAt,
      lastMessage: c.messages[0] ?? null,
      unreadCount: c._count.messages,
      otherUser: {
        ...other?.user,
        isOnline: onlineResults?.[i]?.[1] === 1,
      },
    };
  });

 await redis.set(cacheKey, JSON.stringify(result), "EX", 300);
 res.json(result);});



export const getOneconversation = TryCatch(async (req: Request, res: Response) => {
 const { id } = UUIDParam.parse(req.params);

 const conversation = await prisma.conversation.findFirst({
   where: {
     id,
     participants: { some: { userId: req.user.id } },
   },
   include: {
     participants: {
       include: {
         user: {
           select: {
             id: true,
             role: true,
             profile: {
               select: { firstName: true, lastName: true, avatarUrl: true },
             },
             doctorProfile: {
               select: {
                 specialization: true,
                 isVerified: true,
                 consultationFee: true,
               },
             },
           },
         },
       },
     },
     messages: {
       orderBy: { createdAt: "asc" },
       take: 50,
     },
   },
 });

 if (!conversation)
   return res.status(404).json({ error: "Conversation not found" });

 // Online status of the other participant
 const other = conversation.participants.find((p) => p.userId !== req.user.id);
 const isOnline = other
   ? (await redis.exists(keys.userOnline(other.userId))) === 1
   : false;

 res.json({ conversation, otherUserOnline: isOnline });
});

export const deleteOneConversation = TryCatch(async (req:Request, res: Response) => {
   const { id } = UUIDParam.parse(req.params);
   const ok = await assertParticipant(id, req.user.id, res);
   if (!ok) return;

   await prisma.conversationParticipant.delete({
     where: {
       conversationId_userId: { conversationId: id, userId: req.user.id },
     },
   });

   await redis.del(keys.convsCache(req.user.id));
   res.json({ message: "Left conversation" });
})

import { z } from "zod";

const SendMessageSchema = z.object({
  content: z.string().min(1).max(2000),
  mediaUrl: z.string().optional(),
  mediaType: z.enum(["IMAGE", "FILE", "AUDIO"]).optional(),
});

export const sendMessage = TryCatch(async (req: Request, res: Response) => {
  const { id } = UUIDParam.parse(req.params);
  const ok = await assertParticipant(id, req.user.id, res);
  if (!ok) return;

  const { content, mediaUrl, mediaType } = SendMessageSchema.parse(req.body);

  const message = await prisma.message.create({
    data: {
      content,
      mediaUrl,
      mediaType,
      conversationId: id,
      senderId: req.user.id,
    },
  });

  await prisma.conversation.update({
    where: { id },
    data: { lastMessageAt: new Date() },
  });

  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: { participants: true },
  });
  
  if (conversation) {
    const p = redis.pipeline();
    conversation.participants.forEach(participant => {
      p.del(keys.convsCache(participant.userId));
    });
    await p.exec();
  }

  res.status(201).json(message);
});