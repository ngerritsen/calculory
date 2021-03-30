export function query(queryString: string, context?: Element): Element | null {
  return (context || document).querySelector(queryString);
}

export function queryAll(
  queryString: string,
  context?: Element
): Element[] | null {
  return [...(context || document).querySelectorAll(queryString)];
}

export function stringToDom(html: string): Element {
  const container = document.createElement("div");

  container.innerHTML = html;

  return container.children[0];
}

export function on(
  event: string,
  handler: (event: Event) => void,
  context?: Element
): void {
  (context || window).addEventListener(event, handler);
}

export function off(
  event: string,
  handler: (event: Event) => void,
  context?: Element
): void {
  (context || window).removeEventListener(event, handler);
}

export function once(
  event: string,
  handler: (event: Event) => void,
  context?: Element
): void {
  const onceHandler = (e: Event) => {
    handler(e);
    off(event, onceHandler, context);
  };

  (context || window).addEventListener(event, onceHandler);
}

export function getAttr(element: Element, name: string): string {
  return element.getAttribute(name);
}

export function setAttr(element: Element, name: string, value: string): void {
  return element.setAttribute(name, value);
}

export function removeAttr(element: Element, name: string): void {
  element.removeAttribute(name);
}

export function getRect(element: Element): DOMRect {
  return element.getBoundingClientRect();
}

export function insertBefore(element: Element, otherElement: Element): void {
  element.parentNode.insertBefore(otherElement, element);
}

export function remove(element: Element): void {
  element.parentNode.removeChild(element);
}

export function addClass(element: Element, className: string): void {
  if (!hasClass(element, className)) {
    element.classList.add(className);
  }
}

export function removeClass(element: Element, className: string): void {
  if (hasClass(element, className)) {
    element.classList.remove(className);
  }
}

export function hasClass(element: Element, className: string): boolean {
  return element.classList.contains(className);
}

export function getClasses(element: Element): string[] {
  return [...element.classList];
}

export function toggleClass(
  element: Element,
  className: string,
  state?: boolean
): void {
  if (state === false || (hasClass(element, className) && state !== true)) {
    removeClass(element, className);
    return;
  }

  addClass(element, className);
}

export function isTouchOnElement(element: Element, event: TouchEvent): boolean {
  const touch = event.changedTouches.item(0);

  if (touch === null) return false;

  const { right, left, top, bottom } = element.getBoundingClientRect();
  const { clientX, clientY } = touch;

  return right > clientX && left < clientX && top < clientY && bottom > clientY;
}
