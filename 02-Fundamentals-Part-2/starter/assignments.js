/*
'use strict';

function describeCountry(country, population, capitalCity) {
    return `${country} has ${population} million people and its capital city is ${capitalCity}`;
}

var descriptionFinland = describeCountry('Finland', '6', 'Helsinki');
var descriptionBelarus = describeCountry('Belarus', '10', 'Minsk');
var descriptionUsa = describeCountry('USA', '150', 'Washington, D.C.');

console.log(descriptionFinland);
console.log(descriptionBelarus);
console.log(descriptionUsa);

function percentageOfWorld1(population) {
    return population / 7900 * 100;
}

var finlandPercentage = percentageOfWorld1(9);
var chinaPercentage = percentageOfWorld1(1441);
var usaPercentage = percentageOfWorld1(230);
console.log(finlandPercentage, chinaPercentage, usaPercentage);


const percentageOfWorld2 = function (population) {
    return population / 7900 * 100;
}
console.log(percentageOfWorld2(9), percentageOfWorld2(1441), percentageOfWorld2(230));

const percentageOfWorld3 = population => population / 7900 * 100;
console.log(
    percentageOfWorld3(9),
    percentageOfWorld3(1441),
    percentageOfWorld3(230));

const describePopulation = function (country, population) {
    return `${country} has ${population} million people, which is about ${percentageOfWorld1(population)}% of the world.`
}

console.log(describePopulation('China', 1441))
console.log(describePopulation('Norway', 9))
console.log(describePopulation('USA', 230))

const populations = [9, 1441, 230, 4];
console.log(populations.length === 4);

const percentages = [
    percentageOfWorld1(populations[0]),
    percentageOfWorld1(populations[1]),
    percentageOfWorld1(populations[2]),
    percentageOfWorld1(populations[3])
];
console.log(percentages);

const neighbours = ['Canada', 'Mexico', 'Cuba'];
neighbours.push('Utopia');
neighbours.pop();
if (!neighbours.includes('Germany')) {
    console.log('Probably not a central European country :)');
}
neighbours[neighbours.indexOf('Mexico')] = 'Mexican Republic';
console.log(neighbours);

const myCountry = {
    name: 'USA',
    capital: 'Washington, D.C.',
    language: 'English',
    population: 250,
    neighbours: ['Canada', 'Mexico', 'Cuba'],

    describe: function () {
        console.log(`${this.name} has 
        ${this.population} million ${this.language}-speaking people, 
        ${this.neighbours.length} neighbouring countries 
        and a capital called ${this.capital}`);
    },

    checkIsIsland: function () {
        return this.isIsland = !Boolean(neighbours.length);
    }
};

console.log(`${myCountry.name} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`);

myCountry.population += 2;
myCountry['population'] -= 2;
console.log(myCountry.population);

myCountry.describe();
console.log(myCountry.checkIsIsland());

for (let voterNumber = 1; voterNumber <= 50; voterNumber++) {
    console.log(`Voter number ${voterNumber} is currently voting`);
}

const percentages2=[];
for (let i = 0; i < populations.length; i++) {
    percentages2.push(percentageOfWorld1(populations[i]));
}
console.log(percentages2);


*/
/*
const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden',
    'Russia']];

for (let countryIndex = 0; countryIndex < listOfNeighbours.length; countryIndex++) {
    for (let neighbourIndex = 0; neighbourIndex < listOfNeighbours[countryIndex].length; neighbourIndex++) {
        console.log(`Neighbour: ` + listOfNeighbours[countryIndex][neighbourIndex])
    }
}*/

/*

const populations = [9, 1441, 230, 4];

function percentageOfWorld1(population) {
    return population / 7900 * 100;
}

const percentages3 = [];
let i = 0;
while (i < populations.length) {
    percentages3.push(percentageOfWorld1(populations[i]));
    i++;
}
console.log(percentages3);
*/
