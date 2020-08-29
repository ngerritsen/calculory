import { generateId } from '../utils';
import * as logRepository from '../repository/log';
import * as pubSub from '../pubSub';

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
  pubSub.publish('logsUpdated');
  logRepository.store(logs);
}
