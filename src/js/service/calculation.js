import * as calculationRepository from '../repository/calculation';
import * as pubSub from '../core/pubSub';

let code = calculationRepository.get();
let position = code.length;

export function get() {
  return { code, position };
}

export function add(symbol) {
  const newCode = code.slice(0, position) + symbol + code.slice(position);
  const isFunction = symbol.match(/^\w+\(\)$/);
  const newPosition =
    position + (isFunction ? symbol.length - 1 : symbol.length);

  set(newCode, newPosition);
}

export function remove() {
  if (position === 0) {
    return;
  }

  const newCode = code.slice(0, position - 1) + code.slice(position);

  set(newCode, position - 1);
}

export function clear() {
  set('', 0);
}

export function next() {
  set(code, position + 1);
}

export function previous() {
  set(code, position - 1);
}

export function set(newCode, newPosition) {
  code = newCode;
  position = newPosition;
  calculationRepository.store(code);
  pubSub.publish('calculation.updated');
}