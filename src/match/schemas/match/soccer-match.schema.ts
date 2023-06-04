import { z } from "zod";
import { matchSchema } from "./match.schema.js";
import { simpleScoreRegExp } from "../../regexps/simple-score.regexp.js";

export const soccerMatchSchema = matchSchema.merge(
  z.object({
    sport: z.literal("soccer"),
    score: z.string().regex(simpleScoreRegExp),
  }),
);

export type SoccerMatch = z.infer<typeof soccerMatchSchema>;
