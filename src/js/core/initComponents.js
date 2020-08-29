const { default: functions } = require('../engine/functions');
const { queryAll } = require('../utils/dom');

export default function initComponents(components) {
  queryAll('[data-component]').forEach((el) => {
    const name = el.getAttribute('data-component');
    const component = components[name];

    if (typeof component === 'function') {
      component(el);
    }
  });
}
