import { Action } from "redux";
import { ofType, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { apiAddPerson, apiGetPerson, apiUpdatePerson } from "../../services/data/person.service";
import { NiEpic, RootState } from "../../store/store";
import { AddNewPerson, addNewPersonSuccess, GetPerson, getPersonSuccess, PersonsActionTypes, UpdatePerson, updatePersonSuccess } from "./actions";

const addPersonEpic = (action$: Observable<AddNewPerson>, state: StateObservable<RootState>): Observable<Action> => {
  return action$.pipe(
    ofType(PersonsActionTypes.ADD_NEW_PERSON),
    switchMap(action => apiAddPerson(action.person).pipe(
      map(id => addNewPersonSuccess({ ...action.person, id: id }))
    ))
  )
}

const getPersonEpic = (
  action$: Observable<GetPerson>,
  state: StateObservable<RootState>
): Observable<Action> => {
  return action$.pipe(
    ofType(PersonsActionTypes.GET_PERSON),
    switchMap(action =>
      apiGetPerson(action.id).pipe(map(person => getPersonSuccess(person)))
    )
  );
};

const updatePersonEpic = (action$: Observable<UpdatePerson>, state: StateObservable<RootState>): Observable<Action> => {
  return action$.pipe(
    ofType(PersonsActionTypes.UPDATE_PERSON),
    switchMap(action => apiUpdatePerson(action.id, action.person).pipe(
      map(() => updatePersonSuccess(action.person))
    ))
  )
}

export const personsEpics: NiEpic[] = [addPersonEpic, getPersonEpic, updatePersonEpic];