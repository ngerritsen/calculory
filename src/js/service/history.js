import { generateId } from '../utils/id';
import * as historyRepository from '../repository/history';
import * as pubSub from '../core/pubSub';
import { RAD } from '../constants/mode';

let history = historyRepository.getAll();

export function add({ code, mode = RAD }) {
  updateHistory([
    { id: generateId(), code, timestamp: Date.now(), mode },
    ...history,
  ]);
}

export function remove(id) {
  updateHistory(history.filter((item) => item.id !== id));
}

export function clear() {
  updateHistory([]);
}

export function getAll() {
  return history;
}

export function getLast() {
  return history[0];
}

function updateHistory(newHistory) {
  history = newHistory;
  pubSub.publish('history.updated');
  historyRepository.store(history);
}
