import test from "ava";
import { BasketballMatchParser } from "./basketball-match.parser.js";
import { BasketballMatch } from "../schemas/match/basketball-match.schema.js";

test("BasketballMatchParser - parseName", (t) => {
  const parser = new BasketballMatchParser();
  const match: BasketballMatch = {
    sport: "basketball",
    participant1: "test",
    participant2: "osiem",
    score: [
      ["1:2", "2:3"],
      ["3:4", "4:5"],
    ],
  };
  t.is(parser.parseName(match), `test - osiem`);
});

test("BasketballMatchParser - parseScore", (t) => {
  const parser = new BasketballMatchParser();
  const match: BasketballMatch = {
    sport: "basketball",
    participant1: "test",
    participant2: "osiem",
    score: [
      ["1:2", "2:3"],
      ["3:4", "4:5"],
    ],
  };
  t.is(parser.parseScore(match), `1:2,2:3,3:4,4:5`);
});
