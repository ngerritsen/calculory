import { generateId } from './utils';
import * as pubSub from './pubSub';

const logs = [];

export function add(code) {
  const log = { id: generateId(), code };

  logs.push({ id: generateId(), code });

  pubSub.publish('logAdded', log);
}
