import { Action } from "redux";
import { ofType, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { AddNewPerson, addNewPersonFailure, addNewPersonSuccess, PeopleActionTypes } from "../../people/store";
import { apiAddPerson, apiGetPerson, apiUpdatePerson } from "../../services/data/person.service";
import { NiEpic, RootState } from "../../store/store";
import { GetPerson, getPersonSuccess, PersonsActionTypes, UpdatePerson, updatePersonSuccess } from "./actions";

const addPersonEpic = (action$: Observable<AddNewPerson>, state: StateObservable<RootState>): Observable<Action> => {
  return action$.pipe(
    ofType(PeopleActionTypes.ADD_NEW_PERSON),
    switchMap(action => {
      return apiAddPerson(action.person, action.file, action.cvFile).pipe(
        map(response => {
          if (response === "User already exists.")
            return addNewPersonFailure(response);
          else
            return addNewPersonSuccess({ ...action.person, id: response })
        })
      )
    })
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
    switchMap(action => apiUpdatePerson(action.id, action.person, action.file, action.cvFile).pipe(
      map(() => updatePersonSuccess(action.person))
    ))
  )
}

export const personsEpics: NiEpic[] = [addPersonEpic, getPersonEpic, updatePersonEpic];