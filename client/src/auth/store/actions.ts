import { Action } from "redux";
import { UserType } from "./auth-state";

export enum AuthActionTypes {
  LOGIN_INIT = "Auth__LoginInit",
  LOGIN_SUCCESS = "Auth__LoginSuccess",
  LOGIN_FAILURE = "Auth__LoginFailure",
  SIGN_UP_INIT = "Auth__SignUpInit",
  SIGN_UP_SUCCESS = "Auth__SignUpSuccess",
  SIGN_UP_FAILURE = "Auth__SignUpFailure",
  CHANGE_PASSWORD = "Auth__ChangePassword",
  CHANGE_PASSWORD_SUCCESS = "Auth__ChangePasswordSuccess",
  CHANGE_PASSWORD_FAILURE = "Auth__ChangePasswordFailure"
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
  userType: UserType,
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

export interface SignUpInit extends Action {
  type: AuthActionTypes.SIGN_UP_INIT,
  fullName: string,
  email: string,
  password: string,
  userType: UserType
}

export function signUpInit(fullName: string, email: string, password: string, userType: UserType): AuthActions {
  return { type: AuthActionTypes.SIGN_UP_INIT, fullName, email, password, userType }
}

export interface SignUpSuccess extends Action {
  type: AuthActionTypes.SIGN_UP_SUCCESS,
  message: string
}

export function signUpSuccess(message: string): AuthActions {
  return { type: AuthActionTypes.SIGN_UP_SUCCESS, message }
}

export interface SignUpFailure extends Action {
  type: AuthActionTypes.SIGN_UP_FAILURE;
}

export function signUpFailure(): AuthActions {
  return { type: AuthActionTypes.SIGN_UP_FAILURE }
}

export interface ChangePassword extends Action {
  type: AuthActionTypes.CHANGE_PASSWORD,
  email: string,
  oldPassword: string,
  newPassword: string
}

export function changePassword(email: string, oldPassword: string, newPassword: string): AuthActions {
  return { type: AuthActionTypes.CHANGE_PASSWORD, email, oldPassword, newPassword }
}

export interface ChangePasswordSuccess extends Action {
  type: AuthActionTypes.CHANGE_PASSWORD_SUCCESS,
  message: string
}

export function changePasswordSuccess(message: string): AuthActions {
  return { type: AuthActionTypes.CHANGE_PASSWORD_SUCCESS, message }
}

export interface ChangePasswordFailure extends Action {
  type: AuthActionTypes.CHANGE_PASSWORD_FAILURE,
  message: string
}

export function changePasswordFailure(message: string): AuthActions {
  return { type: AuthActionTypes.CHANGE_PASSWORD_FAILURE, message }
}

export type AuthActions =
  LoginInit | LoginSuccess | LoginFailure
  | SignUpInit | SignUpSuccess | SignUpFailure
  | ChangePassword | ChangePasswordSuccess | ChangePasswordFailure;