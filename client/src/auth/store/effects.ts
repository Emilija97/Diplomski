import { Action } from "redux";
import { ofType } from "redux-observable";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { removeItemFromLocalStorage, setItemToLocalStorage, USER_DATA_KEY } from "../../services/local-storage.service";
import { NiEpic } from "../../store/store";
import { logoutSuccess, UserMenuActionTypes } from "../../user-menu/store";
import { AuthActionTypes, loginFailure, LoginInit, loginSuccess } from "./actions";
import { UserType } from "./auth-state";

export interface UserCredentials {
  email: string,
  password: string,
  id: string,
  type: UserType,
  fullName: string
}

const users: UserCredentials[] = [
  {
    id: "11112",
    email: "bojan@nignite.com",
    password: "password",
    type: 2,
    fullName: "Bojan Pavlovic"
  },
  {
    id: "11117",
    email: "milena@nignite.com",
    password: "password",
    type: 4,
    fullName: "Milena Savic"
  }
]

const loginEpic = (action$: Observable<LoginInit>): Observable<Action> => {
  return action$.pipe(
    ofType<LoginInit>(AuthActionTypes.LOGIN_INIT),
    map(action => {
      const result = users.find(user => user.password === action.password && user.email === action.email);
      if (result != null) {
        setItemToLocalStorage<UserCredentials>(USER_DATA_KEY, result);
        return loginSuccess(result?.id, result?.email, result?.type);
      }
      else {
        return loginFailure();
      }
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


export const authEpics: NiEpic[] = [
  loginEpic, logoutEpic
]