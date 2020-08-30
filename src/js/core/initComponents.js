import { queryAll } from '../utils/dom';

export default function initComponents(components, context) {
  queryAll('[data-component]', context).forEach((el) => {
    const name = el.getAttribute('data-component');
    const component = components[name];

    if (typeof component === 'function') {
      component(el);
    }
  });
}
