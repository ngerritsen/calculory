export function store(logs) {
  localStorage.setItem('logs', JSON.stringify(logs));
}

export function getAll() {
  const rawLogs = localStorage.getItem('logs');

  try {
    return rawLogs ? JSON.parse(rawLogs) : [];
  } catch (e) {
    return [];
  }
}
