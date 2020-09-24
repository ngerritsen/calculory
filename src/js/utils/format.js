export function formatNumber(number) {
  if (number < 1e-10 && number > -1e-10) {
    return '0';
  }

  let [left, right] = number.toString().split('.');

  if (left && left.length > 3 && !isNaN(parseInt(left))) {
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
