import { Resend } from 'resend';

// Initialize Resend with the provided API Key
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    const result = await resend.emails.send({
      from: 'Support Sutra <onboarding@resend.dev>', // Default onboarding email for Resend
      to: [to],
      subject: subject,
      html: html,
    });

    if (result.error) {
      console.error("Resend API Error:", result.error);
      return { success: false, message: result.error.message || "Failed to send email." };
    }

    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false, message: "Failed to send email. Please try again." };
  }
};
