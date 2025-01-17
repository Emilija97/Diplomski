import { User } from "../../people/store";

export enum UserType {
  GUEST = 1,
  EMPLOYEE = 2,
  HR = 3,
  ADMIN = 4
}

export interface AuthState {
  loggedUserId: string,
  loggedUserType: UserType,
  loggedUserName: string,
  error: boolean,
  message: string
}

export interface LoginData {
  user: User,
  token?: string,
  error: string
}