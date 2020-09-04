import { evaluate } from 'mathjs';

export function execute(code = '') {
  if (code.trim() === '') {
    return {
      result: 0,
    };
  }

  try {
    const result = evaluate(code);

    if (typeof result === 'function') {
      return {
        error: new Error('Uncalled function.'),
      };
    }

    return {
      result,
    };
  } catch (error) {
    return {
      error,
    };
  }
}

export function isAllowed(char) {
  return String(char).length === 1;
}
