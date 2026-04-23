import type { Request, Response } from "express";
import crypto from "crypto";
import { registerSchema, loginSchema } from "@repo/zod";
import { redis } from "@repo/redis";
import TryCatch from "../middlewares/trycatch.js";
import * as authService from "./auth.services.js";
import { sendMail } from "../config/sendEmail.js";
import { getOtpHtml, getVerifyEmailHtml } from "../config/email.js";
import { 
  generateToken, 
  generateAccessToken, 
  verifyRefreshToken, 
  revokeRefreshToken 
} from "../config/generateToken.js";
import { refreshCSRFToken } from "../config/csrfMiddleware.js";

export const register = TryCatch(async (req: Request, res: Response) => {
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: validation.error.issues[0]?.message || "Validation Failed",
      errors: validation.error.issues,
    });
  }

  const { email, firstName, lastName, password } = validation.data;
  const name = `${firstName} ${lastName}`;

  // Rate limiting
  const rateLimitKey = `register-rate-limit:${req.ip}:${email}`;
  const isAllowed = await redis.set(rateLimitKey, "1", "EX", 60, "NX");
  if (!isAllowed) {
    console.log("not allowed")
    return res.status(429).json({ success: false, message: "Too many requests" });
  }

  const existingUser = await authService.findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ success: false, message: "User already exists" });
  }

  const hashedPassword = await authService.hashPassword(password);
  const verifyToken = crypto.randomBytes(32).toString("hex");

  await authService.storeRegistrationData(verifyToken, {
    name,
    email,
    password: hashedPassword,
  });

  const subject = "Verify Your Email for Account Creation";
  const html = getVerifyEmailHtml({ email, token: verifyToken });
  
  const mailResult = await sendMail(email, subject, html);
  
  if (!mailResult.success) {
    return res.status(500).json({
      success: false,
      message: mailResult.message || "Failed to send verification email. Please try again later.",
    });
  }

  return res.json({
    success: true,
    message: "A verification link has been sent to your email. It will expire in 5 minutes.",
  });
});

export const verifyRegister = TryCatch(async (req: Request, res: Response) => {
  const { id: token } = req.params;
  if (!token) {
    return res.status(400).json({ success: false, message: "Verification token is required" });
  }

  const userData = await authService.getRegistrationData(token);
  if (!userData) {
    return res.status(400).json({ success: false, message: "Verification token has expired" });
  }

  const existingUser = await authService.findUserByEmail(userData.email);
  if (existingUser) {
    await authService.deleteRegistrationData(token);
    return res.status(400).json({ success: false, message: "User already exists" });
  }

  const newUser = await authService.createUser({
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });

  await authService.deleteRegistrationData(token);

  return res.status(201).json({
    success: true,
    message: "Email verified successfully! Your account has been created.",
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
  });
});

export const login = TryCatch(async (req: Request, res: Response) => {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: validation.error.issues[0]?.message || "Validation Failed",
    });
  }

  const { email, password } = validation.data;

  // Rate limiting
  const rateLimitKey = `login-rate-limit:${req.ip}:${email}`;
  if (await redis.get(rateLimitKey)) {
    return res.status(429).json({ success: false, message: "Too many requests, try again later" });
  }

  const user = await authService.findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ success: false, message: "Invalid credentials" });
  }

  const isMatch = await authService.comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: "Invalid credentials" });
  }

  const otp = authService.generateOTP();
  await authService.storeOTP(email, otp);

  const subject = "OTP for Login Verification";
  const html = getOtpHtml({ email, otp });
  
  const mailResult = await sendMail(email, subject, html);
  
  if (!mailResult.success) {
    return res.status(500).json({
      success: false,
      message: mailResult.message || "Failed to send OTP. Please try again later.",
    });
  }

  await redis.set(rateLimitKey, "true", "EX", 60);

  return res.status(200).json({
    success: true,
    message: "An OTP has been sent to your email. It will be valid for 5 minutes.",
  });
});

export const verifyLogin = TryCatch(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Please provide all details" });
  }

  const storedOtp = await authService.getStoredOTP(email);
  if (!storedOtp || storedOtp !== otp) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }

  await authService.deleteStoredOTP(email);

  const user = await authService.findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const tokenData = await generateToken(user.id, res);

  

  return res.status(200).json({
    success: true,
    message: `Welcome, ${user.name}`,
    user: { id: user.id, name: user.name, email: user.email },
    sessionInfo: {
      sessionId: tokenData.sessionId,
      loginTime: new Date().toISOString(),
      csrfToken: tokenData.csrfToken,
    }
  });
});

export const myProfile = TryCatch(async (req: Request, res: Response) => {
  const user = req.user;
  const sessionId = req.sessionId;

  const sessionData = await redis.get(`session:${sessionId}`);
  let sessionInfo = null;

  if (sessionData) {
    const parsedSession = JSON.parse(sessionData);
    sessionInfo = {
      sessionId,
      loginTime: parsedSession.createdAt,
      lastActivity: parsedSession.lastActivity,
    };
  }

  res.json({ success: true, user, sessionInfo });
});

export const refreshToken = TryCatch(async (req: Request, res: Response) => {
  const rToken = req.cookies.refreshToken;
  if (!rToken) {
    return res.status(401).json({ success: false, message: "No refresh token provided" });
  }

  const decoded = await verifyRefreshToken(rToken);
  if (!decoded) {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.clearCookie("csrfToken");
    return res.status(401).json({ success: false, message: "Session expired, please login" });
  }

  generateAccessToken(decoded.id, decoded.sessionId, res);

  res.status(200).json({ success: true, message: "Token refreshed" });
});

export const logOutUser = TryCatch(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (userId) {
    await revokeRefreshToken(userId);
    await redis.del(`user:${userId}`);
  }

  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  res.clearCookie("csrfToken");

  res.json({ success: true, message: "Logged out successfully" });
});

export const refreshCSRF = TryCatch(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const newCSRFToken = await refreshCSRFToken(userId, res);

  res.status(200).json({
    success: true,
    message: "CSRF token refreshed",
    csrfToken: newCSRFToken,
  });
});

export const adminController = TryCatch(async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Hello Admin" });
});
