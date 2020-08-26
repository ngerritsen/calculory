import { generateId } from '../utils';
import * as logRepository from './logRepository';
import * as pubSub from '../pubSub';

let logs = [];

export function add(code) {
  const log = { id: generateId(), code };

  logs = [{ id: generateId(), code }, ...logs];
  logRepository.store(logs);

  pubSub.publish('logAdded', log);
}

export function clear() {
  logs = [];
  logRepository.store(logs);

  pubSub.publish('logsCleared');
}

export function init() {
  logs = logRepository.getAll();

  pubSub.publish('logsUpdated', logs);
}
