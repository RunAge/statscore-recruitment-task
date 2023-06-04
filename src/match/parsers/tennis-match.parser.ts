import { TennisMatch } from "../schemas/match/tennis-match.schema.js";
import { BaseMatchParser } from "./base-match.parser.js";

export class TennisMatchParser implements BaseMatchParser<TennisMatch> {
  public type = "tennis";

  public parseName(match: TennisMatch) {
    return `${match.participant1} vs ${match.participant2}`;
  }

  public parseScore(match: TennisMatch) {
    const [mainScore, ...sets] = match.score.split(",");
    const joinedSets = sets.map((set, index) => `set${index + 1} ${set}`).join(", ");
    return `Main score: ${mainScore} (${joinedSets})`;
  }
}
