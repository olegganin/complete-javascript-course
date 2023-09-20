'use strict';

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button')
  .addEventListener('click', function(e, element) {
    const input = document.querySelector('textarea').value;
    const sourceVariables = input.split('\n');
    for (const [index, sourceVariable] of sourceVariables.entries()) {
      const variableComponents = sourceVariable.trim().toLowerCase().split('_');

      const normalizedVariable =
        variableComponents[0]
        + variableComponents[1][0].toUpperCase()
        + variableComponents[1].slice(1);

      console.log(`${normalizedVariable.padEnd(25, ' ')} ${'✅'.repeat(index + 1)}`);
    }
  });
