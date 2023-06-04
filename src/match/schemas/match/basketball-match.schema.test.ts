import test from "ava";
import { SafeParseError, ZodIssueCode } from "zod";
import { BasketballMatch, basketballMatchSchema } from "./basketball-match.schema.js";

test("BasketballMatchSchema - correct data", (t) => {
  const match: BasketballMatch = {
    sport: "basketball",
    participant1: "test1",
    participant2: "test2",
    score: [
      ["1:1", "2:2"],
      ["3:3", "4:4"],
    ],
  };
  t.deepEqual(basketballMatchSchema.parse(match), match);
});

test("BasketballMatchSchema - incorrect data", (t) => {
  const match = {
    sport: "basketball",
    participant1: "test1",
    participant2: "test2",
    score: "1:1",
  };
  const validation = basketballMatchSchema.safeParse(match);
  t.assert(!validation.success);
  t.is((validation as SafeParseError<any>).error.issues.length, 1);
  t.assert((validation as SafeParseError<any>).error.issues.every((issue) => issue.code === ZodIssueCode.invalid_type));
});

test("BasketballMatchSchema - incorrect score", (t) => {
  const match = {
    sport: "basketball",
    participant1: "test1",
    participant2: "test2",
    score: [
      ["1:A", "2:2"],
      ["3:3", "4:4"],
    ],
  };
  const validation = basketballMatchSchema.safeParse(match);
  t.assert(!validation.success);
  t.is((validation as SafeParseError<any>).error.issues.length, 1);
  t.assert(
    (validation as SafeParseError<any>).error.issues.every((issue) => issue.code === ZodIssueCode.invalid_string),
  );
});
