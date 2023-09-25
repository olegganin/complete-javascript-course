'use strict';

//Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
// ages ('ages'), and does the following things in order:

// THIS IMPLEMENTATION also covers challenge #3

const calcAverageHumanAge = ages =>
  ages
    // 1. Calculate the dog age in human years using the following formula: if the dog is
    // <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
    // humanAge = 16 + dogAge * 4
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))

    // 2. Exclude all dogs that are less than 18 human years old (which is the same as
    // keeping dogs that are at least 18 years old)
    .filter(humanAge => humanAge >= 18)

    // 3. Calculate the average human age of all adult dogs (you should already know
    // from other challenges how we calculate averages 😉)
    .reduce(
      (sumOfHumanAges, humanAge, index, adultHumanAges) =>
        sumOfHumanAges + humanAge / adultHumanAges.length,
      0,
    );

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
