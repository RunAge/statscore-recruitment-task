import { UnionMatch } from "../schemas/union-match.schema.ts";

export interface BaseMatchParser<MatchSport extends UnionMatch = any> {
  readonly type: string;
  parseName: (match: MatchSport) => string;
  parseScore: (match: MatchSport) => string;
}
