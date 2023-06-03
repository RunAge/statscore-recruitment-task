import test from "ava";

import { InvalidSportError } from "./errors/invalid-sport.error.js";
import { EventParser } from "./event-parser.js";
import { InvalidScoreError } from "./errors/invalid-score.error.js";

test("EventParser - makeEventName - joined by dash", (t) => {
  const eventParser = new EventParser();
  const event = {
    sport: "soccer",
    participant1: "Chelsea",
    participant2: "Arsenal",
    score: "2:1",
  };
  t.is(eventParser.makeEventName(event), "Chelsea - Arsenal");
});

test("EventParser - makeEventName - joined by 'vs'", (t) => {
  const eventParser = new EventParser();
  const event = {
    sport: "tennis",
    participant1: "Maria Sharapova",
    participant2: "Serena Williams",
    score: "2:1,7:6,6:3,6:7",
  };
  t.is(eventParser.makeEventName(event), "Maria Sharapova vs Serena Williams");
});

test("EventParser - makeEventName - unknown sport", (t) => {
  const eventParser = new EventParser();
  const event = {
    sport: "snooker",
    participant1: "Ronnie O'Sullivan",
    participant2: "Mark Williams",
    score: "6:5",
  };
  try {
    eventParser.makeEventName(event);
  } catch (error) {
    t.deepEqual(error, new InvalidSportError());
  }
});

test("EventParser - formatScore - simple", (t) => {
  const eventParser = new EventParser();
  const event = {
    sport: "soccer",
    participant1: "Chelsea",
    participant2: "Arsenal",
    score: "2:1",
  };
  t.is(eventParser.formatScore(event), "2:1");
});

test("EventParser - formatScore - sets", (t) => {
  const eventParser = new EventParser();
  const event = {
    sport: "volleyball",
    participant1: "Germany",
    participant2: "France",
    score: "3:0,25:23,25:19,25:21",
  };
  t.is(eventParser.formatScore(event), "Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)");
});

test("EventParser - formatScore - array", (t) => {
  const eventParser = new EventParser();
  const event = {
    sport: "basketball",
    participant1: "GKS Tychy",
    participant2: "GKS Katowice",
    score: [
      ["9:7", "2:1"],
      ["5:3", "9:9"],
    ],
  };
  t.is(eventParser.formatScore(event), "9:7,2:1,5:3,9:9");
});

test("EventParser - formatScore - unknown sport", (t) => {
  const eventParser = new EventParser();
  const event = {
    sport: "snooker",
    participant1: "Ronnie O'Sullivan",
    participant2: "Mark Williams",
    score: "6:5",
  };
  try {
    eventParser.formatScore(event);
  } catch (error) {
    t.deepEqual(error, new InvalidSportError());
  }
});

test("EventParser - formatScore - simple - invalid score", (t) => {
  const eventParser = new EventParser();
  const event = {
    sport: "soccer",
    participant1: "Chelsea",
    participant2: "Arsenal",
    score: [
      ["9:7", "2:1"],
      ["5:3", "9:9"],
    ],
  };
  try {
    eventParser.formatScore(event);
  } catch (error) {
    t.deepEqual(error, new InvalidScoreError(event));
  }
});

test("EventParser - formatScore - array - invalid score", (t) => {
  const eventParser = new EventParser();
  const event = {
    sport: "basketball",
    participant1: "GKS Tychy",
    participant2: "GKS Katowice",
    score: "1:1",
  };
  try {
    eventParser.formatScore(event);
  } catch (error) {
    t.deepEqual(error, new InvalidScoreError(event));
  }
});

test("EventParser - formatScore - sets - invalid score - string", (t) => {
  const eventParser = new EventParser();
  const event = {
    sport: "volleyball",
    participant1: "Germany",
    participant2: "France",
    score: "3:0",
  };
  try {
    eventParser.formatScore(event);
  } catch (error) {
    t.deepEqual(error, new InvalidScoreError(event));
  }
});

test("EventParser - formatScore - sets - invalid score - array", (t) => {
  const eventParser = new EventParser();
  const event = {
    sport: "volleyball",
    participant1: "Germany",
    participant2: "France",
    score: [
      ["9:7", "2:1"],
      ["5:3", "9:9"],
    ],
  };
  try {
    eventParser.formatScore(event);
  } catch (error) {
    t.deepEqual(error, new InvalidScoreError(event));
  }
});
