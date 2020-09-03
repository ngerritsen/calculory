import * as themeService from '../service/theme';
import * as pubSub from '../core/pubSub';
import { addClass, getClasses, removeClass } from '../utils/dom';

export default function theme(element) {
  function init() {
    pubSub.subscribe('theme.updated', apply);
    apply();
  }

  function apply() {
    const theme = themeService.get();

    removeThemes();

    addClass(element, `theme-${theme}`);
  }

  function removeThemes() {
    getClasses(element)
      .filter((className) => className.indexOf('theme-') === 0)
      .forEach((className) => removeClass(element, className));
  }

  init();
}
