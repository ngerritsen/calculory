import * as calculationService from '../service/calculation';
import * as pubSub from '../pubSub';
import execute from '../engine';

const ERROR_CLASSNAME = 'calculator__output--error';
const ERROR_TEXT = 'ERROR';

export default function output(element) {
  function init() {
    calculate();
    pubSub.subscribe('calculationUpdated', calculate);
  }

  function calculate() {
    const code = calculationService.get();
    const { result, error } = execute(code);

    if (error) {
      element.textContent = ERROR_TEXT;
      element.title = error;
      setError();

      return;
    }

    element.textContent = result;
    element.title = null;
    unsetError();
  }

  function setError() {
    element.classList.add(ERROR_CLASSNAME);
  }

  function unsetError() {
    element.classList.remove(ERROR_CLASSNAME);
  }

  init();
}
