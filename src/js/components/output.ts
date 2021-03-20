import * as calculationService from "../service/calculation";
import * as pubSub from "../core/pubSub";
import { formatNumber } from "../utils/format";
import { addClass, removeClass } from "../utils/dom";
import { execute } from "../engine";

const ERROR_CLASSNAME = "calculator__output--error";

export default function output(element: Element): void {
  function init() {
    calculate();
    pubSub.subscribe("calculation.updated", calculate);
  }

  function calculate() {
    const calculation = calculationService.get();
    const { result, error } = execute(calculation);

    if (error) {
      setError(error);
      return;
    }

    setResult(result);
  }

  function setError(error) {
    element.setAttribute("title", error);
    addClass(element, ERROR_CLASSNAME);
  }

  function setResult(result) {
    element.textContent = formatNumber(result);
    element.setAttribute("title", "");
    removeClass(element, ERROR_CLASSNAME);
  }

  init();
}
