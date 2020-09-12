import { query } from '../utils/dom';

export default function renderTemplate(name, content = {}) {
  return format(getTemplate(name), content);
}

function format(template, content) {
  return Object.keys(content).reduce(
    (formatted, key) =>
      formatted.replace(new RegExp(`\{${key}\}`, 'g'), content[key]),
    template
  );
}

function getTemplate(name) {
  return query(`[data-template="${name}"]`).innerHTML;
}
