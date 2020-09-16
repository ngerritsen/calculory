import calculy from 'calculy';
import * as historyService from '../service/history';

let last = null;

export function execute(code = '') {
  if (last && code === last.code) {
    return last;
  }

  if (code.trim() === '') {
    return createResult(code);
  }

  try {
    const result = calculy.evaluate(code, getPreviousAnswer());
    last = createResult(code, null, result);
  } catch (error) {
    last = createResult(code, error);
  }

  return last;
}

function getPreviousAnswer() {
  const lastItem = historyService.getLast();

  if (!lastItem) {
    return 0;
  }

  return execute(lastItem.code).result;
}

function createResult(code, error = null, result = 0) {
  return { code, error, result };
}

export function isAllowed(char) {
  return String(calculy.tokenize(char)[0]).length === 1;
}
