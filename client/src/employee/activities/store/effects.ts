import { Action } from "redux";
import { ofType, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { apiAddActivity, apiDeleteActivity, apiGetActivities, apiUpdateActivity } from "../../../services/data/activity.service";
import normalize from "../../../store/normalizer";
import { NiEpic, RootState } from "../../../store/store";
import { ActivityActionTypes, AddActivity, addActivitySuccess, DeleteActivity, deleteActivitySuccess, LoadActivities, loadActivitiesSuccess, UpdateActivity, updateActivitySuccess } from "./actions";

const addActivityEpic = (action$: Observable<AddActivity>, state: StateObservable<RootState>): Observable<Action> => {
  return action$.pipe(
    ofType(ActivityActionTypes.ADD_ACTIVITY),
    switchMap(action => apiAddActivity(action.activity, action.person).pipe(
      map((id) => addActivitySuccess({ ...action.activity, id }, action.person))
    ))
  )
}

const loadActivitiesEpic = (action$: Observable<LoadActivities>, state$: StateObservable<RootState>)
  : Observable<Action> => {
  return action$.pipe(
    ofType(ActivityActionTypes.LOAD_ACTIVITIES),
    switchMap(action => apiGetActivities(action.personId).pipe(
      map(activities => normalize(activities)),
      map(activities => loadActivitiesSuccess(activities))
    ))
  );
}

const updateActivityEpic = (action$: Observable<UpdateActivity>, state$: StateObservable<RootState>)
  : Observable<Action> => {
  return action$.pipe(
    ofType(ActivityActionTypes.UPDATE_ACTIVITY),
    switchMap(action => apiUpdateActivity(action.activity, action.person).pipe(
      map(() => updateActivitySuccess(action.activity, action.person))
    ))
  );
}

const deleteActivityEpic = (action$: Observable<DeleteActivity>, state: StateObservable<RootState>)
  : Observable<Action> => {
  return action$.pipe(
    ofType(ActivityActionTypes.DELETE_ACTIVITY),
    switchMap(action => apiDeleteActivity(action.id).pipe(
      map(() => deleteActivitySuccess(action.id))
    ))
  );
}

export const activitiesEpics: NiEpic[] = [addActivityEpic, loadActivitiesEpic, updateActivityEpic, deleteActivityEpic];