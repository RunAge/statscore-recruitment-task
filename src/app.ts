import { ZodError } from "zod";
import { SportTypeNotSupported } from "./match/errors/sport-type-not-supported.error.js";
import { matchParser } from "./match/match.parser.js";
import { unionMatchSchema } from "./match/schemas/union-match.schema.js";
import { matches } from "./matches.data.js";

const matchesParsed = [];

for (const match of matches) {
  try {
    const validatedMatch = unionMatchSchema.parse(match);
    matchesParsed.push(matchParser.parseMatch(validatedMatch));
  } catch (error) {
    if (error instanceof ZodError) continue;
    if (error instanceof SportTypeNotSupported) continue;
  }
}

console.log(matchesParsed);
