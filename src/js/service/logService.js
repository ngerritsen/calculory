import { generateId } from '../utils';
import * as logRepository from './logRepository';
import * as pubSub from '../pubSub';

let logs = [];

export function add(code) {
  updateLogs([{ id: generateId(), code }, ...logs]);
}

export function clear() {
  updateLogs([]);
}

export function getAll() {
  return logs;
}

export function init() {
  updateLogs(logRepository.getAll());
}

function updateLogs(newLogs) {
  logs = newLogs;
  pubSub.publish('logsUpdated');
  logRepository.store(logs);
}
