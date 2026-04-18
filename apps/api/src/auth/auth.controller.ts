import type { Request, Response } from "express"
import { loginSchema, type LoginFormData, registerSchema, type RegisterFormData } from "@repo/zod";
import { prisma } from "@repo/database"; 
import { redis } from "@repo/redis";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const register = async (req: Request, res: Response) => {
    try {
        // sanitizing  the inputs
        console.log(req.body)
        const validation = registerSchema.safeParse(req.body);
        if (!validation.success) {
            const zodError = validation.error;
            const allErrors = zodError.issues.map((issue) => ({
                field: issue.path ? issue.path.join(".") : "unknown",
                message: issue.message || "Validation Error",
                code: issue.code,
            }));

    //         // throw error when sick 
            return res.status(400).json({
                message: allErrors[0]?.message || "Validation Failed",
                errors: allErrors
            });
        }
 
 
        console.log("validation success")
    const { email, firstName, lastName, phone, password } = validation.data;

    const rateLimitKey = `register-rate-limit:${req.ip}:${email}`;
    const isAllowed = await redis.set(rateLimitKey, "1", "EX", 60, "NX");

    if (!isAllowed) {
      res.status(429).json({
        success: false,
        message: "Too many requests",
      });
      return;
    }

    // const existingUser = await prisma.user.findUnique({ where: { email } });
    // if (existingUser) {
    //   res.status(400).json({ success: false, message: "User already exists" });
    //   return;
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("hashed password", hashedPassword);

    const verifyToken = crypto.randomBytes(32).toString("hex");
    console.log("verify token", verifyToken);

    
    const VerifyKey = `verify:${verifyToken}`;

    const datatoStore = JSON.stringify({
       email,
      password: hashedPassword,
    });

    await redis.set(VerifyKey, datatoStore, "EX", 300, "NX");
 
    await redis.set(rateLimitKey, "true", "EX", 60);

    return res.json({
      success: true,
      message:
        "if your email is valild  , a verification link has been send . it will expire in 5 minutes",
    });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const validation = loginSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues[0]?.message || "Validation Failed"
            });
        }
        res.status(200).json({ message: "Login successful" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const verifyRegister = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "verifyRegister successful" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }

}
export const verifyLogin = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "LoginRegister successful" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}
