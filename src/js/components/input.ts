import * as calculationService from "../service/calculation";
import * as pubSub from "../core/pubSub";
import { toggleClass, getAttr, on, query } from "../utils/dom";
import { execute } from "../engine";
import { Calculation, EventHandler } from "../types";

const ERROR_CLASSNAME = "calculator__input--error";

export default function input(element: Element): void {
  function init() {
    pubSub.subscribe("calculation.updated", update);
    on("click", <EventHandler>onClick, element);
    update();
  }

  function onClick(event: MouseEvent) {
    if ((event.target as Element).hasAttribute("data-char")) {
      event.preventDefault();
      setPosition(event);
    }
  }

  function update() {
    const calculation = calculationService.get();
    updateError(calculation);
    render(calculation.code, calculation.position);
  }

  function updateError(calculation: Calculation) {
    const { error } = execute(calculation);
    toggleClass(element, ERROR_CLASSNAME, Boolean(error));
  }

  function setPosition(event: Event) {
    let position = Number(getAttr(event.target as Element, "data-position"));

    const { x, width } = (event.target as Element).getBoundingClientRect();
    const { clientX } = event as MouseEvent;

    if (clientX - x > width / 2) {
      position += 1;
    }

    calculationService.setPosition(position);
  }

  function render(code = "", position = 0) {
    let html = code
      .split("")
      .map((char, i) => renderChar(char, i, i === position))
      .join("");

    if (position >= code.length) {
      html += renderChar("&nbsp;", code.length, true);
    }

    element.innerHTML = html;

    scrollToActive();
  }

  function scrollToActive() {
    const input = element.getBoundingClientRect();
    const cursor = query("[data-active]", element).getBoundingClientRect();
    const padding = parseFloat(getComputedStyle(element).paddingLeft);

    if (cursor.right > input.right - padding) {
      element.scrollLeft =
        element.scrollLeft + cursor.right - input.right + padding;
      return;
    }

    if (cursor.left < input.left + padding) {
      element.scrollLeft =
        element.scrollLeft - (input.left - cursor.left) - padding;
      return;
    }
  }

  function renderChar(
    char: string,
    position: number,
    isActive: boolean
  ): string {
    return `<span
      data-char
      data-position="${position}"
      ${isActive ? "data-active" : ""}
      class="calculator__char ${isActive ? " calculator__char--active" : ""}"
    >${char}</span>`;
  }

  init();
}
