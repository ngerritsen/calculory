import {
  addClass,
  removeClass,
  stringToDom,
  query,
  hasClass,
  on,
  once,
} from '../utils/dom';
import * as pubSub from '../core/pubSub';

const ACTIVE_CLASSNAME = 'panel--active';
const NUDGE_CLASSNAME = 'panel__label--nudge';

export default function panel(element) {
  function init() {
    pubSub.subscribe('history.updated', nudge);
    on('click', onClick, getTrigger());
  }

  function onClick() {
    if (!isOpen()) {
      open();
      return;
    }

    close();
  }

  function nudge() {
    if (hasClass(getTrigger(), NUDGE_CLASSNAME) || isOpen()) {
      return;
    }

    addClass(getTrigger(), NUDGE_CLASSNAME);
    once(
      'animationend',
      () => removeClass(getTrigger(), NUDGE_CLASSNAME),
      getTrigger()
    );
  }

  function open() {
    addOverlay();
    addClass(element, ACTIVE_CLASSNAME);
  }

  function close() {
    removeOverlay();
    removeClass(element, ACTIVE_CLASSNAME);
  }

  function isOpen() {
    return hasClass(element, ACTIVE_CLASSNAME);
  }

  function addOverlay() {
    document.body.appendChild(
      stringToDom('<div data-overlay class="overlay"></div>')
    );
    on('click', close, getOverlay());
  }

  function removeOverlay() {
    document.body.removeChild(getOverlay());
  }

  function getOverlay() {
    return query('[data-overlay]');
  }

  function getTrigger() {
    return query('[data-trigger]', element);
  }

  init();
}
