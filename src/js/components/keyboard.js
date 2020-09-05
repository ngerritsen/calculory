import * as calculationService from '../service/calculation';
import { isAllowed } from '../engine';
import { on } from '../utils/dom';

export default function keyboard(element) {
  const actionMap = {
    Backspace: calculationService.remove,
    ArrowRight: calculationService.next,
    ArrowLeft: calculationService.previous,
    Enter: calculationService.submit,
  };

  const metaActionMap = {
    Backspace: calculationService.clear,
    ArrowRight: calculationService.end,
    ArrowLeft: calculationService.start,
  };

  function init() {
    on('keydown', onKeyDown, element);
  }

  function onKeyDown(event) {
    if (event.ctrlKey || event.metaKey) {
      const metaAction = metaActionMap[event.key];

      if (metaAction) {
        event.preventDefault();
        metaAction();
      }

      return;
    }

    const action = actionMap[event.key];

    if (action) {
      event.preventDefault();
      action();
      return;
    }

    if (isAllowed(event.key)) {
      event.preventDefault();
      calculationService.add(event.key);
    }
  }

  init();
}
