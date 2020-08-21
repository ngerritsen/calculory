import tokenize from '../tokenize';

test('Tokenizes tokens', () => {
  expect(tokenize('1 a')).toEqual(['1', 'a']);
  expect(tokenize('   1   a   ')).toEqual(['1', 'a']);
  expect(tokenize('12 ab')).toEqual(['12', 'ab']);
  expect(tokenize('1a')).toEqual(['1', 'a']);
  expect(tokenize('1 * 2 + 3')).toEqual(['1', '*', '2', '+', '3']);
  expect(tokenize('1 * 2.2 / 3')).toEqual(['1', '*', '2.2', '/', '3']);
  expect(tokenize('(1 * 2) + 3')).toEqual(['(', '1', '*', '2', ')', '+', '3']);
  expect(tokenize('12.056')).toEqual(['12.056']);
  expect(tokenize('-12.056')).toEqual(['-12.056']);
  expect(tokenize('3 * 8.2')).toEqual(['3', '*', '8.2']);
  expect(tokenize('sin(1.2)')).toEqual(['sin', '(', '1.2', ')']);
  expect(tokenize('')).toEqual([]);
  expect(tokenize('  ')).toEqual([]);
});
