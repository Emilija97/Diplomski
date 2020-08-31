export interface Order {
  id: string;
  user: string;
  catering: string;
  date: string;
  meals: string[]
}

export enum DayOfWeek {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6
}

export const dayOfWeekMap: Map<DayOfWeek, string> = new Map([
  [DayOfWeek.MONDAY, "Monday"],
  [DayOfWeek.TUESDAY, "Tuesday"],
  [DayOfWeek.WEDNESDAY, "Wednesday"],
  [DayOfWeek.THURSDAY, "Thursday"],
  [DayOfWeek.FRIDAY, "Friday"],
  [DayOfWeek.SATURDAY, "Saturday"],
  [DayOfWeek.SUNDAY, "Sunday"],
])