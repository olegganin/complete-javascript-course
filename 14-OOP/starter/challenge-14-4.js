'use strict';

//1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
// child class of the 'CarCl' class
class CarCl {
  #make;
  #speed;

  constructor(make, speed) {
    this.#make = make;
    this.#speed = speed;
  }

  accelerate() {
    this.#speed += 10;
    console.log(`${this.#make} is accelerated to ${this.#speed}`);
    return this;
  }

  brake() {
    this.#speed -= 5;
    console.log(`${this.#make} is slowed down to ${this.#speed}`);
    return this;
  }

  get make() {
    return this.#make;
  }

  get speed() {
    return this.#speed;
  }
}

class EVCl extends CarCl {
  //2. Make the 'charge' property private
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    // call base implementation of this method
    super.accelerate();

    // add custom logic for derived class
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`,
    );
    return this;
  }
}

//3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
// methods of this class, and also update the 'brake' method in the 'CarCl'
// class. Then experiment with chaining!
const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate().accelerate().brake().chargeBattery(100).accelerate();
console.log(rivian);
