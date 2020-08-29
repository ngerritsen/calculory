import * as calculationRepository from '../repository/calculation';
import * as pubSub from '../pubSub';

let code = calculationRepository.get();

export function get() {
  return code;
}

export function set(newCode) {
  code = newCode;
  calculationRepository.store(code);
  pubSub.publish('calculationUpdated');
}
