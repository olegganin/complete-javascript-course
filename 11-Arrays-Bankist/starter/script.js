'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
let currentAccount = null;

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

const displayMovements = function (movements, sortOrder = null) {
  containerMovements.innerHTML = '';

  const sortedMovements = movements.slice().sort((a, b) => {
    switch (sortOrder) {
      case 'asc':
        return a - b;
        break;
      case 'desc':
        return b - a;
        break;
      default:
        return 0;
    }
  });

  sortedMovements.forEach((movement, movementIndex) => {
    let movementType = movement >= 0 ? 'deposit' : 'withdrawal';
    const htmlRow = `<div class='movements__row'>
          <div class='movements__type movements__type--${movementType}'>${
            movementIndex + 1
          } ${movementType}</div>
          <div class='movements__date'>3 days ago</div>
          <div class='movements__value'>${movement}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', htmlRow);
  });
};

// Calculate and show current balance
const formatCurrency = value => `${value}€`;

const calcBalance = account => {
  const balance = account.movements.reduce(
    (balance, movement) => balance + movement,
    0,
  );
  account.balance = balance;
  return balance;
};

const displayBalance = function (account) {
  const balance = calcBalance(account);
  labelBalance.textContent = formatCurrency(balance);
};

const calcTotalIncome = movements =>
  movements
    .filter(movement => movement > 0)
    .reduce((total, movement) => total + movement, 0);

const calcTotalSpent = movements =>
  movements
    .filter(movement => movement < 0)
    .reduce((total, movement) => total + Math.abs(movement), 0);

const calcInterest = account =>
  account.movements
    .filter(movement => movement > 0)
    .map(movement => (movement * account.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((total, interest) => total + interest, 0);

const displaySummary = function (account) {
  const totalIncome = calcTotalIncome(account.movements);
  const totalSpent = calcTotalSpent(account.movements);
  const totalInterest = calcInterest(account);

  labelSumIn.textContent = formatCurrency(totalIncome);
  labelSumOut.textContent = formatCurrency(totalSpent);
  labelSumInterest.textContent = formatCurrency(totalInterest);
};

// Compute usernames for each user
// createUserNames is a procedure making side effects.
// however the usage of map is a function which generates array of first letters. Thus there's no side effects of this function - it creates new data only.
const createUserNames = function (accountsToUpdate) {
  accountsToUpdate.forEach(account => {
    account.username = account.owner
      // split words
      .split(' ')
      // take first letter of each word and lower-case it
      .map(nameComponent => nameComponent[0].toLowerCase())
      // join all initials into one string
      .join('');
  });
};
createUserNames(accounts);

// calculate initial balances for accounts
accounts.forEach(acc => calcBalance(acc));

const displayAccountData = function (account) {
  displayMovements(account.movements);
  displayBalance(account);
  displaySummary(account);

  containerApp.style.opacity = '100';
};

const hideAccountData = function (account) {
  containerApp.style.opacity = '0';
};

const loginUser = function (username, pin) {
  const account = accounts.find(
    acc => acc.username === username && acc.pin === Number(pin),
  );
  if (account) {
    labelWelcome.textContent = `Welcome back, ${account.owner.split(' ')[0]}!`;
    displayAccountData(account);
    currentAccount = account;
  } else {
    hideAccountData(account);
    currentAccount = null;
  }
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginUsername.blur();
  inputLoginPin.blur();
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  loginUser(inputLoginUsername.value, inputLoginPin.value);
});

// Transfer money feature
const transferMoney = (fromAccount, toAccount, amount) => {
  fromAccount.movements.push(-amount);
  toAccount.movements.push(amount);
  calcBalance(fromAccount);
  calcBalance(toAccount);
};

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const toAccount = accounts.find(
    acc => acc.username === inputTransferTo.value,
  );
  const amount = Number(inputTransferAmount.value);
  if (
    toAccount &&
    toAccount !== currentAccount &&
    amount > 0 &&
    currentAccount.balance >= amount
  ) {
    transferMoney(currentAccount, toAccount, amount);
    displayAccountData(currentAccount);
  }
  inputTransferTo.value = inputTransferAmount.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  inputLoanAmount.value = '';
  inputLoanAmount.blur();

  if (
    amount > 0 &&
    currentAccount.movements.some(m => m > 0 && m >= amount * 0.1)
  ) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      displayAccountData(currentAccount);
    }, 3000);
  }
});

const closeAccount = function (username, pin) {
  if (
    currentAccount.username === username &&
    currentAccount.pin === Number(pin)
  ) {
    hideAccountData();

    const accountIndexToClose = accounts.findIndex(
      acc => acc === currentAccount,
    );

    accounts.splice(accountIndexToClose, 1);
  }
};

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  closeAccount(inputCloseUsername.value, inputClosePin.value);
  inputCloseUsername.value = inputClosePin.value = '';
  inputCloseUsername.blur();
  inputClosePin.blur();
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  if (this.textContent[0] === '↓') {
    displayMovements(currentAccount.movements, 'asc');
    this.textContent = this.textContent.replace('↓', '↑');
  } else {
    displayMovements(currentAccount.movements, 'desc');
    this.textContent = this.textContent.replace('↑', '↓');
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*

const numDeposits1000 = accounts
  .flatMap(a => a.movements)
  .reduce((amount, movement) => (movement >= 1000 ? ++amount : amount), 0);
console.log(numDeposits1000);

*/
/*
const totalSummary = accounts
  .flatMap(a => a.movements)
  .reduce(
    (summary, movement) => {
      movement > 0
        ? (summary.depositsTotal += movement)
        : (summary.withdrawalsTotal += -movement);
      return summary;
    },
    {
      depositsTotal: 0,
      withdrawalsTotal: 0,
    },
  );
console.log(totalSummary);*/
/*

// convert to title
const exceptions = new Set(['a', 'the', 'with', 'of']);
const convertToTitle = text =>
  text
    .toLowerCase()
    .split(' ')
    .map((word, index) =>
      exceptions.has(word) && index > 0
        ? word
        : word[0].toUpperCase().concat(word.slice(1)),
    )
    .join(' ');

console.log(convertToTitle('the loRd oF the RINGS'));
*/

// SUMMARY

// array MUTATION
// insert end - push
// insert start - unshift
// insert somewhere - splice

// remove end - pop
// remove start - shift
// remove somewhere - splice

// update array without changing length
// reverse
/*
 * fill
 * splice
 * sort
 *
 * Transform to NEW array
 * slice
 * concat
 * map
 * filter
 * flat
 * flatMap
 *
 * GET INDEX OF element
 * indexOf
 * findIndex
 *
 * GET element
 * at
 * find
 *
 * CHECK if element exists in array
 * includes
 * some
 * every
 *
 * COMPRESS array into a value
 * join
 * reduce
 *
 * ITERATE over
 * forEach
 *
 *
 *
 *
 *
 * */

/*

// array constructor with one argument is the SIZE of array
const arrayOfSevenElements = new Array(7);
console.log(arrayOfSevenElements);
// map doesn't work on empty arrays
console.log(arrayOfSevenElements.map(() => 1));

// can be filled with - completely or partially
// FILL MUTATES the original array.
arrayOfSevenElements.fill(1, 3, 5);
console.log(arrayOfSevenElements);
console.log(arrayOfSevenElements[0]);
console.log(arrayOfSevenElements[3]);
console.log(arrayOfSevenElements.map(() => 2));

// can be used to OVERRIDE values
const existingArr = [1, 2, 3, 4, 5, 6, 7];
existingArr.fill(12, 3, 6);
console.log(existingArr);

// more complex filling can be done with static factory method FROM
const z = Array.from({ length: 7 }, (_, itemIndex) => itemIndex + 1);
console.log(z);

const dices = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random() * 6) + 1,
);
console.log(dices);
*/
/*

const movementsUI = document.querySelectorAll('.movements__value');
// the result of querySelectorAll is NOT an array.
// So in order to get prices we need to convert it to the array
// Array.from is a combination of to-array converter AND map function
const movementsUIArray = Array.from(movementsUI, movementLabel =>
  Number(movementLabel.textContent.replaceAll(' ', '').slice(0, -1)),
);
console.log(movementsUIArray);
*/

/*

// SORT mutates the original array
// by default it sorts the string representation of values
const owners = [
  'Oleg',
  '0',
  'Adam',
  '0Zet',
  String(null),
  'nullable',
  0,
  1,
  11,
  10,
  2,
  Number('efe'),
  {},
  String({}),
  'Zachary',
  undefined,
  'Miledy',
];
console.log(owners.sort());
console.log(owners);

// numerical sort can be done by providing comparator function
movements.sort((a, b) => a - b);
console.log(movements);
*/

/*

// FLAT method flattens the array

// by default flattening is one level deep
// does not change original array
const arr = [
  [1, 2, 3],
  4,
  [5, [6, 7]],
  8,
  null,
  undefined,
  { names: ['jonas', 'oleg'] },
];
console.log(arr.flat());
console.log(arr.flat(3));
console.log(arr);

// calculate all the movements on all accounts
const totalUsersBalance = accounts
  .map(a => a.movements)
  .flat()
  .reduce((balance, movement) => balance + movement, 0);

console.log(totalUsersBalance);

// FLATMAP is the combination of map which is followed by flat.
// So the calculations above can be rewritten as
// HOWEVER flatmap goes only ONE level deep.
const totalUsersBalance2 = accounts
  .flatMap(a => a.movements)
  .reduce((balance, movement) => balance + movement, 0);

console.log(totalUsersBalance2);
*/

/*

// EVERY array method is true if ALL elements are true
const isDeposit = m => m > 0;
console.log(movements.every(isDeposit));
console.log(account4.movements.every(isDeposit));
*/

/*

// SOME array method - tests if there are any items which match bool condition
console.log(movements.some(m => m > 50));
console.log(movements.some(m => m > 5000));
*/

/*

// FIND method to find SINGLE element which matches condition
const firstWithdraw = movements.find(movement => movement < 0);
console.log(firstWithdraw);
*/

/*

// REDUCE is the accumulator function which compresses the array to a single value
const currentBalance = movements.reduce(
  (balance, currentMovement) => balance + currentMovement,
  0, // initial balance value (initial accumulator value
);
console.log(currentBalance);

const maxMovement = movements.reduce(
  (max, currentMovement) => Math.max(max, Math.abs(currentMovement)),
  movements[0],
);
console.log(maxMovement);
*/

/*

// FILTER method creates new array where only passing condition members are left. Hence, the FILTER!
const depositsOnly = movements.filter(val => val > 0);
const withdrawalsOnly = movements.filter(val => val < 0);
console.log(depositsOnly);
console.log(withdrawalsOnly);
*/

/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// array AT method is handy for getting elements of the array from the end
console.log(arr.at(-1));
console.log(arr.at(-10));
console.log(arr.at(11));

// AT works on strings as well
console.log('oleg'.at(-1));
*/

/*

// SLICE behaves exactly the same as for strings
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

// slice can be used to create a shallow copy of array
console.log(arr.slice());

// SPLICE is the same as slice but mutates original array instead of copying
//     2nd parameter in splice is the count of chars to remove
arr.splice(0, 3);
console.log(arr);
console.log('Extracted arr:', arr.splice(2));
console.log('Mutated arr:', arr);
//     can be used to remove elements from array
arr.splice(-1);
console.log(arr);

// REVERSE mutates original array
arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.reverse());
console.log(arr);

// CONCAT does NOT mutate original arrays

arr = ['a', 'b', 'c', 'd', 'e'];
let arr2 = ['f', 'g', 'h', 'i', 'j'];
console.log(arr.concat(arr2));
console.log(arr);
console.log(arr2);

// JOIN does NOT mutate original arrays
console.log(arr.join(' - '));
console.log(arr);
*/
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// FOREACH array method
// callback signature supports index and source array arguments as well
// BREAK and CONTINUE do not work here (because of callback)
movements.forEach((movement, currentIndex, entireArray) => {
  movement >= 0
    ? console.log(`${currentIndex + 1}. You deposited ${movement}$`)
    : console.log(`${currentIndex + 1}. You withdrew ${movement}$`);
});*/
/*

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// FOREACH with MAPS
currencies.forEach(function (value, key, sourceMap) {
  console.log(value, key, sourceMap);
});

// FOREACH with SETS
const currenciesUnique = new Set(['USD', 'EUR', 'USD']);

// callback has the key as well. BUT it is the same as value.
// So it can be ignored using underscore as the name of the parameter
currenciesUnique.forEach(function (value, _, sourceSet) {
  console.log(value, sourceSet);
});
*/
/*

// MAP array method - transforms each element individually using the provided function over each element in the array and returns new array
const eurToUsdConversionRate = 1.1;
const movementsInUsd = movements.map(
  movement => movement * eurToUsdConversionRate,
);
console.log(movementsInUsd);

const movementsLabels = movements.map(
  (movement, currentIndex) =>
    `${currentIndex + 1}. You ${
      movement >= 0 ? 'deposited' : 'withdrew'
    } ${Math.abs(movement)}$`,
);
console.log(movementsLabels);
*/
