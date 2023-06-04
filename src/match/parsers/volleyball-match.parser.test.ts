import test from "ava";
import { VolleyballMatchParser } from "./volleyball-match.parser.js";
import { VolleyballMatch } from "../schemas/match/volleyball-match.schema.js";

test("VolleyballMatchParser - parseName", (t) => {
  const parser = new VolleyballMatchParser();
  const match: VolleyballMatch = {
    sport: "volleyball",
    participant1: "test",
    participant2: "osiem",
    score: "1:1,1:2,2:3,3:4",
  };
  t.is(parser.parseName(match), `test - osiem`);
});

test("VolleyballMatchParser - parseScore", (t) => {
  const parser = new VolleyballMatchParser();
  const match: VolleyballMatch = {
    sport: "volleyball",
    participant1: "test",
    participant2: "osiem",
    score: "1:1,1:2,2:3,3:4",
  };
  t.is(parser.parseScore(match), `Main score: 1:1 (set1 1:2, set2 2:3, set3 3:4)`);
});
