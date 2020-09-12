import * as calculationService from '../service/calculation';
import { getAttr, on } from '../utils/dom';

const REPEAT_INTERVAL = 60;
const REPEAT_DELAY = 320;
const HOLD_DELAY = 460;
const REPEATABLE_ACTIONS = ['add', 'next', 'previous'];
const LEFT_MOUSE_BUTTON = 0;

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
    on('mousedown', filterLeftClicks(onStart), element);
    on('mouseup', filterLeftClicks(onEnd), element);
    on('mouseout', onCancel, element);
  }

  function filterLeftClicks(handler) {
    return (event) => {
      if (event.button === LEFT_MOUSE_BUTTON) {
        handler(event);
      }
    };
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
    onCancel(event);

    if (!interval) {
      execute();
    }

    interval = null;
  }

  function onCancel(event) {
    event.preventDefault();

    clearInterval(interval);
    clearTimeout(timeout);
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
