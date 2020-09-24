export function store(calculation) {
  localStorage.setItem('calculation', JSON.stringify(calculation));
}

export function get() {
  const raw = localStorage.getItem('calculation');

  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}
