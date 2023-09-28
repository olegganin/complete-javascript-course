'use strict';

//1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
class CarCl {
  constructor(make, speed) {
    this._make = make;
    this._speed = speed;
  }

  accelerate() {
    this._speed += 10;
    console.log(`${this._make} is accelerated to ${this._speed}`);
  }

  brake() {
    this._speed -= 5;
    console.log(`${this._make} is slowed down to ${this._speed}`);
  }

  get speed() {
    return this._speed;
  }

  //2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
  // by 1.6)
  get speedUS() {
    return this._speed / 1.6;
  }

  set speedUS(value) {
    this._speed = value * 1.6;
  }
}

const bmw = new CarCl('BMW', 120);
const mercedes = new CarCl('Mercedes', 95);

bmw.accelerate();
mercedes.accelerate();
bmw.brake();
mercedes.brake();

// getter test
console.log(bmw.speedUS);

// setter test
bmw.speedUS = 100;
console.log(bmw.speed);
