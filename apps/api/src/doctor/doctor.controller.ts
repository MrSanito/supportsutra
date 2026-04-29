import TryCatch from "../middlewares/trycatch";
import { Request, Response } from "express";
import { ListDoctorsSchema, DoctorProfileSchema } from "@repo/zod";
import { prisma } from "@repo/database";

export const createDoctorProfile = TryCatch(async (req: Request, res: Response) => {
  const parsed = DoctorProfileSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, errors: parsed.error.flatten() });
  }

  const data = parsed.data;

  // Await the database query to resolve the promise
  const licenceExist = await prisma.doctorProfile.findUnique({
    where: {
      licenseNumber: data.licenseNumber,
    },
  });

  if (licenceExist && licenceExist.userId !== req.user.id) {
    return res.status(409).json({ success: false, error: "License number already registered" });
  }

  // Upsert doctor profile + upgrade role in one transaction
  const [profile] = await prisma.$transaction([
    prisma.doctorProfile.upsert({
      where: { userId: req.user.id },
      create: { ...data, userId: req.user.id },
      update: data,
    }),
    prisma.user.update({
      where: { id: req.user.id },
      data: { role: "DOCTOR" },
    }),
  ]);

  return res.status(201).json({ success: true, profile });
});

export const searchDoctors = TryCatch(async (req: Request, res: Response) => {
  const parsed = ListDoctorsSchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ success: false, errors: parsed.error.flatten() });
  }

  const { page, limit, specialization, search } = parsed.data;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (req.user?.role !== "ADMIN") {
    where.isVerified = true;
  }

  if (specialization) {
    where.specialization = specialization;
  }

  if (search) {
    where.OR = [
      { specialization: { contains: search, mode: "insensitive" } },
      { bio: { contains: search, mode: "insensitive" } },
      {
        user: {
          profile: {
            OR: [
              { firstName: { contains: search, mode: "insensitive" } },
              { lastName: { contains: search, mode: "insensitive" } },
            ],
          },
        },
      },
    ];
  }

  const [doctors, total] = await Promise.all([
    prisma.doctorProfile.findMany({
      where,
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                firstName: true,
                lastName: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
      orderBy: {
        experienceYears: "desc",
      },
    }),
    prisma.doctorProfile.count({ where }),
  ]);

  return res.json({
    success: true,
    doctors: doctors,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

export const getDoctorProfile = TryCatch(async (req: Request, res: Response) => {
  const doctorId = req.params.id;
  
  const doctor = await prisma.doctorProfile.findUnique({
    where: { id: doctorId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
              avatarUrl: true,
              bio: true,
            },
          },
        },
      },
    },
  });

  if (!doctor) {
    return res.status(404).json({ success: false, error: "Doctor profile not found" });
  }

  return res.json({ success: true, data: doctor });
});

export const verifyDoctor = TryCatch(async (req: Request, res: Response) => {
  const doctorId = req.params.id;
  
  const doctor = await prisma.doctorProfile.update({
    where: { id: doctorId },
    data: {
      isVerified: true,
      verifiedAt: new Date(),
      verifiedBy: req.user.id,
    },
  });

  return res.json({ success: true, message: "Doctor verified successfully", data: doctor });
});


