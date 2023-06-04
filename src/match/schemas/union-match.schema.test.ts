import test from "ava";
import { UnionMatch, unionMatchSchema } from "./union-match.schema.js";
import { SafeParseError, ZodIssueCode } from "zod";

test("UnionMatchSchema - correct data", (t) => {
  const match: UnionMatch = {
    sport: "soccer",
    participant1: "test1",
    participant2: "test2",
    score: "1:1",
  };
  t.deepEqual(unionMatchSchema.parse(match), match);
});

test("UnionMatchSchema - incorrect data", (t) => {
  const match = {
    sport: "test",
    participant1: "test1",
    participant2: "test2",
    score: "1:1",
  };
  const validation = unionMatchSchema.safeParse(match);
  t.assert(!validation.success);
  t.is((validation as SafeParseError<any>).error.issues.length, 1);
  t.assert(
    (validation as SafeParseError<any>).error.issues.every((issue) => issue.code === ZodIssueCode.invalid_union),
  );
});
