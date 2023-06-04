import test from "ava";
import { SoccerMatchParser } from "./soccer-match.parser.js";
import { SoccerMatch } from "../schemas/match/soccer-match.schema.js";

test("SoccerMatchParser - parseName", (t) => {
  const parser = new SoccerMatchParser();
  const match: SoccerMatch = {
    sport: "soccer",
    participant1: "test",
    participant2: "osiem",
    score: "1:1",
  };
  t.is(parser.parseName(match), `test - osiem`);
});

test("SoccerMatchParser - parseScore", (t) => {
  const parser = new SoccerMatchParser();
  const match: SoccerMatch = {
    sport: "soccer",
    participant1: "test",
    participant2: "osiem",
    score: "1:1",
  };
  t.is(parser.parseScore(match), `1:1`);
});
