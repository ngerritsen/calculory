import * as pubSub from '../core/pubSub';
import initComponents from '../core/initComponents';
import action from './action';
import removeHistoryItem from './removeHistoryItem';
import clearHistory from './clearHistory';
import * as historyService from '../service/history';
import { formatNumber } from '../utils/format';
import { execute } from '../engine';
import renderTemplate from '../core/renderTemplate';

export default function log(element) {
  function init() {
    pubSub.subscribe('history.updated', update);
    update();
  }

  function update() {
    render(historyService.getAll());
  }

  function render(items) {
    if (items.length === 0) {
      element.innerHTML = '<p>Nothing here yet.</p>';
      return;
    }

    element.innerHTML = items.map(getItemHtml).join('') + getClearButtonHtml();

    initComponents({ action, removeHistoryItem, clearHistory }, element);
  }

  function getClearButtonHtml() {
    return renderTemplate('history-clear-button');
  }

  function getItemHtml(item) {
    const { result } = execute(item.code);

    return renderTemplate('history-item', {
      result,
      formattedResult: formatNumber(result),
      code: item.code,
      id: item.id
    });
  }

  init();
}
