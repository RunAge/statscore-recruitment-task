import test from "ava";
import { SafeParseError, ZodIssueCode } from "zod";
import { SoccerMatch, soccerMatchSchema } from "./soccer-match.schema.js";

test("SoccerMatchSchema - correct data", (t) => {
  const match: SoccerMatch = {
    sport: "soccer",
    participant1: "test1",
    participant2: "test2",
    score: "1:1",
  };
  t.deepEqual(soccerMatchSchema.parse(match), match);
});

test("SoccerMatchSchema - incorrect data", (t) => {
  const match = {
    sport: "soccer",
    participant1: "test1",
    participant2: "test2",
    score: ["1:1"],
  };
  const validation = soccerMatchSchema.safeParse(match);
  t.assert(!validation.success);
  t.is((validation as SafeParseError<any>).error.issues.length, 1);
  t.assert((validation as SafeParseError<any>).error.issues.every((issue) => issue.code === ZodIssueCode.invalid_type));
});

test("SoccerMatchSchema - incorrect score", (t) => {
  const match = {
    sport: "soccer",
    participant1: "test1",
    participant2: "test2",
    score: "1:A",
  };
  const validation = soccerMatchSchema.safeParse(match);
  t.assert(!validation.success);
  t.is((validation as SafeParseError<any>).error.issues.length, 1);
  t.assert(
    (validation as SafeParseError<any>).error.issues.every((issue) => issue.code === ZodIssueCode.invalid_string),
  );
});
