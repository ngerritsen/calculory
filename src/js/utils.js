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

export function formatOutput(number) {
  const str = String(number);
  let [left, right] = str.split('.');

  if (left && left.length > 3) {
    left = left
      .split('')
      .map((char, i) =>
        i % 3 === 0 && i !== left.length - 1 ? char + ',' : char
      )
      .join('');
  }

  if (right && right.length > 8) {
    right = right.slice(0, 8);
  }

  console.log(number);

  return left + (right ? '.' + right : '');
}
