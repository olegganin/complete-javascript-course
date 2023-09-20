'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski'
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze'
    ]
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
    'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5
  }
};

console.log('1. Print goal number and name of the player');
for (const [goalIndex, playerName] of game.scored.entries()) {
  console.log(`Goal ${goalIndex + 1}: ${playerName}`);
}

console.log('2. Use a loop to calculate the average odd and log it to the console');
const oddsValues = Object.values(game.odds);
let sumOfOdds = 0;
for (const oddValue of oddsValues) {
  sumOfOdds += oddValue;
}
console.log(`The average odds are ${sumOfOdds / oddsValues.length} `);

console.log('3. Print the 3 odds');
for (const [teamNumber, oddsValue] of Object.entries(game.odds)) {
  console.log(`Odds of ${game[teamNumber] ?? 'draw'} is ${oddsValue}`);
}

console.log('4. Bonus: Create an object called \'scorers\' which contains the names of the\n' +
  'players who scored as properties, and the number of goals as the value');
const scorers = {};
for (const scorer of game.scored) {
  scorers[scorer] = (scorers[scorer] ?? 0) + 1;
}
console.log('Scorers: ', scorers);
