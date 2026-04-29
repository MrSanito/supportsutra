import express from "express";
import authRoutes from "./auth/auth.route.js"
import doctorRoutes from "./doctor/doctor.routes.js"
import conversationRoutes from "./conversation/conversation.routes.js"

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/doctor", doctorRoutes);
router.use("/", conversationRoutes);

export default router;
