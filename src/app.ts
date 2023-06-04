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
    matchesParsed.push({
      name: parser.makeEventName(validatedMatch),
      score: parser.formatScore(validatedMatch),
    });
  } catch (error) {
    /**
     * I normally don't silence validation errors, but provide them to end client.
     */
    if (error instanceof ZodError) continue;
    if (error instanceof InvalidSportError) continue;
    throw error;
  }
}

console.log(matchesParsed);
