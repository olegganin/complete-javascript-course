const country = 'Belarus';
const continent = 'Europe'
const isIsland = false;
let population = 9;
let language;
language = 'Russian'

console.log(country);
console.log(continent);
console.log(population);
console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

const halfOfPopulation = population / 2;
console.log(halfOfPopulation);

population++;
console.log(population);

const finlandPopulation = 6;
console.log(population > finlandPopulation);

const averagePopulation = 33;
console.log(population < averagePopulation);

const description = `${country} is in ${continent}, and its ${population} million people speak ${language}`;
console.log(description);

if (population > averagePopulation) {
    console.log(`${country}'s population is above average`);
} else {
    console.log(`${country}'s population is ${averagePopulation - population} million below average`);
}

/*
'9' - '5'; // 4
'19' - '13' + '17'; // '617'
'19' - '13' + 17; // 23
'123' < 57; // false
5 + 6 + '4' + 9 - 4 - 2; // 1143
*/

/*
const numNeighbours = Number(prompt('How many neighbour countries does your country have?'));

if (numNeighbours === 1) {
    console.log('Only 1 border!');
} else if (numNeighbours > 1) {
    console.log('More than 1 border!');
} else{
    console.log('No borders');
}
*/

if (language === 'English' && population < 50 && !isIsland) {
    console.log(`You should live in ${country} :)`);
} else {
    console.log(`${country} does not meet your criteria :(`);
}

switch (language) {
    case 'chinese':
    case 'mandarin':
        console.log('MOST number of native speakers!')
        break;
    case 'spanish':
        console.log('2nd place in number of native speakers');
        break;
    case 'english':
        console.log('3nd place');
        break;
    case 'hindi':
        console.log('Number 4');
        break;
    case 'arabic':
        console.log('5th most spoken language');
        break;
    default:
        console.log('Great language too :D');
}

console.log(`${country}'s population is ${population > averagePopulation ? 'above' : 'below'} average`);
