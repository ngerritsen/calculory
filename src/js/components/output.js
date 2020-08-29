import * as calculationService from '../service/calculation';
import * as pubSub from '../core/pubSub';
import { formatNumber } from '../utils/format';
import { addClass, removeClass } from '../utils/dom';
import execute from '../engine';

const ERROR_CLASSNAME = 'calculator__output--error';
const ERROR_TEXT = 'ERROR';

export default function output(element) {
  function init() {
    calculate();
    pubSub.subscribe('calculation.updated', calculate);
  }

  function calculate() {
    const { code } = calculationService.get();
    const { result, error } = execute(code);

    if (error) {
      setError(error);
      return;
    }

    setResult(result);
  }

  function setError(error) {
    element.textContent = ERROR_TEXT;
    element.title = error;
    addClass(element, ERROR_CLASSNAME);
  }

  function setResult(result) {
    element.textContent = formatNumber(result);
    element.title = null;
    removeClass(element, ERROR_CLASSNAME);
  }

  init();
}
