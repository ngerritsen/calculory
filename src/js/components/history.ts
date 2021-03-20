import * as pubSub from "../core/pubSub";
import initComponents from "../core/initComponents";
import action from "./action";
import removeHistoryItem from "./removeHistoryItem";
import clearHistory from "./clearHistory";
import * as historyService from "../service/history";
import { formatNumber } from "../utils/format";
import { execute } from "../engine";
import renderTemplate from "../core/renderTemplate";
import { CalculationRecord } from "../types";

export default function log(element: Element): void {
  function init() {
    pubSub.subscribe("history.updated", update);
    update();
  }

  function update() {
    render(historyService.getAll());
  }

  function render(items: CalculationRecord[]) {
    if (items.length === 0) {
      element.innerHTML = "<p>Nothing here yet.</p>";
      return;
    }

    element.innerHTML = items.map(getItemHtml).join("") + getClearButtonHtml();

    initComponents({ action, removeHistoryItem, clearHistory }, element);
  }

  function getClearButtonHtml(): string {
    return renderTemplate("history-clear-button");
  }

  function getItemHtml(item: CalculationRecord): string {
    const { result } = execute(item);

    return renderTemplate("history-item", {
      result,
      formattedResult: formatNumber(result),
      code: item.code,
      id: item.id,
    });
  }

  init();
}
