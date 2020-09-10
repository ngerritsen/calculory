import { execute } from '..';

test('Empty calculations', () => {
  expect(execute('').result).toBe(0);
  expect(execute(' ').result).toBe(0);
  expect(execute(' 0 ').result).toBe(0);
});

test('Basic math.', () => {
  expect(execute('1 + 2').result).toBe(3);
  expect(execute('1 + 2 * 3').result).toBe(7);
  expect(execute('2^2').result).toBe(4);
  expect(execute('2*3^3').result).toBe(54);
  expect(execute('2*3^3').result).toBe(54);
  expect(execute('1 * 1.2 / 2').result).toBe(0.6);
});

test('Grouping.', () => {
  expect(execute('(1 + 2) * 3').result).toBe(9);
});

test('Functions.', () => {
  expect(execute('log(100)*2').result).toBe(4);
  expect(execute('ln(3)').result).toBe(Math.log(3, Math.E));
  expect(execute('sin(3)').result).toBe(Math.sin(3));
  expect(execute('√(3)').result).toBe(Math.sqrt(3));
  expect(execute('tan(3)').result).toBe(Math.tan(3));
  expect(execute('cos(3)').result).toBe(Math.cos(3));
  expect(execute('cos(3)+3').result).toBe(Math.cos(3) + 3);
});

test('Negative numbers.', () => {
  expect(execute('-2-2').result).toBe(-4);
  expect(execute('-2--2').result).toBe(0);
  expect(execute('-2+-2').result).toBe(-4);
  expect(execute('-e').result).toBe(Math.E * -1);
  expect(execute('-(2+2)').result).toBe(-4);
  expect(execute('-sin(3)').result).toBe(Math.sin(3) * -1);
});

test('Factorial numbers.', () => {
  expect(execute('0!').result).toBe(1);
  expect(execute('0.5!').result).toBe(0.8862269254527586);
  expect(execute('1!').result).toBe(1);
  expect(execute('2!').result).toBe(2);
  expect(execute('2+2!^2').result).toBe(6);
  expect(execute('2+(2+1)!^2').result).toBe(38);
  expect(execute('2.5!').result).toBe(3.3233509704478426);
  expect(execute('3!').result).toBe(6);
  expect(execute('102!').result).toBe(9.61446671503399e161);
  expect(execute('-2!').result).toBe(-2);
});

test('Percentages.', () => {
  expect(execute('0%').result).toBe(0);
  expect(execute('5%').result).toBe(0.05);
  expect(execute('105%').result).toBe(1.05);
  expect(execute('200%!').result).toBe(2);
});

test('Combining modifiers', () => {
  expect(execute('2!%').result).toBe(0.02);
  expect(execute('2!!').result).toBe(2);
  expect(execute('100%!!').result).toBe(1);
});

test('Constants.', () => {
  expect(execute('2 * pi').result).toBe(2 * Math.PI);
  expect(execute('π').result).toBe(Math.PI);
  expect(execute('2 * E').result).toBe(2 * Math.E);
});

test('Implicit multiplications', () => {
  expect(execute('(3+1)π').result).toBe(4 * Math.PI);
  expect(execute('2π').result).toBe(2 * Math.PI);
  expect(execute('2π%^e').result).toBe(2 * Math.pow(Math.PI / 100, Math.E));
  expect(execute('2%π').result).toBe(0.02 * Math.PI);
  expect(execute('-2%π').result).toBe(-0.02 * Math.PI);
  expect(execute('-2%π').result).toBe(-0.02 * Math.PI);
  expect(execute('(2*2)π').result).toBe(4 * Math.PI);
  expect(execute('2cos(pi)').result).toBe(-2);
  expect(execute('(2*2)(2*2)').result).toBe(16);
  expect(execute('-(2*2)(2*2)').result).toBe(-16);
});

test('Absolute', () => {
  expect(execute('|-2|').result).toBe(2);
  expect(execute('√(|-9|)').result).toBe(3);
  expect(execute('|-2*8-3|').result).toBe(19);
});

test('Scientific big number notation.', () => {
  expect(execute('5.2e+5').result).toBe(520000);
  expect(execute('5.2e-3').result).toBe(0.0052);
  expect(execute('5.2e-2-e').result).toBe(0.052 - Math.E);
});
