import * as calculationService from '../service/calculation';
import { on } from '../utils/dom';

export default function mode(element) {
  function init() {
    on('click', toggle, element);
    update();
  }

  function update() {
    element.textContent = calculationService.get().mode;
  }

  function toggle() {
    calculationService.toggleMode();
    update();
  }

  init();
}
