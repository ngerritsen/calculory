import {
  addClass,
  removeClass,
  stringToDom,
  query,
  hasClass,
  on,
} from '../utils/dom';

const ACTIVE_CLASSNAME = 'panel--active';

export default function panel(element) {
  function init() {
    on('click', onClick, getTrigger());
  }

  function onClick() {
    if (!isOpen()) {
      open();
      return;
    }

    close();
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
