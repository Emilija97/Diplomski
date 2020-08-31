export interface LeaveRequest {
  id: string,
  employeeImageSrc: string,
  employeeFullName: string,
  employeePosition: string,
  employeeId: string,
  durationInDays: string,
  startDate: string,
  endDate: string,
  message: string
  status: LeaveRequestStatus,
  type: LeaveRequestType
}

export enum LeaveRequestStatus {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3
}

export enum LeaveRequestType {
  TIME_OFF = 1,
  SICK_LEAVE = 2
}