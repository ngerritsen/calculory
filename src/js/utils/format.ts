export function formatNumber(number: number): string {
  if (number < 1e-10 && number > -1e-10) {
    return "0";
  }

  const result = number.toString().split(".");
  let left = result[0];
  const right = result[1];

  if (left && left.length > 3 && !isNaN(parseInt(left))) {
    left = left
      .split("")
      .map((char, i) =>
        (left.length - i - 1) % 3 === 0 && i !== left.length - 1
          ? char + ","
          : char
      )
      .join("");
  }

  return left + (right ? "." + right : "");
}
