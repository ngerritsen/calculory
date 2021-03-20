export function generateId(): string {
  return Math.round(Math.random() * 1e16)
    .toString(16)
    .slice(0, 6);
}
