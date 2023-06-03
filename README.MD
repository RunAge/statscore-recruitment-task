# Statscore recruitment task

Since I lack sufficient context for this code, I have divided it into multiple branches where I have adopted different approaches for refactoring.

Typically, when writing code, I try to remain consistent with the existing coding style of the project.

In branches, we can add asynchronous processing of matches. Then all/part of them could be processed at the same time, after which the filtering of `Promise` which are rejected would be performed. I choose not to use asynchronous functions because the amount of data is small and the operations we perform are not heavy.

# Branches
## Base
- branch: [base](https://github.com/RunAge/statscore-recruitment-task/tree/base)  

This is the base branch for the pull request, designed to simplify the code review process. The branch contains only the necessary files and configuration. As for the provided code for refactoring, I made two modifications: conversion to TypeScript and introduction of several "any" types.

## Simple refactor
- branch: [simple](https://github.com/RunAge/statscore-recruitment-task/tree/simple)  
- pull request: https://github.com/RunAge/statscore-recruitment-task/pull/4  

I have performed a simple refactor by adding tests and making only the necessary changes, based on my opinion.

## Flexible refactor
- branch: [flexible](https://github.com/RunAge/statscore-recruitment-task/tree/flexible)  
- pull request: https://github.com/RunAge/statscore-recruitment-task/pull/5  

In this branch, I have focused on refactoring and enhancing the code to improve its flexibility for adding new sports.
