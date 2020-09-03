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
