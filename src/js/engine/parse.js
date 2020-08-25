import tokenize from './tokenize';
import constants from './constants';

export default function parse(code) {
  const tokens = tokenize(code);

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
    let expression = parsePrimaryExpression();
    let token = peek();

    while (token === '*' || token === '/') {
      consume();

      const rightExpression = parsePrimaryExpression();

      expression = {
        type: token,
        left: expression,
        right: rightExpression,
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
    } else if (token === '-') {
      consume();

      const nextToken = peek();

      if (!isNumber(nextToken)) {
        throw new SyntaxError(`Unexpected token "${nextToken}", expected a number.`)
      }

      consume();

      return {
        type: 'number',
        value: token + nextToken,
      };
    } else if (isConstant(token)) {
      consume();

      return {
        type: 'constant',
        value: token,
      };
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
      `Unexpected token "${token}", expected a number or constant.`
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
