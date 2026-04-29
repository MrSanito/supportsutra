import z from "zod";

export const StartConversationSchema = z.object({
  doctorId: z.string().uuid(),
});

