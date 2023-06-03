import { ZodError } from "zod";
import { InvalidSportError } from "./errors/invalid-sport.error.js";
import { matches } from "./event-data.js";
import { EventParser } from "./event-parser.js";
import { matchSchema } from "./schemas/match.schema.js";

const matchesParsed: { name: string; score: string }[] = [];
const parser = new EventParser();
for (const match of matches) {
  try {
    /**
     * Assuming that the data comes from an unknown source,
     * it is crucial to validate it before passing it to the functions.
     */
    const validatedMatch = matchSchema.parse(match);
    const name = parser.makeEventName(validatedMatch);
    const score = parser.formatScore(validatedMatch);
    matchesParsed.push({
      name,
      score,
    });
  } catch (error) {
    if (error instanceof InvalidSportError) continue;
    if (error instanceof ZodError) continue;
    throw error;
  }
}

console.log(matchesParsed);
