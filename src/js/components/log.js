import * as pubSub from '../pubSub';
import * as logService from '../service/logService';
import execute from '../engine';
import { query } from '../utils';

export default function log(element) {
  pubSub.subscribe('logAdded', renderLog);
  pubSub.subscribe('logsCleared', clearLogs);
  pubSub.subscribe('logsUpdated', updateLogs);

  function updateLogs(logs) {
    logs.forEach(renderLog);
  }

  function renderLog(log) {
    if (element.innerHTML.trim() === '') {
      element.innerHTML = getLogButtonHtml();
    }

    element.innerHTML = getLogHtml(log) + element.innerHTML;

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
    return `
      <div class="log__item" data-log-id=${log.id}>
        <p class="log__result">${execute(log.code)}</p>
        <code class="log__code">${log.code}</code>
      </div>
    `;
  }

  function clearLogs() {
    element.innerHTML = '';
  }
}
