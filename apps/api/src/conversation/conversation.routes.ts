import { Router } from "express";
import { getOneconversation, listMyConversations, startConversationWithDoctor, deleteOneConversation, sendMessage } from "./conversation.controller";
import z from "zod";

const router : Router = Router()

import { isAuth } from "../middlewares/auth";
router.use(isAuth);

// POST /api/conversations             — patient starts a chat with a doctor
// GET  /api/conversations             — list my conversations (patient or doctor)
// GET  /api/conversations/:id         — get one conversation (validates membership)
 

router.post("/conversations", startConversationWithDoctor);
router.get("/conversations", listMyConversations);
router.get("/conversations/:id", getOneconversation);
router.delete("/conversations/:id", deleteOneConversation);
router.post("/conversations/:id/messages", sendMessage);

export default router;