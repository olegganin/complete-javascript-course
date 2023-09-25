'use strict';

// Julia and Kate are still studying dogs, and this time they are studying if dogs are
// eating too much or too little.
// Eating too much means the dog's current food portion is larger than the
// recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10%
// above and 10% below the recommended portion (see hint).

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)

dogs.forEach(dog => {
  dog.recommendedFood = dog.weight ** 0.75 * 28;
});
console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose) 🤓
const calcFoodBalance = function (dog) {
  const balanceRatio =
    (dog.curFood - dog.recommendedFood) / (dog.recommendedFood * 0.1);
  if (balanceRatio >= 1) {
    return 'eating too much';
  } else if (balanceRatio <= -1) {
    return 'eating too little';
  } else {
    return 'eating ok';
  }
};

console.log(
  'Sarah dog status',
  calcFoodBalance(dogs.find(dog => dog.owners.includes('Sarah'))),
);

//3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').
const [ownersEatTooMuch, ownersEatTooLittle] = dogs
  .reduce(
    (summary, dog) => {
      const balance = calcFoodBalance(dog);
      if (balance === 'eating too much') {
        dog.owners.forEach(owner => summary[0].add(owner));
      } else if (balance === 'eating too little') {
        dog.owners.forEach(owner => summary[1].add(owner));
      }
      return summary;
    },
    [new Set(), new Set()],
  )
  .map(summaryItem => Array.from(summaryItem));
console.log(ownersEatTooMuch, ownersEatTooLittle);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

//5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)
console.log(
  'Are there any dog eating exactly recommended: ',
  dogs.some(dog => dog.curFood === dog.recommendedFood),
);

// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)
console.log(
  'Are there any dog eating recommended range: ',
  dogs.some(dog => calcFoodBalance(dog) === 'eating ok'),
);

// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)
const okDogs = dogs.filter(dog => calcFoodBalance(dog) === 'eating ok');
console.log(okDogs);

// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects 😉)
const sortedDogs = [...dogs].sort(
  (a, b) => a.recommendedFood - b.recommendedFood,
);
console.log(sortedDogs);
