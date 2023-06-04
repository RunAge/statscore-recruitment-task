import { z } from "zod";
import { matchSchema } from "./match.schema.js";
import { setScoreRegExp } from "../../regexps/set-score.regexp.js";

export const tennisMatchSchema = matchSchema.merge(
  z.object({
    sport: z.literal("tennis"),
    score: z.string().regex(setScoreRegExp),
  }),
);

export type TennisMatch = z.infer<typeof tennisMatchSchema>;
