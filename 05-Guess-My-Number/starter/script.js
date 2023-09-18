'use strict';

/*

console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function(message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check')
  .addEventListener('click', function() {

    const guess = Number(document.querySelector('.guess').value);

    if (!guess) {
      // When no input
      displayMessage('⛔ No number!');

    } else if (guess === secretNumber) {
      // When player wins
      displayMessage('🎉 Correct Number!');
      document.querySelector('.number').textContent = secretNumber.toString();

      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';

      if (score > highScore) {
        highScore = score;
        document.querySelector('.highscore').textContent = highScore.toString();
      }

    } else if (guess !== secretNumber) {
      // when guess is wrong
      if (score > 1) {
        displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
        score--;
      } else {
        displayMessage('You lost the game!');
        score = 0;
      }
    }

    document.querySelector('.score').textContent = score.toString();

  });

document.querySelector('.again')
  .addEventListener('click', function() {
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    score = 20;
    document.querySelector('.score').textContent = score.toString();
    document.querySelector('.number').textContent = '?';
    displayMessage('Start guessing...');
    document.querySelector('body').style.backgroundColor = null;
    document.querySelector('.number').style.width = null;
    document.querySelector('.guess').value = '';
  });
