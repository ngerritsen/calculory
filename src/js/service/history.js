import { generateId } from '../utils/id';
import * as historyRepository from '../repository/history';
import * as pubSub from '../core/pubSub';

let history = historyRepository.getAll();

export function add(code) {
  updateLogs([{ id: generateId(), code }, ...history]);
}

export function clear() {
  updateLogs([]);
}

export function getAll() {
  return history;
}

function updateLogs(newHistory) {
  history = newHistory;
  pubSub.publish('history.updated');
  historyRepository.store(history);
}
