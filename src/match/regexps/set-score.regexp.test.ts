import test from "ava";
import { setScoreRegExp } from "./set-score.regexp.js";

test("setScoreRegExp - correct", (t) => {
  t.assert(setScoreRegExp.test("1:1,1:1,1:1,1:1"));
});

test("setScoreRegExp - incorrect", (t) => {
  t.assert(!setScoreRegExp.test("1:c,1:1,a:1,1:1"));
});
