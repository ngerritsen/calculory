export function store(calculation) {
  localStorage.setItem('calculation', calculation);
}

export function get() {
  return localStorage.getItem('calculation');
}
