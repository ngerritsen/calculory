import * as pubSub from '../core/pubSub';
import * as historyService from '../service/history';
import execute from '../engine';
import { query } from '../utils/dom';

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
      element.innerHTML = '';
      return;
    }

    element.innerHTML = items.map(getItemHtml).join('') + getClearButtonHtml();

    query('[data-log-button-clear]', element).addEventListener(
      'click',
      historyService.clear
    );
  }

  function getClearButtonHtml() {
    return `
      <button
        data-log-button-clear
        class="button button--action-danger"
      >Clear</button>
    `;
  }

  function getItemHtml(log) {
    const { result } = execute(log.code);

    return `
      <div class="history__item" data-log-id=${log.id}>
        <div class="history__result">${result}</div>
        <div class="history__code">${log.code}</div>
      </div>
    `;
  }

  init();
}
