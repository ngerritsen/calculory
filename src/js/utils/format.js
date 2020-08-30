export function formatNumber(number) {
  const str = String(number);
  let [left, right] = str.split('.');

  if (left && left.length > 3) {
    left = left
      .split('')
      .map((char, i) =>
        (left.length - i - 1) % 3 === 0 && i !== left.length - 1
          ? char + ','
          : char
      )
      .join('');
  }

  if (right && right.length > 8) {
    right = right.slice(0, 8);
  }

  return left + (right ? '.' + right : '');
}
