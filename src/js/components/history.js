import * as pubSub from '../core/pubSub';
import initComponents from '../core/initComponents';
import action from './action';
import * as historyService from '../service/history';
import { formatNumber } from '../utils/format';
import { execute } from '../engine';
import { query, queryAll, toggleClass } from '../utils/dom';

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
    listenForItemClicks();
    initComponents({ action }, element);
  }

  function listenForClearButton() {
    query('[data-clear]', element).addEventListener(
      'click',
      historyService.clear
    );
  }

  function listenForItemClicks() {
    queryAll('[data-item]').forEach((item) => {
      item.addEventListener('click', () => {
        toggleActions(item);
      });
    });
  }

  function toggleActions(item) {
    const actionEl = query('[data-actions]', item);

    queryAll('[data-actions]').forEach((el) => {
      toggleClass(
        el,
        'history__actions--active',
        el !== actionEl ? false : undefined
      );
    });
  }

  function getClearButtonHtml() {
    return `
      <button
        data-clear
        class="button button--small button--danger"
      >Clear</button>
    `;
  }

  function getItemHtml(log) {
    const { result } = execute(log.code);

    return `
      <div class="history__item" data-item>
        <div>
          <div class="history__result">${formatNumber(result)}</div>
          <div class="history__code">${log.code}</div>
        </div>
        <div class="history__actions" data-actions>
          <button
            class="button button--small button--secondary"
            data-component="action"
            data-action="add"
            data-symbol="${result}"
          >Use result</button>
          &nbsp;
          <button
            class="button button--small button--secondary"
            data-component="action"
            data-action="add"
            data-symbol="${log.code}"
          >Use expression</button>
        </div>
      </div>
    `;
  }

  init();
}
