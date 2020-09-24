import * as calculationRepository from '../repository/calculation';
import * as historyService from './history';
import * as pubSub from '../core/pubSub';
import { execute } from '../engine';
import { RAD, DEG } from '../constants/mode';

const defaultState = { code: '', position: 0, mode: RAD };

let state = calculationRepository.get() || defaultState;

export function get() {
  return state;
}

export function add(symbol) {
  const { code, position } = state;
  const newCode = code.slice(0, position) + symbol + code.slice(position);
  const isFunction = Boolean(symbol.match(/^.+\(\)$/));
  const isAbsolute = symbol === '||';
  const newPosition =
    position + (isFunction || isAbsolute ? symbol.length - 1 : symbol.length);

  set(newCode, newPosition);
}

export function remove() {
  const { code, position } = state;

  if (position === 0) {
    return;
  }

  const newCode = code.slice(0, position - 1) + code.slice(position);

  set(newCode, position - 1);
}

export function submit() {
  if (!state.code.trim()) {
    return;
  }

  const { error } = execute(state);

  if (error) {
    return;
  }

  historyService.add(state);
  clear();
}

export function toggleMode() {
  set(state.code, state.position, state.mode === RAD ? DEG : RAD);
}

export function setPosition(position) {
  set(state.code, position);
}

export function end() {
  set(state.code, state.code.length);
}

export function start() {
  set(state.code, 0);
}

export function clear() {
  set('', 0);
}

export function next() {
  set(state.code, state.position + 1);
}

export function previous() {
  set(state.code, state.position - 1);
}

export function set(code, position, mode) {
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

  pubSub.publish('calculation.updated');
}

function limitPosition(position, code) {
  return Math.min(Math.max(position, 0), code.length + 1);
}
