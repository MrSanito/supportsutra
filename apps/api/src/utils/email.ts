import { getVerifyEmailHtml, getOtpHtml, getForgotPasswordHtml } from "../config/email.js";

export const sendMail = async (to: string, subject: string, html: string) => {
  console.log(`📧 [Email Simulation]: Sending email to ${to}`);
  console.log(`Subject: ${subject}`);
  // In a real app, this would use nodemailer or a service like Resend/SendGrid
  return { success: true, messageId: "simulated-id" };
};

export { getVerifyEmailHtml, getOtpHtml, getForgotPasswordHtml };
