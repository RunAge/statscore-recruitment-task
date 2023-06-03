import { z } from "zod";

export const matchSchema = z.object({
  sport: z.string(),
  participant1: z.string(),
  participant2: z.string(),
  score: z.array(z.array(z.string()).min(1)).min(1).or(z.string()),
});

export type Match = z.infer<typeof matchSchema>;
