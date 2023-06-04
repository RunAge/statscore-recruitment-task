import test from "ava";
import { SafeParseError, ZodIssueCode } from "zod";
import { VolleyballMatch, volleyballMatchSchema } from "./volleyball-match.schema.js";

test("VolleyballMatchSchema - correct data", (t) => {
  const match: VolleyballMatch = {
    sport: "volleyball",
    participant1: "test1",
    participant2: "test2",
    score: "1:1,1:1,1:1,1:1",
  };
  t.deepEqual(volleyballMatchSchema.parse(match), match);
});

test("VolleyballMatchSchema - incorrect data", (t) => {
  const match = {
    sport: "volleyball",
    participant1: "test1",
    participant2: "test2",
    score: ["1:1"],
  };
  const validation = volleyballMatchSchema.safeParse(match);
  t.assert(!validation.success);
  t.is((validation as SafeParseError<any>).error.issues.length, 1);
  t.assert((validation as SafeParseError<any>).error.issues.every((issue) => issue.code === ZodIssueCode.invalid_type));
});

test("VolleyballMatchSchema - incorrect score", (t) => {
  const match = {
    sport: "volleyball",
    participant1: "test1",
    participant2: "test2",
    score: "1:A",
  };
  const validation = volleyballMatchSchema.safeParse(match);
  t.assert(!validation.success);
  t.is((validation as SafeParseError<any>).error.issues.length, 1);
  t.assert(
    (validation as SafeParseError<any>).error.issues.every((issue) => issue.code === ZodIssueCode.invalid_string),
  );
});
