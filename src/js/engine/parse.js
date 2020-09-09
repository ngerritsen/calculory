import constants from './constants';
import functions from './functions';

export default function parse(tokens) {
  let position = 0;

  const result = parseExpression();

  if (position !== tokens.length) {
    throw new SyntaxError(`Unexpected token "${peek()}".`);
  }

  return result;

  function parseExpression() {
    let expression = parseMultiplicationExpression();
    let token = peek();

    while (token === '+' || token === '-') {
      consume();

      const rightExpression = parseMultiplicationExpression();

      expression = {
        type: token,
        left: expression,
        right: rightExpression,
      };

      token = peek();
    }

    return expression;
  }

  function parseMultiplicationExpression() {
    let expression = parseExponentialExpression();
    let token = peek();

    while (token === '*' || token === '/') {
      consume();

      const rightExpression = parseExponentialExpression();

      expression = {
        type: token,
        left: expression,
        right: rightExpression,
      };

      token = peek();
    }

    return expression;
  }

  function parseExponentialExpression() {
    let expression = parseNegativeExpression();
    let token = peek();

    while (token === '^') {
      consume();

      const rightExpression = parseNegativeExpression();

      expression = {
        type: token,
        left: expression,
        right: rightExpression,
      };

      token = peek();
    }

    return expression;
  }

  function parseNegativeExpression() {
    if (peek() === '-') {
      consume();

      return {
        type: 'negative',
        of: parseFactorialExpression(),
      };
    }

    return parseFactorialExpression();
  }

  function parseFactorialExpression() {
    let expression = parsePrimaryExpression();
    let token = peek();

    while (token === '!') {
      consume();

      expression = {
        type: token,
        of: expression,
      };

      token = peek();
    }

    return expression;
  }

  function parsePrimaryExpression() {
    const token = peek();

    if (isNumber(token)) {
      consume();

      return {
        type: 'number',
        value: token,
      };
    } else if (isConstant(token)) {
      consume();

      return {
        type: 'constant',
        value: token,
      };
    } else if (isFunction(token)) {
      consume();

      if (peek() !== '(') {
        throw new SyntaxError(`Unexpected token ${peek()}, expected "(".`);
      }

      consume();

      const expression = {
        type: 'function',
        value: token,
        arg: parseExpression(),
      };

      if (peek() !== ')') {
        throw new SyntaxError(`Unexpected token ${peek()}, expected ")".`);
      }

      consume();

      return expression;
    } else if (token === '(') {
      consume();

      const expression = parseExpression();

      if (peek() !== ')') {
        throw new SyntaxError(
          `Unexpected token "${token}", expected a closing parenthesis.`
        );
      }

      consume();

      return expression;
    }

    throw new SyntaxError(
      `Unexpected token "${token}", expected a number, parenthesis, function or constant.`
    );
  }

  function consume() {
    position++;
  }

  function peek() {
    return tokens[position];
  }
}

function isNumber(token) {
  return !isNaN(parseFloat(token));
}

function isConstant(token) {
  return Boolean(constants[token.toLowerCase()]);
}

function isFunction(token) {
  return Boolean(functions[token.toLowerCase()]);
}
