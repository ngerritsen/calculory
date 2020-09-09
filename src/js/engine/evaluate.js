import constants from './constants';
import functions from './functions';
import factorial from './math/factorial';

export default function evaluate(expression) {
  switch (expression.type) {
    case 'constant':
      return constants[expression.value.toLowerCase()];
    case 'number':
      return parseFloat(expression.value);
    case 'function':
      return functions[expression.value](evaluate(expression.arg));
    case 'negative':
      return evaluate(expression.of) * -1;
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
    case '!':
      return factorial(evaluate(expression.of));
    case '%':
      return evaluate(expression.of) / 100;
  }
}
