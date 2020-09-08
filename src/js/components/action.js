import * as calculationService from '../service/calculation';
import { getAttr, on } from '../utils/dom';

const REPEAT_INTERVAL = 60;
const REPEAT_DELAY = 320;
const HOLD_DELAY = 460;
const REPEATABLE_ACTIONS = ['add', 'next', 'previous'];

export default function action(element) {
  let interval, timeout;

  const actionMap = {
    add,
    remove: calculationService.remove,
    next: calculationService.next,
    previous: calculationService.previous,
    submit: calculationService.submit,
    more: calculationService.toggleAdvancedMode,
  };

  const holdActionMap = {
    remove: calculationService.clear,
  };

  function init() {
    on('touchstart', onStart, element);
    on('touchend', onEnd, element);
    on('mousedown', onStart, element);
    on('mouseup', onEnd, element);
  }

  function onStart(event) {
    event.preventDefault();

    if (REPEATABLE_ACTIONS.includes(getAction())) {
      repeatAction();
    }

    if (holdActionMap[getAction()]) {
      holdAction();
    }
  }

  function onEnd(event) {
    event.preventDefault();

    clearInterval(interval);
    clearTimeout(timeout);

    if (!interval) {
      execute();
    }

    interval = null;
  }

  function holdAction() {
    timeout = setTimeout(executeHold, HOLD_DELAY);
  }

  function repeatAction() {
    clearTimeout(timeout);
    timeout = setTimeout(repeat, REPEAT_DELAY);
  }

  function repeat() {
    clearInterval(interval);

    interval = setInterval(execute, REPEAT_INTERVAL);
  }

  function add() {
    calculationService.add(getSymbol());
  }

  function getSymbol() {
    return getAttr(element, 'data-symbol');
  }

  function execute() {
    return actionMap[getAction()]();
  }

  function executeHold() {
    return holdActionMap[getAction()]();
  }

  function getAction() {
    return getAttr(element, 'data-action');
  }

  init();
}
