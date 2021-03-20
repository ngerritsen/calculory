import * as calculationRepository from "../repository/calculation";
import * as historyService from "./history";
import * as pubSub from "../core/pubSub";
import { execute } from "../engine";
import { AngularUnit, CalculationState } from "../types";

const defaultState: CalculationState = {
  code: "",
  position: 0,
  mode: AngularUnit.Rad,
};
let state: CalculationState = calculationRepository.get() || defaultState;

export function get(): CalculationState {
  return state;
}

export function add(symbol: string): void {
  const { code, position } = state;
  const newCode = code.slice(0, position) + symbol + code.slice(position);
  const isFunction = Boolean(symbol.match(/^.+\(\)$/));
  const isAbsolute = symbol === "||";
  const newPosition =
    position + (isFunction || isAbsolute ? symbol.length - 1 : symbol.length);

  set(newCode, newPosition);
}

export function remove(): void {
  const { code, position } = state;

  if (position === 0) {
    return;
  }

  const newCode = code.slice(0, position - 1) + code.slice(position);

  set(newCode, position - 1);
}

export function submit(): void {
  if (!state.code.trim()) {
    return;
  }

  const { error, result } = execute(state);

  if (error) {
    return;
  }

  historyService.add(state);
  set(String(result), String(result).length);
}

export function toggleMode(): void {
  set(
    state.code,
    state.position,
    state.mode === AngularUnit.Rad ? AngularUnit.Deg : AngularUnit.Rad
  );
}

export function setPosition(position: number): void {
  set(state.code, position);
}

export function end(): void {
  set(state.code, state.code.length);
}

export function start(): void {
  set(state.code, 0);
}

export function clear(): void {
  set("", 0);
}

export function next(): void {
  set(state.code, state.position + 1);
}

export function previous(): void {
  set(state.code, state.position - 1);
}

export function set(
  code: string,
  position: number,
  mode = AngularUnit.Rad
): void {
  const limitedPosition = limitPosition(position, code);

  if (
    limitedPosition === state.position &&
    code === state.code &&
    mode === state.mode
  ) {
    return;
  }

  state = {
    mode: mode || state.mode,
    code,
    position: limitedPosition,
  };

  calculationRepository.store(state);

  pubSub.publish("calculation.updated");
}

function limitPosition(position: number, code: string): number {
  return Math.min(Math.max(position, 0), code.length + 1);
}
