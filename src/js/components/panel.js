import {
  addClass,
  removeClass,
  stringToDom,
  query,
  hasClass,
} from '../utils/dom';

const ACTIVE_CLASSNAME = 'panel--active';

export default function panel(element) {
  function init() {
    element.addEventListener('click', onClick);
  }

  function onClick() {
    if (!isOpen()) {
      open();
    }
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
    getOverlay().addEventListener('click', close);
  }

  function removeOverlay() {
    document.body.removeChild(getOverlay());
  }

  function getOverlay() {
    return query('[data-overlay]');
  }

  init();
}
