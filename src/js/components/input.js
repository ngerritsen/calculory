import * as calculationService from '../service/calculation';
import * as pubSub from '../core/pubSub';
import { toggleClass } from '../utils/dom';
import { execute } from '../engine';

const ERROR_CLASSNAME = 'calculator__input--error';

export default function input(element) {
  function init() {
    pubSub.subscribe('calculation.updated', update);
    update();
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

  function render(code = '', position = 0) {
    let html = code
      .split('')
      .map((char, i) => renderChar(char, i === position))
      .join('');

    if (position >= code.length) {
      html += renderChar('&nbsp;', true);
    }

    element.innerHTML = html;
  }

  function renderChar(char, isActive) {
    return `<span
      data-char
      ${isActive ? 'data-active' : ''}
      class="calculator__char ${isActive ? ' calculator__char--active' : ''}"
    >${char}</span>`;
  }

  init();
}
