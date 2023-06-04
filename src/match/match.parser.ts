import { SportTypeNotSupported } from "./errors/sport-type-not-supported.error.js";
import { BaseMatchParser } from "./parsers/base-match.parser.js";
import { BasketballMatchParser } from "./parsers/basketball-match.parser.js";
import { HandballMatchParser } from "./parsers/handball-match.parser.js";
import { SoccerMatchParser } from "./parsers/soccer-match.parser.js";
import { TennisMatchParser } from "./parsers/tennis-match.parser.js";
import { VolleyballMatchParser } from "./parsers/volleyball-match.parser.js";
import { Match } from "./schemas/match/match.schema.js";

export class MatchParser<RegisteredParsers extends BaseMatchParser[] = BaseMatchParser[]> {
  private readonly parsers: Record<string, RegisteredParsers[number]>;

  constructor(parsers: RegisteredParsers) {
    this.parsers = parsers.reduce((accumulator, parser) => {
      accumulator[parser.type] = parser;
      return accumulator;
    }, {} as Record<string, RegisteredParsers[number]>);
  }

  public parseName<TMatch extends Match<any>>(match: TMatch) {
    if (!this.parsers[match.sport]) throw new SportTypeNotSupported();
    return this.parsers[match.sport].parseName(match);
  }

  public parseScore<TMatch extends Match<any>>(match: TMatch) {
    if (!this.parsers[match.sport]) throw new SportTypeNotSupported();
    return this.parsers[match.sport].parseScore(match);
  }

  public parseMatch<TMatch extends Match<any>>(match: TMatch) {
    return {
      name: this.parseName(match),
      score: this.parseScore(match),
    };
  }
}
/**
 * Let's assume this is registered in container or something
 */
export const matchParser = new MatchParser([
  new BasketballMatchParser(),
  new HandballMatchParser(),
  new SoccerMatchParser(),
  new TennisMatchParser(),
  new VolleyballMatchParser(),
]);
