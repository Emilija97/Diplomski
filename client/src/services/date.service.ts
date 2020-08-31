export function generateWeeksForPastMonths(months: number): string[] {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  date.setDate(date.getDate() - date.getDay() + 1);

  const result: string[] = [];
  while (date <= new Date()) {
    result.push(date.toLocaleDateString());
    date.setDate(date.getDate() + 7);
  }

  return result;
}

export function toDashFormat(date: string): string {
  return date.split("/").join("-");
}

export function toBackslashFormat(date: string): string {
  return date.split("-").join("/");
}