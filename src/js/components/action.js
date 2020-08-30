import * as calculationService from '../service/calculation';

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
    element.addEventListener('click', onClick);
  }

  function onClick(event) {
    event.preventDefault();
    actionMap[getAction()]();
  }

  function add() {
    calculationService.add(getSymbol());
  }

  function getSymbol() {
    return element.getAttribute('data-symbol');
  }

  function getAction() {
    return element.getAttribute('data-action');
  }

  init();
}
