import { z } from "zod";
import { matchSchema } from "./match.schema.js";
import { setScoreRegExp } from "../../regexps/set-score.regexp.js";

export const volleyballMatchSchema = matchSchema.merge(
  z.object({
    sport: z.literal("volleyball"),
    score: z.string().regex(setScoreRegExp),
  }),
);

export type VolleyballMatch = z.infer<typeof volleyballMatchSchema>;
