export function generateId() {
  return Math.round(Math.random() * 1e16)
    .toString(16)
    .slice(0, 6);
}

export function query(queryString, context) {
  return (context || document).querySelector(queryString);
}

export function queryAll(queryString, context) {
  return [...(context || document).querySelectorAll(queryString)];
}
