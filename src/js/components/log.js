import * as pubSub from '../pubSub';
import execute from '../engine';

export default function log(element) {
  pubSub.subscribe('logAdded', renderLog);

  function renderLog(log) {
    element.innerHTML = `
      <div class="log__item" data-log-id=${log.id}>
        <p class="log__result">${execute(log.code)}</p>
        <code class="log__code">${log.code}</code>
      </div>
    ` + element.innerHTML;
  }
}
