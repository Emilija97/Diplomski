import { Action } from "redux";
import { ofType, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { apiGetUser } from "../../services/data/user-menu.service";
import { NiEpic, RootState } from "../../store/store";
import { LoadUserInit, loadUserSuccess, UserMenuActionTypes } from "./actions";

const getUserEpic = (action$: Observable<LoadUserInit>, state$: StateObservable<RootState>)
  : Observable<Action> => {
  return action$.pipe(
    ofType(UserMenuActionTypes.LOAD_USER_INIT),
    switchMap(action => apiGetUser(action.id).pipe(
      map(user => loadUserSuccess(user))
    ))
  );
}

export const userMenuEpics: NiEpic[] = [
  getUserEpic
]