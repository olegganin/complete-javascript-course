'use strict';

//1. Take the IIFE below and at the end of the function, attach an event listener that
// changes the color of the selected h1 element ('header') to blue, each time
// the body element is clicked. Do not select the h1 element again!

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    // header variable is taken from VE provided by the closure of the parent IIFE function.
    header.style.color = 'blue';
  });
})();

// JS Engine looks for the most closed closure if collisions occur.
const rootFn = function () {
  const rootVar = 0;
  return function () {
    const childVar = 'child';
    return function () {
      console.log(rootVar, childVar);
    };
  };
};

const rootVar = 'global';

const child = rootFn();
const grandChild = child();
grandChild();
console.dir(grandChild);
