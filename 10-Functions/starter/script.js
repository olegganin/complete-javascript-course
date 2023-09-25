'use strict';

// OTHER CLOSURE cases
let f;

const g = function () {
  const a = 23;
  f = () => console.log(a * 2);
};

g();
f();

const h = function () {
  const b = 333;
  f = () => console.log(b * 2);
};

h();
f();
console.dir(f);
const d = f;
d();

/*

// CLOSURES

const secureBooking = function () {
  let passengersCount = 0;
  return [
    () => {
      passengersCount++;
      console.log(`${passengersCount} passengers`);
    },
    () => {
      passengersCount--;
      console.log(`${passengersCount} passengers (decreased)`);
    },
  ];
};

const [booker, unbooker] = secureBooking();

//     closure has priority OVER the scope chain.
//     closure is the variable environment in which the function is created even after factory function execution context is gone
let passengersCount = 123;

//     closure is attached to function execution context by the REFERENCE
booker();
booker();
booker();
unbooker();
unbooker();

//      see the closures in the console
console.dir(booker);
*/

/*

// IIFE - immediately invoked function expressions
(function () {
  console.log('this will run only once');
  const isPrivate = 23;
})();

(() => console.log('single run array func'))();

// However we no longer need IIFE in ES6+ because
// we can use just new scope and const/let
{
  const isPrivateToo = 432423;
  var notPrivate = 'fefef';
}
//console.log(isPrivateToo);
console.log(notPrivate);
*/

/*

const bookings = [];

const createBooking = function (
  flightNumber,
  passengersCount = 1,
  price = 199 * passengersCount,
) {
  const booking = {
    flightNumber,
    passengersCount,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 900);
createBooking('LH123', 2);
createBooking('LH123', undefined, 900);
*/
/*

const flightNum = 'LH1234';
const oleg = {
  name: 'Oleg Ganin',
  passport: 1234134345,
};

const checkIn = function (flight, passenger) {
  flight = 'LH353';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 1234134345) {
    console.log('Checked in!');
  } else {
    console.log('Wrong Passport!');
  }
};

checkIn(flightNum, oleg);
console.log(flightNum);
console.log(oleg);
*/
/*

// Func with call back func arguments

const makeOneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [firstWord, ...otherWords] = str.split(' ');
  return [firstWord.toUpperCase(), ...otherWords].join(' ');
};

// Higher-order function! Because it receives other functions as argument
// and/or returns the function
const transformer = function (str, fn) {
  console.log(fn(str));
  console.log(`Transformed by ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', makeOneWord);

const printFirstLetter = val => console.log(val[0]);
['Jonas', 'Oleg', 'Diana'].forEach(printFirstLetter);
*/
/*

// FUNC which returns functions

const greet = function (greeting) {
    return function (name) {
        return `${greeting}, ${name}`;
    }
}
const greeters = [greet('Hello'), greet('Hey')];

for (const greeter of greeters) {
    console.log(greeter('Oleg'))
}

//     using arrow functions
const greetArr = greeting => name => `${greeting}, ${name}`;
console.log(greetArr('Whatzup')('Bro'));
*/
/*

const lotAirline = {
  name: 'LOT Polska',
  iataCode: 'LOT',
  bookings: [],
  book(flightNum, passengerName) {
    console.log(
      `${passengerName} booked a seat on ${this.name} flight ${this.iataCode}${flightNum}`,
    );
    this.bookings.push({ flightNum, passengerName });
  },
};

lotAirline.book(123, 'Oleg Ganin');
lotAirline.book(2342, 'John Doe');
console.log(lotAirline);

const eurowings = {
  name: 'EURO Wings',
  iataCode: 'EWN',
  bookings: [],
};

const book = lotAirline.book;

// does not work - `this` keyword is now undefined
//book(333, 'Sarah Connor');

//       call with manually supplying underlying target object (`this` reference)
book.call(eurowings, 333, 'Sarah Connor');
console.log(lotAirline);
console.log(eurowings);

book.call(lotAirline, 999, 'Terminator 101');
console.log(lotAirline);
console.log(eurowings);

//      apply() is the same as call() but accepts array of parameters instead of the comma-separated arguments
//      apply() method is legacy old method
const bookingRequests = [
  [342, 'Josh Goudini'],
  [34562, 'Sam Weaving'],
];
for (const bookingRequest of bookingRequests) {
  book.apply(eurowings, bookingRequest);
  book.call(eurowings, ...bookingRequest);
}
console.log(eurowings);

//     bind() sets `this` and returns this-bound function value to be used later.
const bookOnEuroWings = book.bind(eurowings);
bookOnEuroWings(987, 'Bind Me!');
bookOnEuroWings(4587, 'Bind Me Again!');
console.log(eurowings);

//    bind() can accept partial or full list of parameters which are hard coded for this function value (in the original order);
const bookEW123 = book.bind(eurowings, 123);
bookEW123('Ryan Gosling');
bookEW123('Ryan Reynolds');

const bookEW123Kim = book.bind(eurowings, 123, 'Kim Basinger');
bookEW123Kim();
bookEW123Kim();
console.log(eurowings);

//      application of bind() to the event listeners
lotAirline.planes = 300;
lotAirline.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lotAirline.buyPlane.bind(lotAirline));

//       use bind just to pre-set partial parameters
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(200));

//     use bind inside the function\
const taxFnFactory = rate => value => value + value * rate;
const addIncomeTax = taxFnFactory(0.13);
console.log(addIncomeTax(100));
*/
