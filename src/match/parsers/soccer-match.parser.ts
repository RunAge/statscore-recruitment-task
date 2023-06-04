import { SoccerMatch } from "../schemas/match/soccer-match.schema.js";
import { BaseMatchParser } from "./base-match.parser.js";

export class SoccerMatchParser implements BaseMatchParser<SoccerMatch> {
  public type = "soccer";

  public parseName(match: SoccerMatch) {
    return `${match.participant1} - ${match.participant2}`;
  }

  public parseScore(match: SoccerMatch) {
    return match.score;
  }
}
