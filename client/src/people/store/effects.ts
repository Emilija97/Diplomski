import { Action } from "redux";
import { ActionsObservable, ofType, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { apiArchiveUsers, apiDeleteUsers, apiGetUsers, apiGetUsersByName, apiGetUsersByStatus } from "../../services/data/people.service";
import { apiGetUser } from "../../services/data/user-menu.service";
import normalize from "../../store/normalizer";
import { NiEpic, RootState } from "../../store/store";
import { AddUserInit, addUsersSuccess, addUserSuccess, ArchiveUsersInit, archiveUsersSuccess, DeleteUsersInit, deleteUsersSuccess, LoadUsersByNameInit, loadUsersByNameSuccess, loadUsersSuccess, PeopleActionTypes } from './actions';


const loadUsersEpic = (action$: Observable<Action>, state$: StateObservable<RootState>)
  : Observable<Action> => {
  return action$.pipe(
    ofType<Action>(PeopleActionTypes.LOAD_USERS_INIT, PeopleActionTypes.ADD_USERS_REQUEST),
    mergeMap((action: Action) => {
      const { page, limit, selectedTab } = state$.value.people;
      return selectedTab === 0 ?
        apiGetUsers(page, limit).pipe(
          map(users => normalize(users)),
          map(users => action.type === PeopleActionTypes.LOAD_USERS_INIT ?
            loadUsersSuccess(users) : addUsersSuccess(users))) :
        apiGetUsersByStatus(page, limit, selectedTab).pipe(
          map(users => normalize(users)),
          map(users => action.type === PeopleActionTypes.LOAD_USERS_INIT ?
            loadUsersSuccess(users) : addUsersSuccess(users)))
    })
  );
}

const loadUsersByNameEpic = (action$: Observable<LoadUsersByNameInit>): Observable<Action> => {
  return action$.pipe(
    ofType(PeopleActionTypes.LOAD_USERS_BY_NAME_INIT),
    switchMap(action => apiGetUsersByName(action.name).pipe(
      map(users => normalize(users)),
      map(users => loadUsersByNameSuccess(users))
    ))
  );
}

const addUserEpic = (action$: Observable<AddUserInit>): Observable<Action> => {
  return action$.pipe(
    ofType(PeopleActionTypes.ADD_USER_INIT),
    switchMap(action => apiGetUser(action.user).pipe(
      map(user => addUserSuccess(user))
    ))
  );
}

const deleteUsersEpic = (action$: ActionsObservable<DeleteUsersInit>): Observable<Action> => {
  return action$.pipe(
    ofType(PeopleActionTypes.DELETE_USERS_INIT),
    switchMap(action => apiDeleteUsers(action.ids).pipe(
      map(() => deleteUsersSuccess(action.ids))
    ))
  )
}

const archiveUsersEpic = (action$: ActionsObservable<ArchiveUsersInit>): Observable<Action> => {
  return action$.pipe(
    ofType(PeopleActionTypes.ARCHIVE_USERS_INIT),
    switchMap(action => apiArchiveUsers(action.ids).pipe(
      map(() => archiveUsersSuccess(action.ids))
    ))
  )
}

export const peopleEpics: NiEpic[] = [
  loadUsersEpic, loadUsersByNameEpic,
  deleteUsersEpic, archiveUsersEpic,
  addUserEpic
];