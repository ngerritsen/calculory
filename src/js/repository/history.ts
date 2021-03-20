import { CalculationRecord } from "../types";

export function store(history: CalculationRecord[]): void {
  localStorage.setItem("history", JSON.stringify(history));
}

export function getAll(): CalculationRecord[] {
  const rawLogs = localStorage.getItem("history");

  try {
    return rawLogs ? JSON.parse(rawLogs) : [];
  } catch (e) {
    return [];
  }
}
