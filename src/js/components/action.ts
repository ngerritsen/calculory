import * as calculationService from "../service/calculation";
import { getAttr, on, off, isTouchOnElement } from "../utils/dom";

const REPEAT_INTERVAL = 60;
const REPEAT_DELAY = 300;
const HOLD_DELAY = 500;
const HOLD_WITH_REPEAT_DELAY = 1250;
const LEFT_MOUSE_BUTTON = 0;

export default function action(element: Element): void {
  let repeatInterval, repeatTimeout, holdTimeout;

  const actionMap = {
    add,
    remove: calculationService.remove,
    next: calculationService.next,
    previous: calculationService.previous,
    submit: calculationService.submit,
  };

  const holdActionMap = {
    remove: calculationService.clear,
    next: calculationService.end,
    previous: calculationService.start,
  };

  const onMouseStart = filterLeftClicks(onStart);

  function init() {
    on("touchstart", onStart, element);
    on("mousedown", onMouseStart, element);
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

    if (isRepeatable()) {
      repeatAction();
    }

    if (holdActionMap[getAction()]) {
      holdAction();
    }

    on("touchcancel", onCancel, element);
    on("touchend", onEnd, element);
    on("touchmove", onTouchMove, element);
    on("mouseup", onEnd, element);
    on("mouseout", onCancel, element);
  }

  function onEnd(event) {
    onCancel(event);

    if (!repeatInterval) {
      execute();
    }

    repeatInterval = null;
  }

  function onCancel(event: Event) {
    event.preventDefault();

    off("touchcancel", onCancel, element);
    off("touchend", onEnd, element);
    off("touchmove", onTouchMove, element);
    off("mouseup", onEnd, element);
    off("mouseout", onCancel, element);

    clearInterval(repeatInterval);
    clearTimeout(repeatTimeout);
    clearTimeout(holdTimeout);
  }

  function onTouchMove(event) {
    event.preventDefault();

    if (isTouchOnElement(event.currentTarget, event)) {
      return;
    }

    onCancel(event);
  }

  function holdAction() {
    const delay = isRepeatable() ? HOLD_WITH_REPEAT_DELAY : HOLD_DELAY;
    holdTimeout = setTimeout(executeHold, delay);
  }

  function repeatAction() {
    repeatTimeout = setTimeout(repeat, REPEAT_DELAY);
  }

  function repeat() {
    repeatInterval = setInterval(execute, REPEAT_INTERVAL);
  }

  function add() {
    calculationService.add(getSymbol());
  }

  function getSymbol() {
    return getAttr(element, "data-symbol");
  }

  function execute() {
    return actionMap[getAction()]();
  }

  function executeHold() {
    return holdActionMap[getAction()]();
  }

  function getAction() {
    return getAttr(element, "data-action");
  }

  function isRepeatable() {
    return getAttr(element, "data-repeatable") !== null;
  }

  init();
}
