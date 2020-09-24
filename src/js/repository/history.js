export function store(history) {
  localStorage.setItem('history', JSON.stringify(history));
}

export function getAll() {
  const rawLogs = localStorage.getItem('history');

  try {
    return rawLogs ? JSON.parse(rawLogs) : [];
  } catch (e) {
    return [];
  }
}
