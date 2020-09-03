import * as themeRepository from '../repository/theme';
import * as pubSub from '../core/pubSub';

const DEFAULT_THEME = 'classic';

let theme = themeRepository.get() || DEFAULT_THEME;

export function set(newTheme) {
  theme = newTheme;
  pubSub.publish('theme.updated');
  themeRepository.store(newTheme);
}

export function get() {
  return theme;
}
