'use strict';

/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating NEW variable with the same name as outer scope's variable
      const firstName = 'Steven';

      // re-assigning outer scope's variable
      output = 'NEW OUTPUT';

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    console.log(millenial);
    //console.log(add(2, 3));
    console.log(output);
  }

  printAge();

  return age;

const firstName = 'Jonas';
calcAge(1991);
//console.log(age);
//printAge();

}
*/
/*

// Variables
console.log(me);
//console.log(job);
// console.log(year);

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// Functions
console.log(addDecl(2, 3));
//console.log(addExpr(2, 3));
console.log(addArrow);

//console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// Example
console.log(numProducts);
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

var x = 1;
let y = 2;
const z = 3;

3.514;
console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);
*/
/*

const myName = 'Oleg';
if (myName === 'Oleg') {
  //console.log(`Oleg's job is ${job}`);
  const job = 'programmer';
  console.log(x);
}
*/
/*

// Variables
console.log(me);
//console.log(job);
//console.log(year);

var me = 'Oleg';
let job = 'teacher';
const year = 1991;

// Functions
console.log(addDecl(1, 2));
//console.log(addExpr(1, 2));
//console.log(addArrow(1, 2));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

// Example
if (!numProducts) {
  deleteShoppingCart();
}

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted');
}

var x = 1;
let y = 2;
const z = 3;
*/
/*
console.log(this);

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAge(1991);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAgeArrow(1980);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge();

const matilda = {
  year: 2017,
};
matilda.calcAge = jonas.calcAge;
matilda.calcAge();

const f = jonas.calcAge;
f();*/

// var firstName = 'Oleg';
/*

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    const self = this;
    const isMillenial = function () {
      console.log(self);
      console.log(self.year >= 1981 && self.year <= 1996);
    };

    const isMillenialArrow = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    isMillenial();
    isMillenialArrow();
  },
  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};
//jonas.greet();
jonas.calcAge();

const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);

const addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(4, 5);
*/
/*

let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me = {
  name: 'Jonas',
  age: 30,
};
const friend = me;
friend.age = 27;

console.log('Friend', friend);
console.log('Me', me);
*/
/*
const obj = {
  age: 30,
  calcBirth: function (year) {
    console.log(this);

    const childArrow = () => {
      console.log('In arrow', this);

      const child2Arrow = () => {
        console.log('In arrow level 2', this);
      };

      const child2Expr = function () {
        console.log('In expression level 2', this);
      };

      child2Arrow();
      child2Expr();
    };

    const childExpr = function () {
      console.log('In expression level 1', this);
    };

    childArrow();
    childExpr();
  },
};
obj.calcBirth('In object', 1992);
*/

// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica);

//marriedJessica = {};

// Copying object
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);

jessicaCopy.lastName = 'Davis';
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);
