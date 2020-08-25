let subscribers = [];

export function publish(event, data) {
  console.log(event, data);

  subscribers
    .filter(sub => sub.event === event)
    .forEach(sub => sub.handler(data));
}

export function subscribe(event, handler) {
  subscribers = [...subscribers, { event, handler }];
}
