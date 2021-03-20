import { on, getAttr } from "../utils/dom";
import * as historyService from "../service/history";

export default function removeHistoryItem(element: Element): void {
  function init() {
    on("click", remove, element);
  }

  function remove() {
    historyService.remove(getId());
  }

  function getId(): string {
    return getAttr(element, "data-id");
  }

  init();
}
