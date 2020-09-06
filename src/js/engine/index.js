import tokenize from './tokenize';
import parse from './parse';
import evaluate from './evaluate';

let last = null;

export function execute(code = '') {
  if (last && code === last.code) {
    return last;
  }

  if (code.trim() === '') {
    return createResult(code);
  }

  try {
    const result = evaluate(parse(tokenize(code)));
    last = createResult(code, null, result);
  } catch (error) {
    last = createResult(code, error);
  }

  return last;
}

function createResult(code, error = null, result = 0) {
  return { code, error, result };
}

export function isAllowed(char) {
  return String(tokenize(char)[0]).length === 1;
}
