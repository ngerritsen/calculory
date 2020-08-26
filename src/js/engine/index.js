import parse from './parse';
import constants from './constants';

export default function execute(code) {
  const expression = parse(code);

  return evaluate(expression);
}

function evaluate(expression) {
  switch (expression.type) {
    case 'constant':
      return constants[expression.value.toLowerCase()];
    case 'number':
      return parseFloat(expression.value);
    case '^':
      return Math.pow(evaluate(expression.left), evaluate(expression.right));
    case '*':
      return evaluate(expression.left) * evaluate(expression.right);
    case '/':
      return evaluate(expression.left) / evaluate(expression.right);
    case '+':
      return evaluate(expression.left) + evaluate(expression.right);
    case '-':
      return evaluate(expression.left) - evaluate(expression.right);
  }
}
