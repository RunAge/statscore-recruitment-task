import { z } from "zod";

export const matchSchema = z.object({
  sport: z.string(),
  participant1: z.string(),
  participant2: z.string(),
  score: z.any(),
});

export interface Match<Score = any> extends z.infer<typeof matchSchema> {
  score: Score;
}
