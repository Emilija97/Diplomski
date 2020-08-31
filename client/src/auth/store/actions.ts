import { Action } from "redux";
import { UserType } from "./auth-state";

export enum AuthActionTypes {
  LOGIN_INIT = "Auth__LoginInit",
  LOGIN_SUCCESS = "Auth__LoginSuccess",
  LOGIN_FAILURE = "Auth__LoginFailure",
  SIGN_UP_INIT = "Auth__SignUpInit",
  SIGN_UP_SUCCESS = "Auth__SignUpSuccess"
}

export interface LoginInit extends Action {
  type: AuthActionTypes.LOGIN_INIT,
  email: string,
  password: string
}

export function loginInit(email: string, password: string): AuthActions {
  return { type: AuthActionTypes.LOGIN_INIT, email, password }
}

export interface LoginSuccess extends Action {
  type: AuthActionTypes.LOGIN_SUCCESS,
  id: string,
  fullName: string,
  userType: UserType
}

export function loginSuccess(id: string, fullName: string, userType: UserType): AuthActions {
  return { type: AuthActionTypes.LOGIN_SUCCESS, id, fullName, userType }
}

export interface LoginFailure extends Action {
  type: AuthActionTypes.LOGIN_FAILURE;
}

export function loginFailure(): AuthActions {
  return { type: AuthActionTypes.LOGIN_FAILURE }
}

export type AuthActions =
  LoginInit | LoginSuccess | LoginFailure;