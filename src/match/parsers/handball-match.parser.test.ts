import test from "ava";
import { HandballMatch } from "../schemas/match/handball-match.schema.js";
import { HandballMatchParser } from "./handball-match.parser.js";

test("HandballMatchParser - parseName", (t) => {
  const parser = new HandballMatchParser();
  const match: HandballMatch = {
    sport: "handball",
    participant1: "test",
    participant2: "osiem",
    score: "1:1",
  };
  t.is(parser.parseName(match), `test vs osiem`);
});

test("HandballMatchParser - parseScore", (t) => {
  const parser = new HandballMatchParser();
  const match: HandballMatch = {
    sport: "handball",
    participant1: "test",
    participant2: "osiem",
    score: "1:1",
  };
  t.is(parser.parseScore(match), `1:1`);
});
