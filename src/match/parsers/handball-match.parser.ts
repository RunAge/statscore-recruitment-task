import { HandballMatch } from "../schemas/match/handball-match.schema.js";
import { BaseMatchParser } from "./base-match.parser.js";

export class HandballMatchParser implements BaseMatchParser<HandballMatch> {
  public type = "handball";

  public parseName(match: HandballMatch) {
    return `${match.participant1} vs ${match.participant2}`;
  }

  public parseScore(match: HandballMatch) {
    return match.score;
  }
}
