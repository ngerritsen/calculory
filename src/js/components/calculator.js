import execute from '../engine';
import * as logService from '../service/logService';
import * as calculationRepository from '../service/calculationRepository';
import { queryAll, query } from '../utils';

const DEFAULT_RESULT = '0';
const ERROR_CLASSNAME = 'calculator__input--error';

export default function calculator(element) {
  setInput(calculationRepository.get());
  setInputPosition();

  getInput().addEventListener('input', onInput);
  element.addEventListener('submit', submit);

  query(['[data-calculator-delete]'], element).addEventListener(
    'click',
    deleteValue
  );

  query(['[data-calculator-clear]'], element).addEventListener('click', clear);

  queryAll('[data-calculator-symbol]', element).forEach((button) => {
    button.addEventListener('click', () => {
      addSymbol(button.getAttribute('data-calculator-symbol'));
    });
  });

  query(['[data-calculator-next]'], element).addEventListener('click', next);

  query(['[data-calculator-previous]'], element).addEventListener(
    'click',
    previous
  );

  function onInput(event) {
    event.preventDefault();
    setInput(event.target.value);
  }

  function addSymbol(symbol) {
    const input = getInput();
    const { value, selectionStart, selectionEnd } = input;
    const newValue =
      value.slice(0, selectionStart) + symbol + value.slice(selectionEnd);
    const isFunction = symbol.includes('()');
    const newPosition = selectionStart + symbol.length - (isFunction ? 1 : 0);

    setInput(newValue, newPosition);
    setInputPosition(newPosition);
  }

  function submit(event) {
    if (hasError()) {
      return;
    }

    event.preventDefault();

    const input = getInput();

    logService.add(input.value);

    clear();
    getOutput().textContent = DEFAULT_RESULT;
  }

  function deleteValue() {
    const input = getInput();
    const { value, selectionStart, selectionEnd } = input;

    const start =
      selectionEnd === selectionStart ? selectionStart - 1 : selectionStart;

    setInput(value.slice(0, start) + value.slice(selectionEnd));
    setInputPosition(start);
  }

  function next() {
    setInputPosition(getInput().selectionStart + 1);
  }

  function previous() {
    setInputPosition(getInput().selectionStart - 1);
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
      input.classList.add(ERROR_CLASSNAME);
    }

    calculationRepository.store(input.value);
  }

  function clear() {
    setInput('');
  }

  function setInput(value) {
    getInput().value = value;
    calculate();
    calculationRepository.store(value);
  }

  function setInputPosition(position) {
    const input = getInput();

    input.focus();

    if (position !== undefined) {
      input.setSelectionRange(position, position);
    }
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
