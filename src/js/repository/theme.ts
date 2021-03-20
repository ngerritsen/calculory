export function store(theme: string): void {
  localStorage.setItem("theme", theme);
}

export function get(): string {
  return localStorage.getItem("theme") || "";
}
