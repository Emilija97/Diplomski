import { Action } from "redux";
import { ofType, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { apiGetUser, apiUpdateUserType } from "../../services/data/user-menu.service";
import { NiEpic, RootState } from "../../store/store";
import { LoadUserInit, loadUserSuccess, UpdateUserType, updateUserTypeSuccess, UserMenuActionTypes } from "./actions";

const getUserEpic = (action$: Observable<LoadUserInit>, state$: StateObservable<RootState>)
  : Observable<Action> => {
  return action$.pipe(
    ofType(UserMenuActionTypes.LOAD_USER_INIT),
    switchMap(action => apiGetUser(action.id).pipe(
      map(user => loadUserSuccess(user))
    ))
  );
}

const updateUserTypeEpic = (action$: Observable<UpdateUserType>, state$: StateObservable<RootState>)
  : Observable<Action> => {
  return action$.pipe(
    ofType(UserMenuActionTypes.UPDATE_USER_TYPE),
    switchMap(action => apiUpdateUserType(action.user).pipe(
      map(() => updateUserTypeSuccess(action.user))
    ))
  );
}

export const userMenuEpics: NiEpic[] = [
  getUserEpic, updateUserTypeEpic
]