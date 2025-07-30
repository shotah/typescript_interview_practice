// https://leetcode.com/problems/min-cost-climbing-stairs/
// You are given an integer array cost where cost[i] is the cost of ith step on a staircase.
// Once you pay the cost, you can either climb one or two steps.
// You can either start from the step with index 0, or the step with index 1.
// Return the minimum cost to reach the top of the floor.
// Example 1:
// Input: cost = [10, 15, 20]
// Output: 15
function minCostClimbingStairs(cost: number[]): number {
  const steps = cost.length;
  if (steps === 0) return 0;
  if (steps === 1) return cost[0];
  if (steps === 2) return Math.min(cost[0], cost[1]);

  // Dynamic programming array to store the minimum cost to reach each step
  // dp[i] will hold the minimum cost to reach step i
  const dp: number[] = new Array(steps + 1).fill(0);
  dp[0] = cost[0];
  dp[1] = cost[1];
  for (let i = 2; i <= steps; i++) {
    // Set the current step cost to 0 if it exceeds the length of the cost array
    const stepCost = i < steps ? cost[i] : 0;

    // Calculate the minimum cost to reach the current step
    // by taking the minimum of the cost to reach the previous step plus the current step cost
    dp[i] = Math.min(dp[i - 1] + stepCost, dp[i - 2] + stepCost);
  }
  return dp[steps];
}

import {assert} from 'chai';
let n: number[];
let output: number;

n = [10, 15, 20];
output = 15;
assert.equal(minCostClimbingStairs(n), output);
