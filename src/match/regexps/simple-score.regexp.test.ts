import test from "ava";

import { simpleScoreRegExp } from "./simple-score.regexp.js";

test("simpleScoreRegExp - correct", (t) => {
  t.assert(simpleScoreRegExp.test("1:1"));
});

test("simpleScoreRegExp - incorrect", (t) => {
  t.assert(!simpleScoreRegExp.test("1:c,1:1,a:1,1:1"));
  t.assert(!simpleScoreRegExp.test("1:c"));
});
