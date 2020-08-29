export function store(code) {
  localStorage.setItem('calculation', code);
}

export function get() {
  return localStorage.getItem('calculation') || '';
}
