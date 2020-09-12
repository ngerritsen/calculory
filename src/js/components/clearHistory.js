import { on } from '../utils/dom';
import * as historyService from '../service/history';

export default function clearHistory(element) {
  function init() {
    on('click', remove, element);
  }

  function remove() {
    historyService.clear();
  }

  init();
}
