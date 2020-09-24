import calculy from 'calculy';
import { DEG, RAD } from '../constants/mode';
import * as historyService from '../service/history';

let last = null;

export function execute({ code = '', mode = RAD }) {
  if (last && code === last.code && mode === last.mode) {
    return last;
  }

  if (code.trim() === '') {
    return createResult(code);
  }

  try {
    const result = calculy.evaluate(code, {
      deg: mode === DEG,
      constants: {
        ans: getPreviousAnswer(),
      },
    });
    last = createResult(code, null, result, mode);
  } catch (error) {
    last = createResult(code, error, undefined, mode);
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

function createResult(code, error = null, result = 0, mode = RAD) {
  return { code, error, result, mode };
}

export function isAllowed(char) {
  return String(calculy.tokenize(char)[0]).length === 1;
}
