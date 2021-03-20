import * as calculationService from "../service/calculation";
import { isAllowed } from "../engine";
import { on } from "../utils/dom";
import { EventHandler, ClipboardData } from "../types";

export default function keyboard(element: Element): void {
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
    on("keydown", <EventHandler>onKeyDown, element);
    on("paste", <EventHandler>onPaste, element);
  }

  function onPaste(event) {
    event.preventDefault();
    const code = (event.clipboardData as ClipboardData).getData("text");
    calculationService.add(code);
  }

  function onKeyDown(event: KeyboardEvent) {
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
