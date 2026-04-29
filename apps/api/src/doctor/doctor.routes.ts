import { Router } from "express";
import { createDoctorProfile, searchDoctors, getDoctorProfile, verifyDoctor } from "./doctor.controller";
import { isAuth } from "../middlewares/auth";

const router: Router = Router();

// routes/doctor.routes.js
// POST /api/doctors/profile      — doctor creates/updates their profile
// GET  /api/doctors               — patients list/search doctors
// GET  /api/doctors/:id           — get doctor public profile + online status
// PATCH /api/doctors/:id/verify   — admin verifies doctor (ADMIN only)
 


router.post("/profile", isAuth, createDoctorProfile);
router.get("/", isAuth, searchDoctors); // Changed from router.post("/doctor/", ...) to GET /doctor
router.get("/:id", isAuth, getDoctorProfile);
router.patch("/:id/verify", isAuth, verifyDoctor);


export default router;

