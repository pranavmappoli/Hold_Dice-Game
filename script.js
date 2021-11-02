'use strict';

//////////////////////////////////////////////Event handlers
//Buttons
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//others
const diceImg = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

/////////////Player switch function

const switchPlayer = () => {
  crntScore = 0;
  document.getElementById(`current--${crntUser}`).textContent = crntScore;
  crntUser = crntUser == 1 ? 0 : 1;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//////////////////Roll Dice
let crntScore = 0;
let crntUser = 0;
let playing = true;
btnRollDice.addEventListener('click', function () {
  if (playing) {
    diceImg.classList.remove('hidden');
    const diceNum = Math.round(Math.random() * 5) + 1;
    diceImg.src = `dice-${diceNum}.png`;
    if (diceNum != 1) {
      crntScore += diceNum;
      document.getElementById(`current--${crntUser}`).textContent = crntScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

////////////btn Hold
let scores = [0, 0];
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[crntUser] += crntScore;
    document.getElementById(`score--${crntUser}`).textContent =
      scores[crntUser];
    if (scores[crntUser] > 100) {
      playing = false;
      document
        .querySelector(`.player--${crntUser}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${crntUser}`)
        .classList.remove('player--active');
      diceImg.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//btnNewGame

btnNewGame.addEventListener('click', function () {
  scores = [0, 0];
  playing = true;
  diceImg.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  document
    .querySelector(`.player--${crntUser}`)
    .classList.remove('player--winner');
  crntScore = 0;
  crntUser = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
});
