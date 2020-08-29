import execute from '../engine';
import * as logService from '../service/logService';
import { queryAll, query, formatOutput } from '../utils';
import createInput from './input';

const DEFAULT_RESULT = '0';

export default function calculator(element) {
  const input = createInput(getInput());

  const calculatorActions = {
    addSymbol,
    remove: input.remove,
    clear: input.clear,
    previous: input.previous,
    next: input.next,
  };

  function init() {
    element.addEventListener('submit', submit);

    calculate();

    getActions().forEach((action) =>
      action.addEventListener('click', handleCalculatorAction)
    );
  }

  function handleCalculatorAction(event) {
    event.preventDefault();

    calculatorActions[getAction(event.currentTarget)](event);
    calculate();
  }

  function addSymbol(event) {
    input.add(getSymbol(event.currentTarget));
  }

  function submit(event) {
    event.preventDefault();

    if (input.hasError()) {
      return;
    }

    const input = getInput();

    logService.add(input.value);

    input.clear();
    calculate();
    getOutput().textContent = DEFAULT_RESULT;
  }

  function calculate() {
    const code = input.get();

    try {
      getOutput().textContent = code
        ? formatOutput(execute(code))
        : DEFAULT_RESULT;

      input.unsetError();
    } catch (e) {
      input.setError();
    }
  }

  function getAction(element) {
    return element.getAttribute('data-calculator-action');
  }

  function getSymbol(element) {
    return element.getAttribute('data-calculator-symbol');
  }

  function getOutput() {
    return query('[data-calculator-ouput]', element);
  }

  function getInput() {
    return query('[data-calculator-input]', element);
  }

  function getActions() {
    return queryAll('[data-calculator-action]', element);
  }

  init();
}
