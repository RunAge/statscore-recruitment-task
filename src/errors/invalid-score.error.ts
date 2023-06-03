import { Match } from "../schemas/match.schema.js";

export class InvalidScoreError extends Error {
  constructor(public readonly match: Match) {
    super("Exception: invalid score", { cause: match.score });
  }
}
