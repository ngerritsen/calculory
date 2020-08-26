import execute from '../engine';
import * as logService from '../service/logService';
import * as calculationRepository from '../service/calculationRepository';
import { queryAll, query } from '../utils';

const DEFAULT_RESULT = '0';
const ERROR_CLASSNAME = 'calculator__input--error';

export default function calculator(element) {
  setInput(calculationRepository.get());

  getInput().addEventListener('input', onInput);
  element.addEventListener('submit', submit);

  getInput().focus();

  query(['[data-calculator-delete]'], element).addEventListener(
    'click',
    deleteValue
  );

  query(['[data-calculator-clear]'], element).addEventListener(
    'click',
    clearInput
  );

  queryAll('[data-calculator-symbol]', element).forEach(onPressSymbolButton);

  function onInput(event) {
    event.preventDefault();
    setInput(event.target.value);
  }

  function onPressSymbolButton(button) {
    button.addEventListener('click', () => {
      setInput(
        getInput().value + button.getAttribute('data-calculator-symbol')
      );
    });
  }

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
      console.log(e);
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

    setInput(input.value.slice(0, input.value.length - 1));
  }

  function clearInput() {
    setInput('');
  }

  function setInput(value) {
    getInput().value = value;
    calculate();
    calculationRepository.store(value);
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
