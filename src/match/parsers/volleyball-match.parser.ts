import { VolleyballMatch } from "../schemas/match/volleyball-match.schema.js";
import { BaseMatchParser } from "./base-match.parser.js";

export class VolleyballMatchParser implements BaseMatchParser<VolleyballMatch> {
  public type = "volleyball";

  public parseName(match: VolleyballMatch) {
    return `${match.participant1} - ${match.participant2}`;
  }

  public parseScore(match: VolleyballMatch) {
    const [mainScore, ...sets] = match.score.split(",");
    const joinedSets = sets.map((set, index) => `set${index + 1} ${set}`).join(", ");
    return `Main score: ${mainScore} (${joinedSets})`;
  }
}
