import { CalculationState } from "../types";

export function store(calculation: CalculationState): void {
  localStorage.setItem("calculation", JSON.stringify(calculation));
}

export function get(): CalculationState | null {
  const raw = localStorage.getItem("calculation");

  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}
