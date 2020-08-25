import parse from '../parse';

test('Parses tokens into AST', () => {
  expect(parse('1 * 2')).toEqual({
    type: '*',
    left: {
      type: 'number',
      value: '1',
    },
    right: {
      type: 'number',
      value: '2',
    },
  });

  expect(parse('1 / 2.5 * 1.25')).toEqual({
    type: '*',
    left: {
      type: '/',
      left: {
        type: 'number',
        value: '1',
      },
      right: {
        type: 'number',
        value: '2.5',
      },
    },
    right: {
      type: 'number',
      value: '1.25',
    },
  });

  expect(parse('1 + 2')).toEqual({
    type: '+',
    left: {
      type: 'number',
      value: '1',
    },
    right: {
      type: 'number',
      value: '2',
    },
  });

  expect(parse('(1 + 2) * 3')).toEqual({
    type: '*',
    left: {
      type: '+',
      left: {
        type: 'number',
        value: '1',
      },
      right: {
        type: 'number',
        value: '2',
      },
    },
    right: {
      type: 'number',
      value: '3',
    },
  });

  expect(parse('2 * pi')).toEqual({
    type: '*',
    left: {
      type: 'number',
      value: '2',
    },
    right: {
      type: 'constant',
      value: 'pi',
    },
  });

  expect(parse('1 + 2 * 3')).toEqual({
    type: '+',
    left: {
      type: 'number',
      value: '1',
    },
    right: {
      type: '*',
      left: {
        type: 'number',
        value: '2',
      },
      right: {
        type: 'number',
        value: '3',
      },
    },
  });

  expect(() => parse('1 2')).toThrow(new SyntaxError('Unexpected token "2".'));
  expect(() => parse('1 + +')).toThrow(
    new SyntaxError('Unexpected token "+", expected a number or constant.')
  );
});
