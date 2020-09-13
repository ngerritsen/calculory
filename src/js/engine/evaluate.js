import { previous } from '../service/calculation';
import constants from './constants';
import functions from './functions';
import factorial from './math/factorial';

export default function evaluate(expression, getPreviousAnswer) {
  const evalExpr = expression => evaluate(expression, getPreviousAnswer);

  switch (expression.type) {
    case 'constant':
      return constants[expression.value.toLowerCase()];
    case 'number':
      return parseFloat(expression.value);
    case 'function':
      return functions[expression.value](...expression.args.map(evalExpr));
    case 'negative':
      return evalExpr(expression.of) * -1;
    case 'absolute':
      return Math.abs(evalExpr(expression.of));
    case 'group':
      return evalExpr(expression.expression);
    case 'ans':
      return getPreviousAnswer();
    case '^':
      return Math.pow(evalExpr(expression.left), evalExpr(expression.right));
    case '*':
      return evalExpr(expression.left) * evalExpr(expression.right);
    case '/':
      return evalExpr(expression.left) / evalExpr(expression.right);
    case '+':
      return evalExpr(expression.left) + evalExpr(expression.right);
    case '-':
      return evalExpr(expression.left) - evalExpr(expression.right);
    case '!':
      return factorial(evalExpr(expression.of));
    case '%':
      return evalExpr(expression.of) / 100;
    default:
      throw new Error(`Unknown expression ${expression.type}`);
  }
}
