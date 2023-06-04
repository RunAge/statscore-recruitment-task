import test from "ava";
import { SafeParseError, ZodIssueCode } from "zod";
import { HandballMatch, handballMatchSchema } from "./handball-match.schema.js";

test("HandballMatchSchema - correct data", (t) => {
  const match: HandballMatch = {
    sport: "handball",
    participant1: "test1",
    participant2: "test2",
    score: "1:1",
  };
  t.deepEqual(handballMatchSchema.parse(match), match);
});

test("HandballMatchSchema - incorrect data", (t) => {
  const match = {
    sport: "handball",
    participant1: "test1",
    participant2: "test2",
    score: ["1:1"],
  };
  const validation = handballMatchSchema.safeParse(match);
  t.assert(!validation.success);
  t.is((validation as SafeParseError<any>).error.issues.length, 1);
  t.assert((validation as SafeParseError<any>).error.issues.every((issue) => issue.code === ZodIssueCode.invalid_type));
});

test("HandballMatchSchema - incorrect score", (t) => {
  const match = {
    sport: "handball",
    participant1: "test1",
    participant2: "test2",
    score: "1:A",
  };
  const validation = handballMatchSchema.safeParse(match);
  t.assert(!validation.success);
  t.is((validation as SafeParseError<any>).error.issues.length, 1);
  t.assert(
    (validation as SafeParseError<any>).error.issues.every((issue) => issue.code === ZodIssueCode.invalid_string),
  );
});
