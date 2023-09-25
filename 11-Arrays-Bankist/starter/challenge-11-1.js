'use strict';

//Create a function 'checkDogs', which accepts 2 arrays of dog's ages
// ('dogsJulia' and 'dogsKate'), and does the following things:

const checkDogs = function (dogsJulia, dogsKate) {
  //1. Julia found out that the owners of the first and the last two dogs actually have
  // cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
  // ages from that copied array (because it's a bad practice to mutate function
  // parameters)
  const dogsJuliaWithoutCats = dogsJulia.slice(1, -2);

  //2. Create an array with both Julia's (corrected) and Kate's data
  const allDogs = [...dogsJuliaWithoutCats, ...dogsKate];

  //3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
  // is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
  // 🐶
  // ")

  allDogs.forEach((dogAge, dogIndex) => {
    if (dogAge >= 3) {
      console.log(
        `Dog number ${dogIndex + 1} is an adult, and is ${dogAge} years old`,
      );
    } else {
      console.log(`Dog number ${dogIndex + 1} is still a puppy🐶`);
    }
  });
};

//Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log('----------------');
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
