'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  let movements = acc.movements;
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class='movements__row'>
        <div class='movements__type movements__type--${type}'>${
          i + 1
        } ${type}</div>
          <div class='movements__date'>${new Date(
            acc.movementsDates[i],
          ).toLocaleDateString()}</div>
        <div class='movements__value'>${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
  labelDate.textContent = new Date().toLocaleString(acc.locale);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);

  resetLogoutTimer();
};

let timer = null;
const resetLogoutTimer = function () {
  if (timer) {
    clearInterval(timer);
  }

  const logoutTime = +new Date() + 50000;

  timer = setInterval(() => {
    let remainedMs = logoutTime - new Date();
    console.log(remainedMs);
    if (remainedMs > 0) {
      labelTimer.textContent = new Intl.DateTimeFormat(currentAccount.locale, {
        minute: 'numeric',
        second: 'numeric',
      }).format(new Date(remainedMs));
    } else {
      clearInterval(timer);
      containerApp.style.opacity = '0';
    }
  }, 1000);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value,
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = '100';

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value,
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username,
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*

// setTimeout vs setInterval

// supports parameters for the callback function
// closure also possible
const orange = 'oranges';
const pizzaTimer = setTimeout(
  function (...components) {
    console.log('pizza!!!', components, orange, this);
  },
  3000,
  'olives',
  'mushrooms',
);
console.log('waiting....');
console.log(pizzaTimer);

// setInterval
const intervalTimer = setInterval(() => console.log(new Date()), 1000);
setTimeout(() => clearInterval(intervalTimer), 5000);
*/

// can be cancelled
//clearTimeout(pizzaTimer);

/*

// i18n of numbers

const num = 123512532351.123;
console.log(new Intl.NumberFormat('en-US').format(num));
console.log(
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(num),
);
console.log(
  new Intl.NumberFormat('de', {
    style: 'currency',
    currency: 'EUR',
  }).format(num),
);
console.log(new Intl.NumberFormat('pl').format(num));
console.log(
  new Intl.NumberFormat('de', {
    style: 'unit',
    unit: 'currency',
  }).format(num),
);
*/

// DATEs
/*

// locale-based formatting is supported by Intl object (namespace)
console.log(new Intl.DateTimeFormat('en-GB').format(new Date()));
let options = {
  hour: 'numeric',
  minute: 'numeric',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  weekday: 'short',
};
console.log(new Intl.DateTimeFormat('en-US', options).format(new Date()));
console.log(new Intl.DateTimeFormat('pl-PL', options).format(new Date()));
console.log(Intl.DateTimeFormat.supportedLocalesOf(['ru', 'be', 'be-BY']));

// locale can be taken from the browser
console.log(navigator.language);
console.log(navigator.languages);
*/

/*

// timestamp can be taken also by converting to number
const future = new Date(2033, 10, 23, 15, 30, 0);
console.log(+future);
console.log(future.getTime());

// substracting the dates will return the difference in unix ms
const future2 = new Date(2033, 10, 23, 15, 30, 1);
console.log(future2 - future);
*/

/*
// by default returns current date and time
const now = new Date();
console.log(now);
console.log(new Date('December 24, 2023'));
console.log(new Date('2023-12-24'));
console.log(account1.movementsDates[0]);
console.log(new Date(account1.movementsDates[0]));

// month in JS is ZERO-based
console.log(new Date(2023, 10, 1));

// JS is auto-spans next months if days are overflown.
// the same is for months
console.log(new Date(2023, 10, 40));
console.log(new Date(2023, 0, 290));

// supports UNIX epoch time in milliseconds
console.log(new Date(0));
console.log(new Date(1));
console.log(new Date(999));
console.log(new Date(1000));*/
/*

// getting components of the
const future = new Date(2033, 10, 23, 15, 30);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());

// to string
console.log(future.toISOString());

// get unix epoch
console.log(future.getTime());
// get unix timestamp for now
console.log(Date.now());

// MUTATION of the dates using setXXXX methods
future.setFullYear(2050);
console.log(future);
*/

/*

// JS can store only 53 integer bits
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MAX_VALUE);

// BigInt - add `n` to use BigInt
console.log(2908570948573094857209384570923874508923475028374509283n);
// constructor should be used ONLY with safe integers
console.log(BigInt(2908570948573094857209384570923874508923475028374509283));

// cannot be implicitly mixed with the other types.
// need explicit conversion
const huge = 2908570948573094857209384570923874508923475028374509283n;
console.log(huge * BigInt(23));

// implicit conversion works with comparison and + conversion
console.log(10n == 10);
console.log(10n >= 10);
console.log(+'10n' >= 10);
console.log(typeof +'10n');
console.log(huge + ' a huge number');

// divisions are scalar (returns the integer part of the division)
*/

/*

// REMAINDER operator %
// use to do something every Nth time.

// numeric separators are underscores
const diameter = 267_454_000_000;
console.log(diameter);

// underscores are ignored
const priceInCents = 34343_00;
console.log(priceInCents);

// are not allowed near decimal separator (dot) or in the beginning end
// cannot place more than one in a row
// are not understood by number parser functions.
*/

/*

// MATH
console.log(25 ** (1 / 2));

// max/min support multiple numbers
// they also do type coersion but no parsing
console.log(Math.max(2, 4, 5, 5, 3, '26', 6));

// NaN is larger than Infinity
console.log(Math.max(2, 4, 5, 5, '32px', '26', 6 / 0));
console.log(Math.max(2, 4, 5, 5, 3, '26', 6 / 0));

// PI
// random

// rounding INTEGERS
// ceil/floor work with negatives
// ceil/floor support type coersion
// trunc just removes the decimal part

// Rounding FLOATING numbers
// toFixed returns a STRING (WHAAAAT?)
console.log((2.7).toFixed(0));
console.log((2.345).toFixed(2));
// however to bring back to number just use +
console.log(+(2.345).toFixed(2));
*/

/*

// NUMBER types are internally are floating point
console.log(23 === 23.0);

// internally they are 64-bit binary values
// because of binary calculations there's no scientific application of js
console.log(0.1 + 0.2 === 0.3); // is false instead of true because of precision issues

// auto-conversion to number can be done using + sign
console.log(typeof +'23');

// parsing
// always supply radix of the numerical system
console.log(Number.parseInt('-30px'));
console.log(Number.parseInt('+30px'));
console.log(Number.parseInt('30easd', 16));
console.log(Number.parseInt('101', 2));

console.log(Number.parseFloat('2.5re,'));
console.log(Number.parseFloat(' \r\n  0.3'));

// isNaN checks if the value is the value of Nan
console.log(Number.isNaN('20.5'));
console.log(Number.isNaN('aweufalewf uhaleufh'));
console.log(Number.isNaN(Number.parseInt('aweufalewf uhaleufh', 10)));

// infinity != NaN
console.log(Number.isNaN(2 / 0));

// checking for infinity
console.log(Number.isFinite(20));
console.log(Number.isFinite(20 / 0));
console.log(Number.isFinite(-20 / 0));

// is finite returns false for non-numbers
// isFinite is the best way to check is the passed value is actually a normal number (not string, not infinite, not NaN)
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20efe'));
console.log(Number.isFinite({}));

// isFinite - for floating points
// isInteger - for integers
console.log(Number.isInteger(20));
console.log(Number.isInteger('20'));
console.log(Number.isInteger(20.0));
console.log(Number.isInteger(20.0));
console.log(Number.isInteger(+'20.0'));
console.log(Number.isInteger(+'20.1'));
console.log(Number.isInteger({}));
*/
