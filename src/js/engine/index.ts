import calculy from "calculy";
import * as historyService from "../service/history";
import { Calculation, AngularUnit, CalculationResult } from "../types";

let last: CalculationResult | null = null;

export function execute({
  code = "",
  mode = AngularUnit.Rad,
}: Calculation): CalculationResult {
  if (last && code === last.code && mode === last.mode) {
    return last;
  }

  if (code.trim() === "") {
    return createResult(code);
  }

  try {
    const result = calculy.evaluate(code, {
      deg: mode === AngularUnit.Deg,
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

function getPreviousAnswer(): number {
  const lastItem = historyService.getLast();

  if (!lastItem) {
    return 0;
  }

  return execute(lastItem).result;
}

function createResult(
  code: string,
  error: Error | null = null,
  result = 0,
  mode: AngularUnit = AngularUnit.Rad
): CalculationResult {
  return { code, error, result, mode };
}

export function isAllowed(char: string): boolean {
  return String(calculy.tokenize(char)[0]).length === 1;
}
