import * as calculationService from '../service/calculation';
import { queryAll } from '../utils';
import execute from '../engine';

const ERROR_CLASSNAME = 'calculator__input--error';

export default function input(element) {
  render(get());

  function add(symbol) {
    const code = get();
    const position = getPosition(code);
    const newCode = code.slice(0, position) + symbol + code.slice(position);
    const isFunction = symbol.match(/^\w+\(\)$/);
    const positionModifier = isFunction ? symbol.length - 1 : symbol.length;

    apply(newCode, positionModifier);
  }

  function remove() {
    const code = get();
    const position = getPosition(code);

    if (position === 0) {
      return;
    }

    const newCode = code.slice(0, position - 1) + code.slice(position);

    apply(newCode, -1);
  }

  function clear() {
    apply('');
  }

  function apply(code, positionModifier = 0) {
    calculationService.set(code);
    render(code, positionModifier);
  }

  function get() {
    return calculationService.get();
  }

  function next() {
    render(get(), 1);
  }

  function previous() {
    render(get(), -1);
  }

  function setError() {
    if (!hasError()) {
      element.classList.add(ERROR_CLASSNAME);
    }
  }

  function unsetError() {
    if (hasError()) {
      element.classList.remove(ERROR_CLASSNAME);
    }
  }

  function hasError() {
    return element.classList.contains(ERROR_CLASSNAME);
  }

  function render(code = '', positionModifier = 0) {
    const position = getPosition(code) + positionModifier;

    let html = code
      .split('')
      .map((char, i) => renderChar(char, i === position))
      .join('');

    if (position >= code.length) {
      html += renderChar('&nbsp;', true);
    }

    element.innerHTML = html;

    updateError(code);
  }

  function updateError(code) {
    const { error } = execute(code);

    if (error) {
      setError();
      return;
    }

    unsetError();
  }

  function renderChar(char, isActive) {
    return `<span
      data-char
      ${isActive ? 'data-active' : ''}
      class="calculator__char ${isActive ? ' calculator__char--active' : ''}"
    >${char}</span>`;
  }

  function getPosition(code) {
    let position = code.length;

    queryAll('[data-char]').find((el, i) => {
      if (el.hasAttribute('data-active')) {
        position = i;
      }
    });

    return position;
  }

  return {
    add,
    remove,
    clear,
    get,
    next,
    previous,
    setError,
    unsetError,
    hasError,
  };
}
