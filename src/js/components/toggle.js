import { on, query, getAttr, toggleClass } from '../utils/dom';

export default function toggle(element) {
  function init() {
    on('click', onClick, element);
  }

  function onClick() {
    toggleClass(getTarget(), 'is-hidden');
  }

  function getTarget() {
    return query(`[data-toggle-content="${getName()}"]`);
  }

  function getName() {
    return getAttr(element, 'data-toggle-name');
  }

  init();
}
