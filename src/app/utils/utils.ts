export function controlNumber(n: number): string {
  return n < 10 ? '0' + n : n.toString();
}

export function currentDateCompact() {
  const date = new Date();
  const year = date.getFullYear();
  const month = controlNumber(date.getMonth() + 1);
  const dayOfMonth = controlNumber(date.getDate());
  return `${year}${month}${dayOfMonth}`;
}

export function formatDateString(date: string): string {
  const dayOfMonth = date.slice(6, 8);
  const month = date.slice(4, 6);
  const year = date.slice(0, date.length - 4);
  return `${dayOfMonth}/${month}/${year}`;
}
