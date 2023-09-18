'use strict';

// Selecting elements
const player0Element = document.querySelector(`.player--0`);
const player1Element = document.querySelector(`.player--1`);
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const newGameButton = document.querySelector('.btn--new');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

// Starting conditions
score0Element.textContent = '0';
score1Element.textContent = '0';
diceElement.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

const init = function() {
  score0Element.textContent = '0';
  score1Element.textContent = '0';
  current0Element.textContent = '0';
  current1Element.textContent = '0';

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

init();

const switchPlayer = function() {
  document.getElementById(`current--${activePlayer}`).textContent = '0';
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Rolling dice functionality
rollButton.addEventListener('click', function() {
  if (playing) {

    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. Display dice
    diceElement.src = `dice-${dice}.png`;
    diceElement.classList.remove('hidden');

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore.toString();
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

holdButton.addEventListener('click', function() {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent
      = scores[activePlayer].toString();

    // 2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      const activePlayerElement = document.querySelector(`.player--${activePlayer}`);
      activePlayerElement.classList.add('player--winner');
      activePlayerElement.classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

newGameButton.addEventListener('click', init);
