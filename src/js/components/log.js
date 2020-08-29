import * as pubSub from '../core/pubSub';
import * as logService from '../service/log';
import execute from '../engine';
import { query } from '../utils/dom';

export default function log(element) {
  function init() {
    pubSub.subscribe('logs.updated', updateLogs);
  }

  function updateLogs() {
    renderLogs(logService.getAll());
  }

  function renderLogs(logs) {
    if (logs.length === 0) {
      element.innerHTML = '';
      return;
    }

    element.innerHTML = logs.map(getLogHtml).join('') + getLogButtonHtml();

    query('[data-log-button-clear]', element).addEventListener(
      'click',
      logService.clear
    );
  }

  function getLogButtonHtml() {
    return `
      <div class="log_actions">
        <button
          data-log-button-clear
          class="button button--action-danger"
        >Clear</button>
      </div>
    `;
  }

  function getLogHtml(log) {
    const { result } = execute(log.code);

    return `
      <div class="log__item" data-log-id=${log.id}>
        <p class="log__result">${result}</p>
        <code class="log__code">${log.code}</code>
      </div>
    `;
  }

  init();
}
