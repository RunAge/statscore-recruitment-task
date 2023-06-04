import { z } from "zod";
import { basketballMatchSchema } from "./match/basketball-match.schema.js";
import { handballMatchSchema } from "./match/handball-match.schema.js";
import { soccerMatchSchema } from "./match/soccer-match.schema.js";
import { tennisMatchSchema } from "./match/tennis-match.schema.js";
import { volleyballMatchSchema } from "./match/volleyball-match.schema.js";

export const unionMatchSchema = z.union([
  basketballMatchSchema,
  handballMatchSchema,
  soccerMatchSchema,
  tennisMatchSchema,
  volleyballMatchSchema,
]);

export type UnionMatch = z.infer<typeof unionMatchSchema>;
