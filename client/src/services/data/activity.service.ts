import { forkJoin, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Activity } from "../../employee/activities/store/activities-state";
import { Person } from "../../employee/store/person-state";
import { PERSON_URL } from "./person.service";
import { addOne, deleteOne, getAll, updateOne } from "./repository.service";

export const ACTIVITY_URL = "http://localhost:5000/activities";

export function apiAddActivity(activity: Activity, person?: Person): Observable<string> {
  if (person == null) {
    return addOne<Activity>(`${ACTIVITY_URL}`, activity).pipe(
      switchMap(id => of(id))
    );
  }
  else {
    return forkJoin(
      updateOne<Person>(`${PERSON_URL}/${person?.id}`, person),
      addOne<Activity>(`${ACTIVITY_URL}`, activity)
    ).pipe(
      switchMap(([response, activityId]) => of(activityId))
    );
  }
}

export function apiGetActivities(personId: string): Observable<Activity[]> {
  return getAll<Activity>(`${ACTIVITY_URL}?personId=${personId}`);
}

export function apiUpdateActivity(activity: Activity, person?: Person): Observable<Response> {
  if (person == null) {
    return updateOne<Activity>(`${ACTIVITY_URL}/${activity.id}`, activity);
  }
  else {
    return (
      updateOne<Person>(`${PERSON_URL}/${person?.id}`, person),
      updateOne<Activity>(`${ACTIVITY_URL}/${activity.id}`, activity)
    )
  }
}

export function apiDeleteActivity(id: string): Observable<Response> {
  return deleteOne(`${ACTIVITY_URL}/${id}`);
}
