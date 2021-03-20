import { query } from "../utils/dom";

export default function renderTemplate(
  name: string,
  content: Record<string, string | number> = {}
): string {
  return format(getTemplate(name), content);
}

function format(template: string, content: Record<string, string | number>) {
  return Object.keys(content).reduce(
    (formatted, key) =>
      formatted.replace(new RegExp(`{${key}}`, "g"), String(content[key])),
    template
  );
}

function getTemplate(name: string): string {
  return query(`[data-template="${name}"]`).innerHTML;
}
