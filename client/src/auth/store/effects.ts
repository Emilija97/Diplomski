import { Action } from "redux";
import { ofType } from "redux-observable";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { User } from "../../people/store";
import { apiChangePassword, apiLogin, apiSignUp } from "../../services/data/auth.service";
import { removeItemFromLocalStorage, setItemToLocalStorage, USER_DATA_KEY } from "../../services/local-storage.service";
import { NiEpic } from "../../store/store";
import { logoutSuccess, UserMenuActionTypes } from "../../user-menu/store";
import { AuthActionTypes, ChangePassword, changePasswordFailure, changePasswordSuccess, loginFailure, LoginInit, loginSuccess, signUpFailure, SignUpInit, signUpSuccess } from "./actions";
import { UserType } from "./auth-state";

const loginEpic = (action$: Observable<LoginInit>): Observable<Action> => {
  return action$.pipe(
    ofType<LoginInit>(AuthActionTypes.LOGIN_INIT),
    switchMap(action => {
      return apiLogin(action.email, action.password).pipe(
        map(response => {
          if (response.error === "Invalid email/password.")
            return loginFailure();
          else {
            if (response.user.type !== UserType.GUEST)
              setItemToLocalStorage<User>(USER_DATA_KEY, response.user);
            return loginSuccess(response.user.id, response.user.fullName, response.user.type);
          }
        })
      )
    })
  )
}

const logoutEpic = (action$: Observable<Action>): Observable<Action> => {
  return action$.pipe(
    ofType(UserMenuActionTypes.LOGOUT_INIT),
    map(() => {
      removeItemFromLocalStorage(USER_DATA_KEY);
      return logoutSuccess();
    })
  )
}

const signUpEpic = (action$: Observable<SignUpInit>): Observable<Action> => {
  return action$.pipe(
    ofType<SignUpInit>(AuthActionTypes.SIGN_UP_INIT),
    switchMap(action => {
      console.log(action);
      return apiSignUp(action.fullName, action.email, action.password, action.userType).pipe(
        map(response => {
          console.log(response);
          if (response === "User already exists.")
            return signUpFailure();
          else {
            return signUpSuccess(response);
          }
        })
      )
    })
  )
}

const changePasswordEpic = (action$: Observable<ChangePassword>): Observable<Action> => {
  return action$.pipe(
    ofType<ChangePassword>(AuthActionTypes.CHANGE_PASSWORD),
    switchMap(action => {
      console.log(action);
      return apiChangePassword(action.email, action.oldPassword, action.newPassword).pipe(
        map(response => {
          console.log(response);
          if (response === 'Password successfully changed')
            return changePasswordSuccess(response);

          else {
            return changePasswordFailure(response);
          }
        })
      )
    })
  )
}


export const authEpics: NiEpic[] = [
  loginEpic, logoutEpic, signUpEpic, changePasswordEpic
]