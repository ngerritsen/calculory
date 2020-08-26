import execute from '../engine';
import * as logService from '../service/logService';
import * as calculationRepository from '../service/calculationRepository';
import { queryAll, query } from '../utils';

const DEFAULT_RESULT = '0';
const ERROR_CLASSNAME = 'calculator__input--error';

export default function calculator(element) {
  getInput().value = calculationRepository.get();
  calculate();

  getInput().addEventListener('input', calculate);
  element.addEventListener('submit', submit);

  query(['[data-calculator-button-delete]'], element).addEventListener(
    'click',
    deleteValue
  );
  query(['[data-calculator-button-clear]'], element).addEventListener(
    'click',
    clearInput
  );
  queryAll('[data-calculator-button-symbol]', element).forEach(
    handleSymbolButton
  );

  function calculate() {
    const input = getInput();

    try {
      getOutput().textContent = input.value
        ? execute(input.value)
        : DEFAULT_RESULT;

      if (hasError()) {
        input.classList.remove(ERROR_CLASSNAME);
      }
    } catch (e) {
      input.classList.add(ERROR_CLASSNAME);
    }

    calculationRepository.store(input.value);
  }

  function submit(event) {
    if (hasError()) {
      return;
    }

    event.preventDefault();

    const input = getInput();

    logService.add(input.value);

    clearInput();
    getOutput().textContent = DEFAULT_RESULT;
  }

  function deleteValue() {
    const input = getInput();

    input.value = input.value.slice(0, input.value.length - 1);
  }

  function handleSymbolButton(button) {
    button.addEventListener('click', () => {
      const input = getInput();

      input.value =
        input.value + button.getAttribute('data-calculator-button-symbol');
    });
  }

  function clearInput() {
    getInput().value = '';
    calculationRepository.store('');
  }

  function hasError() {
    return getInput().classList.contains(ERROR_CLASSNAME);
  }

  function getOutput() {
    return query('[data-calculator-ouput]', element);
  }

  function getInput() {
    return query('[data-calculator-input]', element);
  }
}
