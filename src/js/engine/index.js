import tokenize from './tokenize';
import parse from './parse';
import evaluate from './evaluate';

export default function execute(code = '') {
  if (code.trim() === '') {
    return {
      result: 0,
    };
  }

  try {
    return {
      result: evaluate(parse(tokenize(code))),
    };
  } catch (error) {
    return {
      error,
    };
  }
}
