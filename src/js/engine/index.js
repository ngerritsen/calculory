import { evaluate } from 'mathjs';

export function execute(code = '') {
  if (code.trim() === '') {
    return {
      result: 0,
    };
  }

  try {
    let result = evaluate(code);

    if (typeof result === 'function') {
      result = 0;
    }

    return {
      result: evaluate(code),
    };
  } catch (error) {
    console.log(error);
    return {
      error,
    };
  }
}

export function isAllowed(char) {
  return String(char).length === 1;
}
