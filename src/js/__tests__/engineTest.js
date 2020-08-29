import execute from '../engine';

test('Executes the calculation correctly', () => {
  expect(execute('').result).toBe(0);
  expect(execute('1 + 2').result).toBe(3);
  expect(execute('2 * pi').result).toBe(2 * Math.PI);
  expect(execute('2 * E').result).toBe(2 * Math.E);
  expect(execute('1 + 2 * 3').result).toBe(7);
  expect(execute('2^2').result).toBe(4);
  expect(execute('2*3^3').result).toBe(54);
  expect(execute('2*3^3').result).toBe(54);
  expect(execute('log(100)*2').result).toBe(4);
  expect(execute('ln(3)').result).toBe(Math.log(3, Math.E));
  expect(execute('sin(3)').result).toBe(Math.sin(3));
  expect(execute('tan(3)').result).toBe(Math.tan(3));
  expect(execute('cos(3)').result).toBe(Math.cos(3));
  expect(execute('(1 + 2) * 3').result).toBe(9);
  expect(execute('1 * 1.2 / 2').result).toBe(0.6);
  expect(execute('-2-2').result).toBe(-4);
});
