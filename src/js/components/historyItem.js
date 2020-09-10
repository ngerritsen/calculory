import { query, toggleClass, on, getAttr, addClass, removeClass } from '../utils/dom';
import * as historyService from '../service/history';

export default function historyItem(element) {
  function init() {
    on('click', toggleActions, getContent());
    on('mouseover', expandActions, getContent());
    on('mouseout', collapseActions, getContent());
    on('click', remove, getRemove());
  }

  function remove() {
    historyService.remove(getId());
  }

  function toggleActions() {
    toggleClass(getActions(), 'history__actions--active');
  }

  function expandActions() {
    addClass(getActions(), 'history__actions--active');
  }

  function collapseActions() {
    removeClass(getActions(), 'history__actions--active');
  }

  function getId() {
    return getAttr(element, 'data-item-id');
  }

  function getRemove() {
    return query('[data-remove]', element);
  }

  function getActions() {
    return query('[data-actions]', element);
  }

  function getContent() {
    return query('[data-content]', element);
  }

  init();
}
