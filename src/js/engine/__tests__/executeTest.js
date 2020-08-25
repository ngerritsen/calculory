import execute from '..';

test('Executes the calculation correctly', () => {
  expect(execute('1 + 2')).toBe(3);
  expect(execute('2 * pi')).toBe(2 * Math.PI);
  expect(execute('2 * E')).toBe(2 * Math.E);
  expect(execute('1 + 2 * 3')).toBe(7);
  expect(execute('(1 + 2) * 3')).toBe(9);
  expect(execute('1 * 1.2 / 2')).toBe(0.6);
  expect(execute('-2-2')).toBe(-4);
});
