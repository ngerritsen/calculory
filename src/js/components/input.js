import * as calculationService from '../service/calculation';
import * as pubSub from '../core/pubSub';
import { toggleClass } from '../utils/dom';
import { execute } from '../engine';

const ERROR_CLASSNAME = 'calculator__input--error';

export default function input(element) {
  function init() {
    pubSub.subscribe('calculation.updated', update);
    element.addEventListener('click', onClick);
    update();
  }

  function onClick(event) {
    if (event.target.hasAttribute('data-char')) {
      event.preventDefault();
      setPosition(event);
    }
  }

  function update() {
    const { code, position } = calculationService.get();
    updateError(code);
    render(code, position);
  }

  function updateError(code) {
    const { error } = execute(code);
    toggleClass(element, ERROR_CLASSNAME, Boolean(error));
  }

  function setPosition(event) {
    let position = Number(event.target.getAttribute('data-position'));

    const { x, width } = event.target.getBoundingClientRect();
    const { clientX } = event;

    if (clientX - x > width / 2) {
      position += 1;
    }

    calculationService.setPosition(position);
  }

  function render(code = '', position = 0) {
    let html = code
      .split('')
      .map((char, i) => renderChar(char, i, i === position))
      .join('');

    if (position >= code.length) {
      html += renderChar('&nbsp;', code.length, true);
    }

    element.innerHTML = html;
  }

  function renderChar(char, position, isActive) {
    return `<span
      data-char
      data-position="${position}"
      ${isActive ? 'data-active' : ''}
      class="calculator__char ${isActive ? ' calculator__char--active' : ''}"
    >${char}</span>`;
  }

  init();
}
