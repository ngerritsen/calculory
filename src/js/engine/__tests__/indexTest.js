import execute from '..';

test('Executes the calculation correctly', () => {
  expect(execute('1 + 2')).toBe(3);
  expect(execute('2 * pi')).toBe(2 * Math.PI);
  expect(execute('2 * E')).toBe(2 * Math.E);
  expect(execute('1 + 2 * 3')).toBe(7);
  expect(execute('2^2')).toBe(4);
  expect(execute('2*3^3')).toBe(54);
  expect(execute('2*3^3')).toBe(54);
  expect(execute('log(100)*2')).toBe(4);
  expect(execute('ln(3)')).toBe(Math.log(3, Math.E));
  expect(execute('sin(3)')).toBe(Math.sin(3));
  expect(execute('tan(3)')).toBe(Math.tan(3));
  expect(execute('cos(3)')).toBe(Math.cos(3));
  expect(execute('(1 + 2) * 3')).toBe(9);
  expect(execute('1 * 1.2 / 2')).toBe(0.6);
  expect(execute('-2-2')).toBe(-4);
});
