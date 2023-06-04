import { InvalidScoreError } from "./errors/invalid-score.error.js";
import { InvalidSportError } from "./errors/invalid-sport.error.js";
import { Match } from "./schemas/match.schema.js";

export class EventParser {
  makeEventName(match: Match): string {
    const joinParticipantsBy = this.joinParticipants(match.participant1, match.participant2);

    switch (match.sport) {
      case "soccer":
      case "volleyball":
      case "basketball": {
        return joinParticipantsBy(" - ");
      }

      case "tennis":
      case "handball": {
        return joinParticipantsBy(" vs ");
      }

      default: {
        throw new InvalidSportError();
      }
    }
  }

  formatScore(match: Match): string {
    switch (match.sport) {
      case "basketball": {
        return this.formatArrayScore(match);
      }

      case "soccer":
      case "handball": {
        return this.formatSimpleScore(match);
      }

      case "volleyball":
      case "tennis": {
        return this.formatSetsScore(match);
      }

      default: {
        throw new InvalidSportError();
      }
    }
  }

  private joinParticipants(participant1: string, participant2: string) {
    return (joinBy: string) => `${participant1}${joinBy}${participant2}`;
  }

  private formatSimpleScore(match: Match) {
    if (Array.isArray(match.score)) throw new InvalidScoreError(match);

    return match.score;
  }

  private formatSetsScore(match: Match) {
    if (Array.isArray(match.score)) throw new InvalidScoreError(match);

    const [mainScore, ...setScores] = match.score.split(",");

    if (setScores.length !== 3) throw new InvalidScoreError(match);

    const sets = setScores.map((score, index) => `set${index + 1} ${score}`).join(", ");

    return `Main score: ${mainScore} (${sets})`;
  }

  private formatArrayScore(match: Match) {
    if (!Array.isArray(match.score)) throw new InvalidScoreError(match);

    return match.score.flat().join(",");
  }
}
