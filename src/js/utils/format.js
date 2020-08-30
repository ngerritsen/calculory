export function formatNumber(number) {
  let [left, right] = number.toString().split('.');

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

  return left + (right ? '.' + right : '');
}
