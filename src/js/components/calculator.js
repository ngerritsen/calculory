import * as historyService from '../service/history';
import * as calculationService from '../service/calculation';
import { queryAll, getAttr, on } from '../utils/dom';
import { execute } from '../engine';

export default function calculator(element) {
  const calculatorActions = {
    addSymbol,
    remove: calculationService.remove,
    clear: calculationService.clear,
    previous: calculationService.previous,
    next: calculationService.next,
  };

  function init() {
    on('submit', submit, element);

    getActions().forEach((action) =>
      on('click', handleCalculatorAction, action)
    );
  }

  function handleCalculatorAction(event) {
    event.preventDefault();
    calculatorActions[getAction(event.currentTarget)](event);
  }

  function addSymbol(event) {
    calculationService.add(getSymbol(event.currentTarget));
  }

  function submit(event) {
    event.preventDefault();

    const { code } = calculationService.get();
    const { error } = execute(code);

    if (error) {
      return;
    }

    historyService.add(code);
    calculationService.clear();
  }

  function getAction(element) {
    return getAttr(element, 'data-calculator-action');
  }

  function getSymbol(element) {
    return getAttr(element, 'data-calculator-symbol');
  }

  function getActions() {
    return queryAll('[data-calculator-action]', element);
  }

  init();
}
