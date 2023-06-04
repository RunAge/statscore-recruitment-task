import { BasketballMatch } from "../schemas/match/basketball-match.schema.js";
import { BaseMatchParser } from "./base-match.parser.js";

export class BasketballMatchParser implements BaseMatchParser<BasketballMatch> {
  public type = "basketball";

  public parseName(match: BasketballMatch) {
    return `${match.participant1} - ${match.participant2}`;
  }

  public parseScore(match: BasketballMatch) {
    return match.score.flat().join(",");
  }
}
