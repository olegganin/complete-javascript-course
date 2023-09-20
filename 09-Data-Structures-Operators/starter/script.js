'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  // Calculated property names
  [weekdays[3]]: {
    open: 12,
    close: 22
  },
  [weekdays[4]]: {
    open: 11,
    close: 23
  },
  [`day-${2 + 6}`]: {
    open: 0, // Open 24 hours
    close: 24
  }
};


// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literal
  // auto creates property which matches variable name
  // and assigns the value of variable
  openingHours,

  // ES6 enhanced object function declaration
  //     no function word, semicolon.
  order(starterMenuItemIndex, mainMenuItemIndex) {
    return [
      this.starterMenu[starterMenuItemIndex],
      this.mainMenu[mainMenuItemIndex]
    ];
  },

  orderDelivery({
                  starterMenuItemIndex, mainMenuItemIndex,
                  address = 'Unknown address',
                  time
                }) {
    console.log(`Order received! ${this.order(starterMenuItemIndex, mainMenuItemIndex)} to be delivered to ${address} @ ${time}`);
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here it is you pasta with ${ing1}, ${ing2} and ${ing3}!`);
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(`You just ordered pizza with ${mainIngredient},${otherIngredients}`);
  }
};

// FINAL STRINGS PRACTICE

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCityCode = function(inputString) {
  return inputString.slice(0, 3).toUpperCase();
};

const flightRecords = flights.split('+');
for (const flightRecord of flightRecords) {
  let [direction, departure, arrival, flightDuration] = flightRecord.split(';');

  direction = direction.replaceAll('_', ' ').trim();

  const isDelayed = direction.indexOf('Delayed') >= 0;
  if (isDelayed) {
    direction = '🔴 ' + direction;
  }

  const departureCity = getCityCode(departure);
  const arrivalCity = getCityCode(arrival);
  flightDuration = flightDuration.replace(':', 'h');

  const outputString = `${direction} from ${departureCity} to ${arrivalCity} (${flightDuration})`;
  console.log(outputString.padStart(50, ' '));
}

/*

// STRINGS - PART 3

console.log('a+very+nice+string'.split('+'));
console.log(''.split('+'));
const [firstName, lastName] = 'oleg ganin'.split(' ');
console.log(firstName, lastName);

console.log(['Mr.', firstName, lastName.toUpperCase()].join(' '));

const capitalizeName = function(name) {
  const nameComponents = name.toLowerCase().split(' ');
  for (let nameIndex = 0; nameIndex < nameComponents.length; nameIndex++) {
    let nameComponent = nameComponents[nameIndex];
    if (nameComponent) {
      nameComponents[nameIndex] = nameComponent.replace(nameComponent[0], nameComponent[0].toUpperCase());
    }
  }
  const normalizedName = nameComponents.join(' ');
  console.log(normalizedName);
};
capitalizeName('oleg mikhaiLOvich ganin');

//       string padding
console.log('padded at the beginning'.padStart(40,'-'));
console.log('padded at the end'.padEnd(40,'-'));

const maskCreditCard = function(cardNumber){
  let cardNumberString = String(cardNumber);
  console.log(cardNumberString.slice(-4).padStart(cardNumberString.length,'*'));
}

maskCreditCard('1234567812349876');
maskCreditCard(1234567812349876);

//        string repeating
const planesInLine = function(planesCount){
  console.log(`There are ${planesCount} plans in line: ${'✈'.repeat(planesCount)}`);
}

planesInLine(5);
planesInLine(20);
*/

/*

// STRINGS - PART 1
const airline = 'Ryanair';
const plan = 'A320';
console.log(plan[0]);
console.log(typeof plan[0]);

//      search for character
console.log(airline.indexOf('a'));
console.log(airline.lastIndexOf('a'));
console.log(airline.indexOf('air'));
console.log(airline.indexOf('Air'));

//      substring
console.log(airline.slice(4));
console.log(airline.slice(4, 5)); // end index is NOT inclusive
console.log(airline.slice(-3)); // negative index extracts last characters
console.log(airline.slice(0, -3)); // negative end index counts from the end

const checkMiddleSeat = function(seat) {
  console.log(`The seat ${seat} is`,
    new Set(['B', 'E'])
      .has(
        seat.slice(-1))
      ? 'in the middle'
      : 'is not a middle seat');
};

checkMiddleSeat('11E');
checkMiddleSeat('3A');
checkMiddleSeat('3B');

//      when boxed string method is called the retured value is the primitive (not the boxed object)
console.log(typeof (new String('Oleg')));
console.log(typeof (new String('Oleg').slice(-2)));

//      upper/lower conversion
console.log(airline.toUpperCase());
console.log(airline.toLowerCase());

const name = 'oLeG';
const nameLower = name.toLowerCase();
const nameCorrect = nameLower[0].toUpperCase() + nameLower.slice(1);
console.log(nameCorrect);

//     trimming
console.log('example@gmail.com' === '  examPLE@Gmail.Com  \n '.toLowerCase().trim());

//      replacing
console.log('234,33PLN'.replace(',', '.').replace('PLN', '$'));
console.log('boarding door! boarding door 23!'.replaceAll('door', 'gate'));
console.log('boarding Door! boarding door 23!'.replace(/door/ig, 'gate'));

//       testing string for substring. all case-sensitive
const plane2 = 'A320neo';
console.log(plane2.includes('20n'));
console.log(plane2.includes('20N'));
console.log(plane2.startsWith('a32'));
console.log(plane2.startsWith('A32'));
console.log(plane2.startsWith('eo'));
console.log(plane2.endsWith('eo'));
console.log(plane2.endsWith('Eo'));
console.log(plane2.endsWith('oe'));

const checkBaggage = function(baggageDescription) {
  baggageDescription = baggageDescription.toLowerCase();

  const forbiddenItems = new Set(['knife', 'gun', 'food']);
  let isForbidden = false;
  for (const forbiddenItem of forbiddenItems) {
    if (baggageDescription.includes(forbiddenItem)) {
      isForbidden = true;
      break;
    }
  }
  isForbidden
    ? console.log('Forbidden to check in!')
    : console.log('Allowed check in!');
};

checkBaggage('I have laptop and pocket Knife');
checkBaggage('I have laptop and some snacks!');

*/

/*

// MAPS - ITERATIONS

//       constructor with iterative literal array
const question = new Map([
  ['question', 'best lang?'],
  [1, 'C'],
  [2, 'C#'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'You are right!'],
  [false, 'Wrong!']
]);
console.log(question);

//       create from object (object -> map conversion)
const hoursMap = new Map(Object.entries(openingHours));
console.log('Hours map', hoursMap);

//      iterate over map contents
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Option ${key}. ${value}`);
  }
}
//const answer = Number(prompt('Your answer?'));
//console.log(question.get(answer === question.get('correct')));

//      convert map to array
console.log('Map to array: ', [...question]);
console.log('Map to array (keys only): ', [...question.keys()]);
console.log('Map to array (values only): ', [...question.values()]);
*/

/*

// MAPS

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Gdansk, Poland');
console.log('Initial map: ', rest.set(2, 'Prague, Czech Republic'));

//      set can be chained
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We\'re open')
  .set('true', 'you passed true as string')
  .set(false, 'We\'re closed');

console.log('Updated with chained calls: ', rest);

//     getting values - type matters (no implicit conversion)
console.log(rest.get(true));
console.log(rest.get('true'));

const currentHour = 10;
console.log('Current restaurant status: ', rest.get(currentHour >= rest.get('open')
  && currentHour < rest.get('close')));

//     checking the presence of values
console.log('Is true key exists', rest.has(true));
rest.set(undefined, null);
console.log('Is undefined key exists', rest.has(undefined));
console.log('Is null key exists', rest.has(null));

//      deleting a pair from map
console.log(rest.delete(2));
console.log(rest.delete(3));
console.log('Updated map after deletion', rest);

//       amount of entries
console.log(`Map now contains ${rest.size} entries`);

//       empty the map
rest.clear();
console.log(rest);

//       using arrays as the keys
const arrayKey = [1, 2];
rest.set(arrayKey, 'Value of entry with array key [1,2]');
console.log('Array key value check: ', rest.get(arrayKey));
console.log('Array key value check using literal key: ', rest.get([1, 2]));

//      using objects as the keys

const objectKey = { name: 'Oleg' };
rest.set(objectKey, 'Value of entry with object key');
console.log('Object key value check: ', rest.get(objectKey));
console.log('Object key value check using literal key: ', rest.get({ name: 'Oleg' }));
*/

/*

// SETS

const ordersSet = new Set(['Pasta', undefined, 'Pizza', null, 0, 'Pizza', 'Risotto', 'Risotto']);
console.log(ordersSet);
console.log(ordersSet.size);
console.log('Check is there\'s undefined in the set: ', ordersSet.has(undefined));
console.log('Check is there\'s undefined in empty set: ', new Set().has(undefined));

//     adding duplicates to existing set
ordersSet.add('Focaccia');
ordersSet.add('Focaccia');
ordersSet.delete('Pizza');
ordersSet.delete('Pizza');
ordersSet.delete(undefined);
ordersSet.delete(undefined);
console.log('Updated set is : ', ordersSet);

//       looping over
console.log('Printing all elements of a set:');
for (const order of ordersSet) {
  console.log(order);
}

//        make elements in the array distinct
let staff = ['Manager','Waiter', 'Waiter','Chef', 'Manager', 'Waiter'];
staff = [...new Set(staff)];
console.log('Unique staff positions: ',staff);

console.log('Number of unique letters in Oleg Ganin: ', new Set('Oleg Ganin').size);

*/


/*

// LOOPING OVER OBJECTS - FOR..IN loop

//     getting property names
console.log('Opening hours days: ');
for (const day of Object.keys(openingHours)) {
  console.log(day);
}

//      getting property values
console.log('Opening hours schedules: ');
for (const schedule of Object.values(openingHours)) {
  console.log(schedule);
}

//      getting property names AND values
console.log('Opening hours days and schedules: ');
for (const [day, {open, close}] of Object.entries(openingHours)) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}


*/


/*

// OPTIONAL CHAINING OPERATOR ?.
//console.log(openingHours.mon.open);
console.log(openingHours.mon?.open);

// the operator will return undefined even if the parent property is null.
openingHours.mon = null;
console.log(openingHours.mon);
console.log(openingHours.mon?.open);

//      chaining also works for method calling
console.log('result of calling non existing method with method chaining is ', restaurant.orderNewMethod?.(1, 2));
console.log(restaurant.orderNewMethod?.(1, 2) ?? 'No method');

//      chaining can be used on array indexer as well
const users = [null, undefined, {}, { name: 'Oleg', email: 'exmample@example.com' }];
console.log('Name of the first user is ', users[0]?.name);
console.log('Name of the 2nd user is ', users[1]?.name);
console.log('Name of the 3rd user is ', users[2]?.name);
console.log('Name of the 4th user is ', users[3]?.name);
*/

/*

console.log(restaurant.order(1, 2));

// FOR..OF loop
//      loops over iterables
const allMenuItems = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const menuItem of allMenuItems) {
  console.log(menuItem);
}

//      use entries() iterator of the array to use both for-of and get the index of the item
console.log('Menu:');
for (const [index, name] of allMenuItems.entries()) {
  console.log(`${index + 1}. ${name}`);
}
*/

/*

// Logical assignment operators &&= ||= ??=

//        ||= assigns the first TRUTHY value or the LAST one.
const rest1 = {
  name: 'Piazza',
  numGuests: 10
};

const rest2 = {
  name: 'Commodore',
  owner: 'Captain John'
};

rest1.numGuests ||= 20;
rest2.numGuests ||= 20;
console.log('Guests number in rest 1 & 2:', rest1.numGuests, rest2.numGuests);

//      ??= assigns the first not NULLISH value or the LAST ONE
rest1.numGuests = 0;
rest1.numGuests ??= 20;
console.log('Guests number when nullish fallback:', rest1.numGuests);

rest1.numGuests = null;
rest1.numGuests ??= undefined ?? 20;
console.log('Guests number when nullish fallback:', rest1.numGuests);

rest1.numGuests = null;
rest1.numGuests ??= undefined ?? null;
console.log('Guests number when nullish fallback:', rest1.numGuests);

//      &&= assigns the first FALSY value or the LAST ONE
rest1.numGuests = 0;
rest1.numGuests &&= 20;
console.log('Guests number with FALSY fallback:', rest1.numGuests);

rest1.numGuests = ' ';
rest1.numGuests &&= 1 && 20;
console.log('Guests number with FALSY fallback (base is \' \'):', rest1.numGuests);
*/

/*

// && || Short-circuiting

//       can use non-bool expressions.
//       || returns first which is truthy. Otherwise it returns LAST value.
console.log(3 || 'Oleg');
console.log(0 || 'Oleg' || null);
console.log(0 || '' || null || undefined);

//       can be used to apply default values for properties
console.log('Number of guests which fell back to default', restaurant.numGuests || 10);

//      however zero is a falsy value so if we don't want to apply defaults in this case then we should use another approach
restaurant.numGuests = 0;
console.log('Number of guests with fallback when original is zero: ', restaurant.numGuests || 10);

console.log('-----------AND-----------');

//      && returns first value which is FALSY. Otherwise it returns LAST TRUTHY value.
console.log(0 && 'Oleg');
console.log(1 && 'Oleg');
console.log(1 && 'Oleg' && undefined && 'Ganin');

//      using && to check if function exist before calling it
restaurant.orderPizza && restaurant.orderPizza('garlic', 'ham');

// ?? operator - Nullish coalescing operator
//         Nullish are null and undefined.
//         Falsy values are null, undefined, 0 and ''
restaurant.numGuests = 0;
console.log('Zero guests with ?? operator fallback: ', restaurant.numGuests ?? 10);

restaurant.numGuests = null;
console.log('Null guests with ?? operator fallback: ', restaurant.numGuests ?? 10);

restaurant.numGuests = undefined;
console.log('Undefined guests with ?? operator fallback: ', restaurant.numGuests ?? 10);

*/

/*

// Rest pattern - opposite of spread.
// Packs iterable collection into one array.
// Used on the left side of assignment operator.
const sourceArr = [1, 2, 3, 4, 5];
const [a, b, ...others] = sourceArr;
console.log('Destructured a, b, others:', a, b, others);

//         Remaining items, combined with holes and destructuring
const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log('Destructured food: ', pizza, risotto, otherFood);

//        Rest pattern with Objects
const { sat: saturdayHours, ...weekdaysHours } = restaurant.openingHours;
console.log('Hours for Sat and other days', saturdayHours, weekdaysHours);

//        Rest pattern with function arguments (Rest parameters)
const add = function(...numbers) {
  let sum = 0;
  for (const number of numbers) {
    sum += number;
  }
  return sum;
};
console.log(add(1));
console.log(add(1, 2));
console.log(add(1, 2, 3));
console.log(add(1, 2, 3, 6, 7));

//       If need to pass array - spread to to indiv parameters. Then function will compress them back into array.
console.log(add(...[1, 2, 3, 6, 7]));

//     rest parameter with explicit parameters
restaurant.orderPizza('Ham','Tomato','Mushrooms')
restaurant.orderPizza('Just Bacon!')

*/

/*

// Spread operator
const sourceArr = [3, 4, 5];
const targetArr = [1, 2, ...sourceArr, 10, 22];
console.log('Combined array is ', targetArr);

//      logging array elements individually
console.log(...targetArr);

//      spread on nested properties
const updatedMainMenu = [...restaurant.mainMenu, 'Dumplings'];
console.log('Main menu copy with added item', updatedMainMenu);

//      make a shallow copy of array
const mainMenuCopy = [...restaurant.mainMenu];
mainMenuCopy[0] = 'updated first';
console.log('Updated copy and original menu', mainMenuCopy, restaurant.mainMenu);

//      concatenating arrays
const allMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log('All menu items', allMenu);

//      using spread on iterables (strings, arrays, sets, maps).
//      objects are NOT iterables
console.log('Word Diana by letters', ...'Diana');

//      can be used only when list of arguments is supported
/// console.log(`Diana by letters: ${...allMenu}`);

//     spread can be used to call functions when there's array of source params
const ingredients = ['Seafood', 'Ketchup', 'Avocado'];
restaurant.orderPasta(...ingredients);

//     spread on Objects. Shallow copy of source object properties.
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Oleg Ganin' };
newRestaurant.mainMenu[0] = 'Updated main menu';
console.log('New and old restaurant objects: ',newRestaurant, restaurant);
*/


/*
// Object Destructuring
const { name, openingHours, categories } = restaurant;
console.log('Destructured restaurant: ', name, openingHours, categories);

//      renaming original properties
const { name: restaurantName, openingHours: workingHours, categories: foodCategories } = restaurant;
console.log('Different variable names: ', restaurantName, workingHours, foodCategories);

//     using default values with different variable names
const { menu: restaurantMenu = ['Default menu'], otherMenuWithoutDefaults, openingHours: hours = ['Default hours'] }
  = restaurant;
console.log('Default values behavior: ', restaurantMenu, otherMenuWithoutDefaults, hours);

//    mutating variables using object destructuring
let a = 1;
let b = 2;
const obj = { a: 5, b: 8 };
({ a, b } = obj);
console.log('Mutated values of a and b:', a, b);

//    nested object destructure
const { openingHours: { fri: { open: fridayOpeningHour, close: fridayClosingHour } } } = restaurant;
console.log('Open/Close hours for friday are:', fridayOpeningHour, fridayClosingHour);

//    destructuring function arguments
 restaurant.orderDelivery({
  time: '22:30',
  address: 'NY city center 23',
  mainMenuItemIndex: 1,
  starterMenuItemIndex: 3
});

//    destructuring function arguments with default values
restaurant.orderDelivery({
  mainMenuItemIndex: 1,
  starterMenuItemIndex: 3
});*/

/*

// Array Destructuring
const arr = [1, 2, 3];
const [a, b, c] = arr;
console.log('Destructured array:', a, b, c);

//     skip element
let [first, , third] = restaurant.categories;
console.log('1st and 3rd values:', first, third);

//     swapping the values
[first, third] = [third, first];
console.log('1st and 3rd swapped:', first, third);

//     destructuring function results
const [starterDish, mainDish] = restaurant.order(2, 1);
console.log('Order result: ', starterDish, mainDish);

//     destructuring nested arrays
const nestedArr = [3, 4, [5, 6, 7]];
const [firstRoot, , [firstChild, , thirdChild]] = nestedArr;
console.log('Destructured nested array:', firstRoot, firstChild, thirdChild);

//     non-existing array elements
[, , third] = [4];
console.log('3rd value when array is just one element:', third);

//     default values when array element does not exist
[first = 11, , third = 111] = [4];
console.log('1sr & 3rd value when no element at pos 3 but has default value:', first, third);

//     nested arrays with default values
const [, secondRoot = 2, [, secondChild = [2, 2], , fourthChild = [4, 4]]] = nestedArr;
console.log('Nested array defaults = ', secondRoot, secondChild, fourthChild);
*/
