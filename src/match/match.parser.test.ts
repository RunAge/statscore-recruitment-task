import test from "ava";
import { MatchParser } from "./match.parser.js";
import { SportTypeNotSupported } from "./errors/sport-type-not-supported.error.js";
import { BaseMatchParser } from "./parsers/base-match.parser.js";

test("MatchParser - parseMatch", (t) => {
  const testParser: BaseMatchParser<any> = {
    type: "test",
    parseName: () => "test",
    parseScore: () => "1:1",
  };
  const matchParser = new MatchParser([testParser]);
  t.deepEqual(matchParser.parseMatch({ sport: "test", participant1: "", participant2: "", score: "" }), {
    name: "test",
    score: "1:1",
  });
});

test("MatchParser - parseName", (t) => {
  const testParser: BaseMatchParser<any> = {
    type: "test",
    parseName: () => "test",
    parseScore: () => "1:1",
  };
  const matchParser = new MatchParser([testParser]);
  t.is(matchParser.parseName({ sport: "test", participant1: "", participant2: "", score: "" }), "test");
});

test("MatchParser - parseScore", (t) => {
  const testParser: BaseMatchParser<any> = {
    type: "test",
    parseName: () => "test",
    parseScore: () => "1:1",
  };
  const matchParser = new MatchParser([testParser]);
  t.is(matchParser.parseScore({ sport: "test", participant1: "", participant2: "", score: "" }), "1:1");
});

test("MatchParser - parseMatch - not supported", (t) => {
  const testParser: BaseMatchParser<any> = {
    type: "test",
    parseName: () => "test",
    parseScore: () => "1:1",
  };
  const match = { sport: "test2", participant1: "", participant2: "", score: "" };
  const matchParser = new MatchParser([testParser]);
  try {
    matchParser.parseMatch(match);
  } catch (error) {
    t.deepEqual(error, new SportTypeNotSupported());
  }
});

test("MatchParser - parseName - not supported", (t) => {
  const testParser: BaseMatchParser<any> = {
    type: "test",
    parseName: () => "test",
    parseScore: () => "1:1",
  };
  const match = { sport: "test2", participant1: "", participant2: "", score: "" };
  const matchParser = new MatchParser([testParser]);
  try {
    matchParser.parseName(match);
  } catch (error) {
    t.deepEqual(error, new SportTypeNotSupported());
  }
});

test("MatchParser - parseScore - not supported", (t) => {
  const testParser: BaseMatchParser<any> = {
    type: "test",
    parseName: () => "test",
    parseScore: () => "1:1",
  };
  const match = { sport: "test2", participant1: "", participant2: "", score: "" };
  const matchParser = new MatchParser([testParser]);
  try {
    matchParser.parseScore(match);
  } catch (error) {
    t.deepEqual(error, new SportTypeNotSupported());
  }
});
