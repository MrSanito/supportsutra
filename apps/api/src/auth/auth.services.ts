import { prisma } from "@repo/database";
import { redis } from "@repo/redis";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (userData: any) => {
  return await prisma.user.create({
    data: userData,
  });
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hashed: string) => {
  return await bcrypt.compare(password, hashed);
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOTP = async (email: string, otp: string) => {
  const otpKey = `otp:${email}`;
  await redis.set(otpKey, JSON.stringify(otp), "EX", 300);
};

export const getStoredOTP = async (email: string) => {
  const otpKey = `otp:${email}`;
  const storedOtp = await redis.get(otpKey);
  return storedOtp ? JSON.parse(storedOtp) : null;
};

export const deleteStoredOTP = async (email: string) => {
  const otpKey = `otp:${email}`;
  await redis.del(otpKey);
};

export const storeRegistrationData = async (token: string, data: any) => {
  const verifyKey = `verify:${token}`;
  await redis.set(verifyKey, JSON.stringify(data), "EX", 300);
};

export const getRegistrationData = async (token: string) => {
  const verifyKey = `verify:${token}`;
  const data = await redis.get(verifyKey);
  return data ? JSON.parse(data) : null;
};

export const deleteRegistrationData = async (token: string) => {
  const verifyKey = `verify:${token}`;
  await redis.del(verifyKey);
};
