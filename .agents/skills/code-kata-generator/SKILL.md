---
name: "code-kata-generator"
description: "A specialized skill for systematically designing coding practice exercises (Code Kata). Used by the exercise-creator agent to create difficulty-tiered, concept-specific coding exercises with test cases and model solutions. Automatically applied in contexts such as 'coding exercises', 'algorithm problems', 'practice problems', 'kata', 'coding tests', 'programming practice'. However, online judge system integration (LeetCode, HackerRank) and automated grading infrastructure are outside the scope of this skill."
category: "utility"
---

# Code Kata Generator — Coding Exercise Design Tool

A specialized skill that enhances the exercise-creator agent's exercise creation capabilities.

## Target Agent

- **exercise-creator** — Difficulty-tiered exercises, test cases, model solutions

## Exercise Difficulty System

### 5-Tier Difficulty Classification

| Tier | Name | Concepts | Est. Solving Time | Target Phase |
|------|------|----------|-------------------|-------------|
| T1 | Warm-up | Variables, conditionals, loops, functions | 5-15 min | Week 1-2 |
| T2 | Foundation | Arrays, strings, basic data structures | 15-30 min | Week 3-6 |
| T3 | Intermediate | Hash maps, stacks/queues, recursion, sorting | 30-60 min | Week 7-12 |
| T4 | Advanced | Trees, graphs, DP, binary search | 45-90 min | Week 13-20 |
| T5 | Challenge | Composite algorithms, system design | 60-120 min | Week 20+ |

## Exercise Template
