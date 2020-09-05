import * as calculationService from '../service/calculation';
import { getAttr, on } from '../utils/dom';

export default function action(element) {
  const actionMap = {
    add,
    remove: calculationService.remove,
    clear: calculationService.clear,
    next: calculationService.next,
    previous: calculationService.previous,
    submit: calculationService.submit,
  };

  function init() {
    on('click', onClick, element);
  }

  function onClick(event) {
    event.preventDefault();
    actionMap[getAction()]();
  }

  function add() {
    calculationService.add(getSymbol());
  }

  function getSymbol() {
    return getAttr(element, 'data-symbol');
  }

  function getAction() {
    return getAttr(element, 'data-action');
  }

  init();
}
