import { Component } from "../types";
import { queryAll, getAttr } from "../utils/dom";

export default function initComponents(
  components: Record<string, Component>,
  context?: Element
): void {
  queryAll("[data-component]", context).forEach((element: Element) => {
    parseComponentAttribute(
      getAttr(element, "data-component")
    ).forEach((name) => initComponent(components, element, name));
  });
}

function initComponent(
  components: Record<string, Component>,
  element: Element,
  name: string
) {
  const component = components[name];

  if (typeof component === "function") {
    component(element);
  }
}

function parseComponentAttribute(attribute: string): string[] {
  if (!attribute.trim()) {
    return [];
  }

  return attribute.split(",").map((name) => name.trim());
}
