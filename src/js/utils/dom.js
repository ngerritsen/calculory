export function query(queryString, context) {
  return (context || document).querySelector(queryString);
}

export function queryAll(queryString, context) {
  return [...(context || document).querySelectorAll(queryString)];
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

export function toggleClass(element, className, state) {
  if (state === false || (!hasClass(element, className) && state !== true)) {
    removeClass(element, className);
    return;
  }

  addClass(element, className);
}
