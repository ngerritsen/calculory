export interface Calculation {
  code: string;
  mode: AngularUnit;
}

export interface CalculationState extends Calculation {
  position: number;
}

export interface CalculationRecord extends Calculation {
  id: string;
  timestamp: number;
}

export interface CalculationResult extends Calculation {
  error: Error | null;
  result: number;
}

export type Component = (element: Element) => void;
export type EventHandler = (event: Event) => void;
export type ClipboardData = {
  getData: (type: string) => string;
};

export type Subscriber = {
  event: string;
  handler: (data) => void;
};

export enum AngularUnit {
  Rad = "RAD",
  Deg = "DEG",
}
