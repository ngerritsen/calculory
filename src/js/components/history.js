import * as pubSub from '../core/pubSub';
import initComponents from '../core/initComponents';
import action from './action';
import historyItem from './historyItem';
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
    initComponents({ action, historyItem }, element);
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
      <div class="history__item" data-component="historyItem" data-item-id=${
        item.id
      }>
        <div data-content>
          <div class="history__result">${formatNumber(result)}</div>
          <div class="history__code">${item.code}</div>
        </div>
        <div class="history__actions" data-actions>
          <button
            class="button button--small button--secondary button--inline"
            data-component="action"
            data-action="add"
            data-symbol="${result}"
          >Use result</button>
          <button
            class="button button--small button--secondary button--inline"
            data-component="action"
            data-action="add"
            data-symbol="${item.code}"
          >Use expression</button>
          <button
            class="button button--small button--danger button--inline"
            data-remove
          >Remove</button>
        </div>
      </div>
    `;
  }

  init();
}
