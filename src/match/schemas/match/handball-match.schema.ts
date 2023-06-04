import { z } from "zod";
import { matchSchema } from "./match.schema.js";
import { simpleScoreRegExp } from "../../regexps/simple-score.regexp.js";

export const handballMatchSchema = matchSchema.merge(
  z.object({
    sport: z.literal("handball"),
    score: z.string().regex(simpleScoreRegExp),
  }),
);

export type HandballMatch = z.infer<typeof handballMatchSchema>;
