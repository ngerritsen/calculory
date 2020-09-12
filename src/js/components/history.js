import * as pubSub from '../core/pubSub';
import initComponents from '../core/initComponents';
import action from './action';
import removeHistoryItem from './removeHistoryItem';
import * as historyService from '../service/history';
import { formatNumber } from '../utils/format';
import { execute } from '../engine';
import { query, on } from '../utils/dom';

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

    listenForClearButton();
    initComponents({ action, removeHistoryItem }, element);
  }

  function listenForClearButton() {
    on('click', historyService.clear, query('[data-clear]', element));
  }

  function getClearButtonHtml() {
    return `
      <button
        data-clear
        class="button button--small button--danger"
      >Clear</button>
    `;
  }

  function getItemHtml(item) {
    const { result } = execute(item.code);

    return `
      <div class="history__item">
        <div>
          <div
            class="history__result"
            data-component="action"
            data-action="add"
            data-symbol="${result}"
          >
            ${formatNumber(result)}
          </div>
          <div
            class="history__code"
            data-component="action"
            data-action="add"
            data-symbol="${item.code}"
          >
            ${item.code}
          </div>
          <button
            class="history__remove"
            data-component="removeHistoryItem"
            data-id=${item.id}
          >
            <svg class="icon">
              <use href="#icon-times" />
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  init();
}
