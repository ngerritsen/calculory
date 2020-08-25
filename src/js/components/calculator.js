import execute from '../engine';
import * as logService from '../logService';

const input = document.querySelector('[data-calculator-input]');
const output = document.querySelector('[data-calculator-ouput]');

export default function calculator(element) {
  input.addEventListener('input', event => {
    output.textContent = execute(event.target.value);
  });

  element.addEventListener('submit', event => {
    event.preventDefault();

    logService.add(input.value);

    input.value = '';
    output.textContent = '0';
  });
}
