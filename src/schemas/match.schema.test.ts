import test from "ava";
import { matchSchema } from "./match.schema.js";
import { SafeParseError } from "zod";

test("Match schema - validation pass", async (t) => {
  const match = {
    sport: "soccer",
    participant1: "Chelsea",
    participant2: "Arsenal",
    score: "2:1",
  };
  const validatedMatch = await matchSchema.safeParseAsync(match);

  t.assert(validatedMatch.success);
});

test("Match schema - validation fail - invalid score ", async (t) => {
  const match = {
    sport: "soccer",
    participant1: "Chelsea",
    participant2: "Arsenal",
    score: ["1:2", "2:1"],
  };
  const validatedMatch = await matchSchema.safeParseAsync(match);

  t.assert(!validatedMatch.success);
  t.is((validatedMatch as SafeParseError<typeof match>).error.issues.length, 1);
  t.assert(
    (validatedMatch as SafeParseError<typeof match>).error.issues.every((issue) => issue.path.includes("score")),
  );
});

test("Match schema - validation fail - missing participant", async (t) => {
  const match = {
    sport: "soccer",
    participant2: "Arsenal",
    score: "1:1",
  };
  const validatedMatch = await matchSchema.safeParseAsync(match);

  t.assert(!validatedMatch.success);
  t.is((validatedMatch as SafeParseError<typeof match>).error.issues.length, 1);
  t.assert(
    (validatedMatch as SafeParseError<typeof match>).error.issues.every((issue) => issue.path.includes("participant1")),
  );
});
