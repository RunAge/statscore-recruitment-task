import test from "ava";
import { TennisMatchParser } from "./tennis-match.parser.js";
import { TennisMatch } from "../schemas/match/tennis-match.schema.js";

test("TennisMatchParser - parseName", (t) => {
  const parser = new TennisMatchParser();
  const match: TennisMatch = {
    sport: "tennis",
    participant1: "test",
    participant2: "osiem",
    score: "1:1,1:2,2:3,3:4",
  };
  t.is(parser.parseName(match), `test vs osiem`);
});

test("TennisMatchParser - parseScore", (t) => {
  const parser = new TennisMatchParser();
  const match: TennisMatch = {
    sport: "tennis",
    participant1: "test",
    participant2: "osiem",
    score: "1:1,1:2,2:3,3:4",
  };
  t.is(parser.parseScore(match), `Main score: 1:1 (set1 1:2, set2 2:3, set3 3:4)`);
});
