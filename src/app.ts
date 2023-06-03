import { InvalidSportError } from "./errors/invalid-sport.error.js";
import { matches } from "./event-data.js";
import { EventParser } from "./event-parser.js";

const matchesParsed = [];
const parser = new EventParser();
for (const match of matches) {
  try {
    const name = parser.makeEventName(match);
    const score = parser.formatScore(match);
    matchesParsed.push({
      name,
      score,
    });
  } catch (error) {
    if (error instanceof InvalidSportError) continue;
    throw error;
  }
}

console.log(matchesParsed);
