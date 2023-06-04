import test from "ava";
import { SafeParseError, ZodIssueCode } from "zod";
import { TennisMatch, tennisMatchSchema } from "./tennis-match.schema.js";

test("TennisMatchSchema - correct data", (t) => {
  const match: TennisMatch = {
    sport: "tennis",
    participant1: "test1",
    participant2: "test2",
    score: "1:1,1:1,1:1,1:1",
  };
  t.deepEqual(tennisMatchSchema.parse(match), match);
});

test("TennisMatchSchema - incorrect data", (t) => {
  const match = {
    sport: "tennis",
    participant1: "test1",
    participant2: "test2",
    score: ["1:1"],
  };
  const validation = tennisMatchSchema.safeParse(match);
  t.assert(!validation.success);
  t.is((validation as SafeParseError<any>).error.issues.length, 1);
  t.assert((validation as SafeParseError<any>).error.issues.every((issue) => issue.code === ZodIssueCode.invalid_type));
});

test("TennisMatchSchema - incorrect score", (t) => {
  const match = {
    sport: "tennis",
    participant1: "test1",
    participant2: "test2",
    score: "1:A",
  };
  const validation = tennisMatchSchema.safeParse(match);
  t.assert(!validation.success);
  t.is((validation as SafeParseError<any>).error.issues.length, 1);
  t.assert(
    (validation as SafeParseError<any>).error.issues.every((issue) => issue.code === ZodIssueCode.invalid_string),
  );
});
