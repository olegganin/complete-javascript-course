'use strict';

// OOP - abstraction, incapsulation, inheritance and polymorphism
// in JS - objects are the instances of classes which delegate their behavior to the linked prototype. This is not instantiation but a similar concept.
// the reference to prototype is possible using `.prototype` property of the object (instance)
/*

// Defining a class with constructor function
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // NEVER use `this` to define functions
  // that's because this creates instance of function for each object instance.
  // this is bad for performance.
  // Create instance of this function on the prototype instead ONCE.
  /!*  this.calcAge = function () {
    return new Date().getFullYear() - this.birthYear;
  };*!/
};

Person.prototype.calcAge = function () {
  return new Date().getFullYear() - this.birthYear;
};
const me = new Person('Oleg', 1987);
*/

/*

// when function instance is created by JS engine
// then prototype object is also created with `constructor` reference
console.log(Person.__proto__);
console.log(Person.prototype);
*/

// `new` operator behavior
// var obj = {__proto__:Person.prototype};
// const constructorFunc = Person.bind(obj);
// return constructorFunc() ?? obj;

/*

console.log('Created object:', me);
console.log('Prototype object of all person objects:', me.__proto__);
console.log(me.__proto__ === Person.prototype);

// every object in javascript has its own prototype
// {...} === new Object(.....);
console.log('Prototype object of objects:', me.__proto__.__proto__);
console.log(
  'Is this is Object.prototype?',
  me.__proto__.__proto__ === Object.prototype,
);

// the prototype of Object's root prototype is null
//console.log(Object.prototype.__proto__); // prototype chain is ended here.

console.log(Object.prototype.hasOwnProperty('hasOwnProperty'));

*/

/*
//
console.log(me);
console.log(typeof me);

// test the object type (object's class)
console.log(me instanceof Person);
console.log('aewfa' instanceof Person);

// define methods in prototype of constructor function
// prototype property exists on every instance of a function
console.log(Person.prototype);
Person.prototype.calcAge = function () {
  return new Date().getFullYear() - this.birthYear;
};

console.log(me.calcAge());
console.log(typeof Person.prototype);
console.log(typeof Person);

// object (instance of class) has a reference to prototype object as well
console.log(me.__proto__);
console.log(me.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(me));

// prototype of Person is NOT a prototype of Person :)))
// that's because Person is a FUNCTION. So the prototype of Person is a FUNCTION's PROTOTYPE.
// Person.prototype is a prototype of INSTANCES (OBJECTS) created with Person constructor function.
console.log(Function.prototype.isPrototypeOf(Person)); // is TRUE
console.log(Person.prototype.isPrototypeOf(Person)); // is FALSE
console.log(Person.prototype.isPrototypeOf(me)); // is TRUE

// `prototype` property should've been named as `instancePrototype`

// prototype object can contain primitive properties as well
Person.prototype.species = 'Homo Sapiens';
console.log(me.species);

// can be checked if the property is declared on instance's prototype
// or on the instance itself
console.log(me.hasOwnProperty('species'));
console.log(me.__proto__.hasOwnProperty('species'));
console.log(me.hasOwnProperty('birthYear'));

// the instance of constructor function is also set a property named `constructor` on the instance prototypes
// this all does the `new` keyword
console.log(me.__proto__.hasOwnProperty('constructor'));
console.log(me.__proto__.constructor);

// Function.prototype === instance prototype of Person function
//       Person.prototype === instance prototype of Person instances.

// `new` operator takes prototype of source function INSTANCE and uses it for class instance (object, {}, result of constructor function).
// dot operator searches on the object itself, then on prototype linked to this object.

// so the `new` operator as one argument - the function INSTANCE.
// `new` operator sets `prototype` property of this function INSTANCE to the new object with property `constructor` (circular back-ref to owning function).
// `new` operator binds this function to new object {}
// `new` operator sets __proto__ property of new object to `prototype` object
// `new` operator executes this function.
// `new` operator returns the result of the function execution back

// `new` operator behavior:
// Person.prototype ??= { constructor : Person };
// const personExec = Person.bind({ __proto__ : f.prototype });
// return personExec(...constructorArgs);
console.log(Person.__proto__); // should've been named as `prototype`
console.log(Person.prototype); // should've been named as `instancePrototype`
*/
/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  return new Date().getFullYear() - this.birthYear;
};
Person.prototype.species = 'Homo Sapiens';

const oleg = new Person('Oleg', 1987);*/
/*

console.log(oleg.__proto__);
console.log(oleg.__proto__.__proto__);

console.log(Function.__proto__);

// the prototype of function is the prototype of constructor function itself.
// that's because the constructor is also the function instance.
console.log(Function.prototype === Function.__proto__);

// the prototype of the function instance is the object's prototype.
console.log(Function.__proto__.__proto__);

// the constructor of the object is a function instance
// this is back-referenced to the object constructor
console.log(
  Object.prototype.constructor.__proto__.__proto__ === Object.prototype,
);
*/
/*

// extending array functionality
// extending built-in types is not recommended because newer versions may introduce same-named methods
// this is also not suitable for large code bases
const arr = [1, 2, 3, 34, 3, 3, 3, 3];
Array.prototype.unique = function () {
  return [...new Set(this)];
};

const arrUnique = arr.unique();
console.log(arrUnique);
console.log(arrUnique === arr);

console.log(oleg);
*/
/*

// ES6 classes
// they are functions under the hood (special sub-type of functions)

// classes as NOT hoisted - cannot reference them BEFORE declaration
//console.log(PersonCl.__proto__); // will throw error

// class expression
// const PersonCl = class {};

// class declaration
// this actually defines the prototype object of constructor function instance of this class
class PersonCl {
  constructor(firstName, birthYear) {
    console.log(firstName);
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // defining methods in a class
  // automatically places them on the prototype object
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  }
}

// ES6 class is just an instance of a function
// this is the same constructor function but named more friendly
console.dir(PersonCl.__proto__ === Function.prototype); // is TRUE

const jessica = new PersonCl('Jessica', 1995);
console.log(jessica.__proto__);
console.log(jessica.calcAge());

// classes can be passed and returned from the functions.
// because they are actually the constructor functions themselves behind the scenes
console.log(PersonCl);

// all code within a class is executed in strict mode
*/

// GETTERS/SETTERS
/*

const account = {
  owner: 'Oleg Ganin',
  movements: [500, -200, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 400;
console.log(account);
*/
/*

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // INSTANCE methods and getters/setters are added to the `prototype` property of constructor function
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  get fullName() {
    return this._fullName;
  }

  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      console.log(`${name} is not a full name!`);
    }
  }

  // STATIC method added to the class itself (constructor function instance)
  static hey() {
    console.log(`Hey!`);
    console.log(this); // this is the constructor function because of static nature
    console.log(this.prototype);
  }
}

//
// const jessica = new PersonCl('Jessica Biel', 1232);
// console.log(jessica);
PersonCl.hey();
*/

/*

// Static methods of constructor function
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.hey = function () {
  console.log(`Hey!`);
  console.log(this); // this is the constructor function because of static nature
  console.log(this.prototype);
};

Person.hey();
*/

// Object.create() approach
// same concept but without prototype property or constructor functions
/*

const PersonProto = {
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const oleg = Object.create(PersonProto);
oleg.init('Oleg', 1987);

console.log(oleg);
console.log(oleg.calcAge());
console.log(oleg.__proto__ === PersonProto);
*/

// INHERITANCE
/*

// using constructor function

// base class
const Person = function (firstName, birthYear) {
  this._firstName = firstName;
  this._birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  return new Date().getFullYear() - this._birthYear;
};

// child class
const Student = function (firstName, birthYear, courseName) {
  // reuse constructor of base class
  // and reuse `this` for base class context
  Person.call(this, firstName, birthYear);

  // set this own class properties
  this._courseName = courseName;
};

// connect child class to the base class
// 1. link prototypes
Student.prototype = Object.create(Person.prototype);

// 2. set constructor function to child class constructor function
// however this is not required for `instanceof` operator
Student.prototype.constructor = Student;

// 3. add own specific methods to Student class
// do this only AFTER linking because prototype is overriden
Student.prototype.introduce = function () {
  console.log(
    `Hello! My name is ${this._firstName} and I study ${this._courseName}!`,
  );
};

// verify inheritance
const student = new Student('Oleg', 1987, 'Computer Science');
console.log(student.__proto__);
console.dir(Student);

// `instanceof` is just comparing the references of prototypes in the chain
console.log(student instanceof Student);
console.log(student.__proto__ === Student.prototype);

console.log(student instanceof Person);
console.log(student.__proto__.__proto__ === Person.prototype);

console.log(student instanceof Object);

// check of methods inheritance
student.introduce();
console.log(student.calcAge());
*/
/*

// using ES6 classes
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // INSTANCE methods and getters/setters are added to the `prototype` property of constructor function
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  get fullName() {
    return this._fullName;
  }

  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      console.log(`${name} is not a full name!`);
    }
  }

  // STATIC method added to the class itself (constructor function instance)
  static hey() {
    console.log(`Hey!`);
    console.log(this); // this is the constructor function because of static nature
    console.log(this.prototype);
  }
}

class StudentCl extends PersonCl {
  // constructor is optional - base class constructor will be called in this case
  constructor(fullName, birthYear, course) {
    // base constructor call must be first
    // it creates `this` object
    super(fullName, birthYear);

    // specific initialization
    this.course = course;
  }

  introduce() {
    console.log(
      `Hello! My name is ${this.fullName} and I study ${this.course}!`,
    );
  }

  // overriding methods
  calcAge() {
    // calling base method
    const age = super.calcAge();
    console.log(`I'm ${age} but as a student I feel more like ${age + 10}!`);
  }
}

const oleg = new StudentCl('Oleg Ganin', 1987, 'Computer Science');
console.log(oleg);
oleg.calcAge();
oleg.introduce();
*/
/*

// inheritance using Object.create()
const PersonProto = {
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(
    `Hello! My name is ${this.firstName} and I study ${this.course}!`,
  );
};

const oleg = Object.create(StudentProto);
oleg.init('Oleg', 1987, 'CS');

console.log(oleg);
console.log(oleg.calcAge());
oleg.introduce();
*/

// INCAPSULATION with private class fields
class Account {
  #owner;
  #movements = [];
  #currency;
  #pin;
  #locale = navigator.language;

  constructor(owner, currency, pin) {
    this.#owner = owner;
    this.#currency = currency;
    this.#pin = pin;
  }

  // public interface
  getMovements() {
    // return copy of array to avoid inner state changes
    return this.#movements.slice();
  }

  deposit(amount) {
    this.#movements.push(amount);
    return this;
  }

  withdraw(amount) {
    return this.deposit(-amount);
  }

  requestLoan(amount) {
    if (this.#approveLoan(amount)) {
      this.deposit(amount);
      console.log(`Your loan of ${amount} is approved!`);
      // console.log(#movements in this); // TRUE since we're inside the class
      // example of static private field
      Account.#doHello();
    }
    return this;
  }

  // private implementation details
  #approveLoan(amount) {
    return true;
  }

  static #doHello() {
    console.log('HELLO from private static');
  }
}

const oleg = new Account('Oleg Ganin', 'PLN', 1111);
oleg.deposit(400).withdraw(100).requestLoan(300);

// attempt to tamper the data of movements
const movements = oleg.getMovements();
console.log(movements);
movements[0] = 100;

console.log('Movements in account after changes:', oleg.getMovements());

// there's no access to private fields
// console.log(oleg.#movements); // ERROR
// console.log(oleg['#movements']); // ERROR
// console.log(oleg.#approveLoan()); // ERROR
// console.log(#movements in oleg); // ERROR - this field is accessible only inside

console.dir(oleg);

// Account.#doHello(); // ERROR - private identifier can be used only within the enclosing class
