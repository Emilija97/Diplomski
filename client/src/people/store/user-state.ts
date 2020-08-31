import { UserType } from "../../auth/store/auth-state";

export enum UserStatus {
  EMPLOYEE = 1,
  CANDIDATES = 2,
  CONTRACTORS = 3,
  ARCHIVED = 4
}

export interface User {
  id: string,
  fullName: string,
  position: string,
  status: UserStatus,
  imageSrc: string,
  type: UserType
}