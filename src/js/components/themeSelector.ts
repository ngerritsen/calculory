import * as themeService from "../service/theme";
import { queryAll, on } from "../utils/dom";

export default function themeSelector(element: Element): void {
  function init() {
    setCurrent();
    getOptions().forEach((option) => on("change", onChange, option));
  }

  function setCurrent() {
    const currentTheme = themeService.get();

    getOptions().forEach((option: HTMLInputElement) => {
      if (option.value === currentTheme) {
        option.checked = true;
      }
    });
  }

  function onChange(event) {
    if (event.target.checked) {
      themeService.set(event.target.value);
    }
  }

  function getOptions(): HTMLInputElement[] {
    return queryAll("[data-theme-option]", element) as HTMLInputElement[];
  }

  init();
}
