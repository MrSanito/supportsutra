import express from "express";
import { register, login, verifyRegister, verifyLogin } from "./auth.controller.ts";

const router = express.Router();

router.post("/register", register);
router.get("/verify/:id", verifyRegister);
router.post("/login", login);
router.post("/verifyLogin", verifyLogin);

export default router;