'use strict';

// Football game
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

const [players1, players2] = game.players;
console.log('Team 1 and Team 2:', players1, players2);

const [gk, ...fieldPlayers] = players1;
console.log('Team 1 GK and others:', gk, fieldPlayers);

const allPlayers = [...players1, ...players2];
console.log('All players: ', allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log('Team 1 after replacements: ', players1Final);

const { team1, x: draw, team2 } = game.odds;
console.log('Odds (t1, draw, t2): ', team1, draw, team2);

const printGoals = function(...playerNames) {
  console.log('Players scored: ', ...playerNames);
  console.log('Total goals scored: ', playerNames.length);
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

// game.odds.team2 = game.odds.team1;
// game.odds.team1 = 10;
console.log('The team which is more likely to win is: ',
  (game.odds.team1 < game.odds.team2 && 'Team 1')
  || (game.odds.team1 == game.odds.team2 && 'Equal chances')
  || 'Team 2');
