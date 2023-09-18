/*
* Coding Challenge #2
Use the BMI example from Challenge #1, and the code you already wrote, and
improve it.
Your tasks:
1. Print a nice output to the console, saying who has the higher BMI. The message
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
BMI (28.3) is higher than John's (23.9)!"
Hint: Use an if/else statement �
* */


const massMark = 78;
const heightMark = 1.69;

const massJohn = 92;
const heightJohn = 1.95;
//
// const massMark = 95;
// const heightMark = 1.88;
//
// const massJohn = 85;
// const heightJohn = 1.76;

const bmiMark = massMark / heightMark ** 2;
const bmiJohn = massJohn / heightJohn ** 2;
console.log(bmiMark, bmiJohn)

if (bmiMark > bmiJohn) {
    console.log(`Mark's BMI (${bmiMark}) is higher than John's (${bmiJohn})!`)
} else if (bmiMark < bmiJohn) {
    console.log(`John's BMI (${bmiJohn}) is higher than Mark's (${bmiMark})!`)
} else {
    console.log(`Mark and John have equal BMI (${bmiMark}!`)
}
