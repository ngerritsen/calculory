export function query(queryString, context) {
  return (context || document).querySelector(queryString);
}

export function queryAll(queryString, context) {
  return [...(context || document).querySelectorAll(queryString)];
}

export function stringToDom(html) {
  const container = document.createElement('div');

  container.innerHTML = html;

  return container.children[0];
}

export function on(event, handler, context) {
  (context || window).addEventListener(event, handler);
}

export function off(event, handler, context) {
  (context || window).removeEventListener(event, handler);
}

export function once(event, handler, context) {
  const onceHandler = (...args) => {
    handler(...args);
    off(event, onceHandler, context);
  };

  (context || window).addEventListener(event, onceHandler);
}

export function getAttr(element, name) {
  return element.getAttribute(name);
}

export function setAttr(element, name, value) {
  return element.setAttribute(name, value);
}

export function removeAttr(element, name) {
  element.removeAttribute(name);
}

export function getRect(element) {
  return element.getBoundingClientRect();
}

export function insertBefore(element, otherElement) {
  element.parentNode.insertBefore(otherElement, element);
}

export function remove(element) {
  element.parentNode.removeChild(element);
}

export function addClass(element, className) {
  if (!hasClass(element, className)) {
    element.classList.add(className);
  }
}

export function removeClass(element, className) {
  if (hasClass(element, className)) {
    element.classList.remove(className);
  }
}

export function hasClass(element, className) {
  return element.classList.contains(className);
}

export function getClasses(element) {
  return [...element.classList.entries()].map(([, value]) => value);
}

export function toggleClass(element, className, state) {
  if (state === false || (hasClass(element, className) && state !== true)) {
    removeClass(element, className);
    return;
  }

  addClass(element, className);
}
