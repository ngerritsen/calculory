export function store(theme) {
  localStorage.setItem('theme', theme);
}

export function get() {
  return localStorage.getItem('theme') || '';
}
