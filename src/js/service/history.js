import { generateId } from '../utils/id';
import * as historyRepository from '../repository/history';
import * as pubSub from '../core/pubSub';

let history = historyRepository.getAll();

export function add(code) {
  updateHistory([{ id: generateId(), code }, ...history]);
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

function updateHistory(newHistory) {
  history = newHistory;
  pubSub.publish('history.updated');
  historyRepository.store(history);
}
