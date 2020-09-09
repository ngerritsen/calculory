import {
  queryAll,
  stringToDom,
  toggleClass,
  addClass,
  on,
  setAttr,
  removeAttr,
  getRect,
  query,
  insertBefore,
  remove,
  removeClass,
} from '../utils/dom';

const MORE_TEXT = 'More';
const LESS_TEXT = 'Less';

export default function showMore(element) {
  function init() {
    initShowMoreButton();
    on('resize', reset, window);
  }

  function reset() {
    if (isTogglable()) {
      remove(getShowMoreButton());
      unsetHideableButtons();
    }

    initShowMoreButton();
  }

  function initShowMoreButton() {
    const hideFromIndex = getHideFromIndex();

    if (hideFromIndex === false) return;

    insertBefore(getButtons()[hideFromIndex], createShowMoreButton());
    setHideableButtons(hideFromIndex);

    on('click', toggle, getShowMoreButton());
  }

  function setHideableButtons(hideFromIndex) {
    getButtons().forEach((button, index) => {
      if (index >= hideFromIndex) {
        setAttr(button, 'data-hideable-button', true);
        addClass(button, 'is-hidden');
      }
    });
  }

  function unsetHideableButtons() {
    getButtons().forEach((button) => {
      removeAttr(button, 'data-hideable-button');
      removeClass(button, 'is-hidden');
    });
  }

  function getHideFromIndex() {
    const fromIndex = getButtons().reduce(
      (fromIndex, button, index) =>
        isOverflowing(button) && fromIndex === false ? index : fromIndex,
      false
    );

    return fromIndex === false ? false : Math.max(fromIndex - 2, 2);
  }

  function toggle() {
    toggleShowMoreButton();
    toggleButtons();
  }

  function toggleShowMoreButton() {
    getShowMoreButton().textContent =
      getShowMoreButtonText() === LESS_TEXT ? MORE_TEXT : LESS_TEXT;
  }

  function toggleButtons() {
    getHideableButtons().forEach((button) => {
      toggleClass(button, 'is-hidden');
    });
  }

  function isTogglable() {
    return Boolean(getShowMoreButton());
  }

  function getShowMoreButtonText() {
    return getShowMoreButton().textContent.trim();
  }

  function getButtons() {
    return queryAll('[data-button]', element);
  }

  function getHideableButtons() {
    return queryAll('[data-hideable-button]', element);
  }

  function isOverflowing(button) {
    return getRect(button).bottom + window.scrollY > window.innerHeight;
  }

  function getShowMoreButton() {
    return query('[data-show-more]', element);
  }

  function createShowMoreButton() {
    return stringToDom(`
      <button
        class="button calculator__button--col-span-2"
        type="submit"
        data-show-more
      >
        ${MORE_TEXT}
      </button>
    `);
  }

  init();
}
