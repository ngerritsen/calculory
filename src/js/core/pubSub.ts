import { Subscriber } from "../types";

let subscribers: Subscriber[] = [];

export function publish(event: string, data?: unknown): void {
  subscribers
    .filter((sub) => sub.event === event)
    .forEach((sub) => sub.handler(data));
}

export function subscribe(event: string, handler: (data) => void): void {
  subscribers = [...subscribers, { event, handler }];
}
