import { z } from "zod";
import { matchSchema } from "./match.schema.js";
import { simpleScoreRegExp } from "../../regexps/simple-score.regexp.js";

export const basketballMatchSchema = matchSchema.merge(
  z.object({
    sport: z.literal("basketball"),
    score: z.array(z.array(z.string().regex(simpleScoreRegExp)).length(2)).length(2),
  }),
);

export type BasketballMatch = z.infer<typeof basketballMatchSchema>;
