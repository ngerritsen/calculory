import { queryAll, getAttr } from '../utils/dom';

export default function initComponents(components, context) {
  queryAll('[data-component]', context).forEach((element) => {
    parseComponentAttribute(
      getAttr(element, 'data-component')
    ).forEach((name) => initComponent(components, element, name));
  });
}

function initComponent(components, element, name) {
  const component = components[name];

  if (typeof component === 'function') {
    component(element);
  }
}

function parseComponentAttribute(attribute) {
  if (!attribute.trim()) {
    return [];
  }

  return attribute.split(',').map((name) => name.trim());
}
