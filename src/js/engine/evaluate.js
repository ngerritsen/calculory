import constants from './constants';
import functions from './functions';

export default function evaluate(expression) {
  switch (expression.type) {
    case 'constant':
      return constants[expression.value.toLowerCase()];
    case 'number':
      return parseFloat(expression.value);
    case 'function':
      return functions[expression.value](evaluate(expression.arg));
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
