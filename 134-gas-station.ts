// function canCompleteCircuit(gas: number[], cost: number[]): number {
//     const maxGas = gas.reduce((a, b) => a + b, 0)
//     const maxCost = cost.reduce((a, b) => a + b, 0)
//     if (maxCost > maxGas) return -1;

//     let tank = 0;
//     for (let startingStation = 0; startingStation < gas.length; startingStation++) {
//         tank = 0;
//         console.log('starting Station', startingStation)
//         for (let station = 0; station < gas.length; station++) {
//             // calculates next station
//             let nextStation = station + startingStation;
//             if (nextStation >= gas.length) {
//                 nextStation = nextStation - gas.length;
//             }
//             // lets begin from startingStation
//             tank += gas[nextStation];
//             tank -= cost[nextStation];
//             console.log('station', nextStation, 'tank', tank)
//             if (station === gas.length - 1) return startingStation;
//             if (tank <= 0) break;
//         }
//     }
//     return -1
// };

function canCompleteCircuit(gas: number[], cost: number[]): number {
  let tank = 0;
  let total = 0;
  let start = 0;
  for (let i = 0; i < gas.length; i++) {
    tank += gas[i] - cost[i];
    if (tank < 0) {
      start = i + 1;
      total += tank;
      tank = 0;
    }
  }
  return total + tank < 0 ? -1 : start;
}

let gas = [1, 2, 3, 4, 5],
  cost = [3, 4, 5, 1, 2];
// output: 3
console.log(canCompleteCircuit(gas, cost));

(gas = [2, 3, 4]), (cost = [3, 4, 3]);
// output: -1
console.log(canCompleteCircuit(gas, cost));
