import { generateId } from '../utils/id';
import * as logRepository from '../repository/log';
import * as pubSub from '../core/pubSub';

let logs = logRepository.getAll();

export function add(code) {
  updateLogs([{ id: generateId(), code }, ...logs]);
}

export function clear() {
  updateLogs([]);
}

export function getAll() {
  return logs;
}

function updateLogs(newLogs) {
  logs = newLogs;
  pubSub.publish('logs.updated');
  logRepository.store(logs);
}
