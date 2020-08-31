import { Action } from "redux";
import { User } from "../../people/store";

export enum UserMenuActionTypes {
  LOAD_USER_INIT = "UserMenu__LoadUserInit",
  LOAD_USER_SUCCESS = "UserMenu__LoadUserSuccess",
  LOGOUT_INIT = "UserMenu__LogoutInit",
  LOGOUT_SUCCESS = "UserMenu__LogoutSuccess"
}

export interface LoadUserInit extends Action {
  type: UserMenuActionTypes.LOAD_USER_INIT,
  id: string
}

export function loadUserInit(id: string): UserMenuActions {
  return { type: UserMenuActionTypes.LOAD_USER_INIT, id }
}

export interface LoadUserSuccess extends Action {
  type: UserMenuActionTypes.LOAD_USER_SUCCESS,
  user: User
}

export function loadUserSuccess(user: User): UserMenuActions {
  return { type: UserMenuActionTypes.LOAD_USER_SUCCESS, user }
}

export interface LogoutInit extends Action {
  type: UserMenuActionTypes.LOGOUT_INIT;
}

export function logoutInit(): Action {
  return { type: UserMenuActionTypes.LOGOUT_INIT }
}

export interface LogoutSuccess extends Action {
  type: UserMenuActionTypes.LOGOUT_SUCCESS;
}

export function logoutSuccess(): Action {
  return { type: UserMenuActionTypes.LOGOUT_SUCCESS }
}

export type UserMenuActions =
  LoadUserInit | LoadUserSuccess |
  LogoutInit | LogoutSuccess;

