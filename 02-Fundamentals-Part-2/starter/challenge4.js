const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(calcTip(100));

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let billIndex = 0; billIndex < bills.length; billIndex++) {
    const bill = bills[billIndex];
    const tip = calcTip(bill);
    tips.push(tip);
    totals.push(bill + tip);
}
console.log(tips);
console.log(totals);

const calcAverage = function (arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}
console.log(calcAverage(totals));
