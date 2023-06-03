import { InvalidSportError } from "./errors/invalid-sport.error.js";

export class EventParser {
  makeEventName(match: any): string {
    switch (match.sport) {
      case "soccer":
      case "volleyball":
      case "basketball":
        return match.participant1 + " - " + match.participant2;
      case "tennis":
      case "handball":
        return match.participant1 + " vs " + match.participant2;
      default:
        throw new InvalidSportError();
    }
  }

  formatScore(match: any): string {
    switch (match.sport) {
      case "soccer":
      case "handball":
        return match.score;
      case "volleyball":
      case "tennis": {
        const scores = /([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+)/.exec(match.score);
        const set1 = scores?.[2];
        const set2 = scores?.[3];
        const set3 = scores?.[4];

        return (
          "Main score: " + scores?.[1] + " (" + "set1 " + set1 + ", " + "set2 " + set2 + ", " + "set3 " + set3 + ")"
        );
      }
      case "basketball":
        return match.score.flat().join(",");
      default:
        throw new InvalidSportError();
    }
  }
}
