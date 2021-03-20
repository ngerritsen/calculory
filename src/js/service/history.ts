import { generateId } from "../utils/id";
import * as historyRepository from "../repository/history";
import * as pubSub from "../core/pubSub";
import { AngularUnit, Calculation, CalculationRecord } from "../types";

let history = historyRepository.getAll();

export function add({ code, mode = AngularUnit.Rad }: Calculation): void {
  updateHistory([
    { id: generateId(), code, timestamp: Date.now(), mode },
    ...history,
  ]);
}

export function remove(id: string): void {
  updateHistory(history.filter((item) => item.id !== id));
}

export function clear(): void {
  updateHistory([]);
}

export function getAll(): CalculationRecord[] {
  return history;
}

export function getLast(): CalculationRecord | undefined {
  return history[0];
}

function updateHistory(newHistory: CalculationRecord[]) {
  history = newHistory;
  pubSub.publish("history.updated");
  historyRepository.store(history);
}
