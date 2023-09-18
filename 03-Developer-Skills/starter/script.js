// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/*

const x = 23;
if (x === 23) console.log(23);

const calcAge = birthYear => 2037 - birthYear;

*/
/*

const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    value: 10,
  };

  console.log(measurement);

  const kelvin = measurement.value + 273;
  return kelvin;
};

console.log(measureKelvin());
*/

const printForecast = function (arr) {
  let output = '...';
  for (let index = 0; index < arr.length; index++) {
    output += ` ${arr[index]}ºC in ${index + 1} days ...`;
  }
  console.log(output);
};

printForecast([17, 21, 23]);
printForecast([12, 5, -5, 0, 4]);
