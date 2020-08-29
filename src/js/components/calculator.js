import * as logService from '../service/log';
import { queryAll, query } from '../utils';
import createInput from './input';

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
    getActions().forEach((action) =>
      action.addEventListener('click', handleCalculatorAction)
    );
  }

  function handleCalculatorAction(event) {
    event.preventDefault();
    calculatorActions[getAction(event.currentTarget)](event);
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
  }

  function getAction(element) {
    return element.getAttribute('data-calculator-action');
  }

  function getSymbol(element) {
    return element.getAttribute('data-calculator-symbol');
  }

  function getInput() {
    return query('[data-calculator-input]', element);
  }

  function getActions() {
    return queryAll('[data-calculator-action]', element);
  }

  init();
}
