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
} from "../utils/dom";
import renderTemplate from "../core/renderTemplate";

const MORE_TEXT = "More";
const LESS_TEXT = "Less";

export default function showMore(element: Element): void {
  function init() {
    initShowMoreButton();
    on("resize", reset);
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

    on("click", toggle, getShowMoreButton());
  }

  function setHideableButtons(hideFromIndex) {
    getButtons().forEach((button, index) => {
      if (index >= hideFromIndex) {
        setAttr(button, "data-hideable-button", true);
        addClass(button, "is-hidden");
      }
    });
  }

  function unsetHideableButtons() {
    getButtons().forEach((button) => {
      removeAttr(button, "data-hideable-button");
      removeClass(button, "is-hidden");
    });
  }

  function getHideFromIndex(): number | false {
    const fromIndex = getButtons().reduce(
      (
        fromIndex: false | number,
        button: Element,
        index: number
      ): false | number =>
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
      toggleClass(button, "is-hidden");
    });
  }

  function isTogglable(): boolean {
    return Boolean(getShowMoreButton());
  }

  function getShowMoreButtonText(): string {
    return getShowMoreButton().textContent.trim();
  }

  function getButtons(): Element[] {
    return queryAll("[data-button]", element);
  }

  function getHideableButtons(): Element[] {
    return queryAll("[data-hideable-button]", element);
  }

  function isOverflowing(button): boolean {
    return getRect(button).bottom + window.scrollY > window.innerHeight;
  }

  function getShowMoreButton(): Element {
    return query("[data-show-more]", element);
  }

  function createShowMoreButton(): Element {
    return stringToDom(renderTemplate("show-more-button"));
  }

  init();
}
