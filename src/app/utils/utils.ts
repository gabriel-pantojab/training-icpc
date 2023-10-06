export function controlNumber(n: number): string {
  return n < 10 ? '0' + n : n.toString();
}

export function getCurrentDateFormat() {
  const date = new Date();
  const year = date.getFullYear();
  const month = controlNumber(date.getMonth() + 1);
  const dayOfMonth = controlNumber(date.getDate());
  return `${dayOfMonth}${month}${year}`;
}
