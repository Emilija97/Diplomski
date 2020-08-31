export interface Activity {
  id: string;
  personId: string;
  date: string;
  endDate?: string;
  comment?: string;
  salary?: number;
  bonus?: number;
  status?: ActivityStatus;
  name: ActivityName;
}

export enum ActivityStatus {
  PENDING = 0,
  PASSED = 1,
  NOT_PASSED = 2
}

export const activityStatusMap: Map<ActivityStatus, string> = new Map([
  [ActivityStatus.PENDING, ""],
  [ActivityStatus.PASSED, "passed"],
  [ActivityStatus.NOT_PASSED, "notPassed"],
])

export enum ActivityName {
  CONTACT = 0,
  INTERVIEW = 1,
  INTERNSHIP = 2,
  TEST = 3,
  HIRE = 4,
  BONUS = 5,
  SALARY = 6
}

export const activityNameMap: Map<ActivityName, string> = new Map([
  [ActivityName.CONTACT, "Contact"],
  [ActivityName.INTERVIEW, "Interview"],
  [ActivityName.INTERNSHIP, "Internship"],
  [ActivityName.TEST, "Test"],
  [ActivityName.HIRE, "Hire"],
  [ActivityName.BONUS, "Bonus"],
  [ActivityName.SALARY, "Salary"],
])