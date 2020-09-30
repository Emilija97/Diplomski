import { forkJoin, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { User, UserStatus } from "../../people/store/user-state";
import { deleteMany, getAll, getOne, updateOne } from "./repository.service";

export const PEOPLE_URL = "http://localhost:5000/users";

export function apiGetUsers(page: number, limit: number): Observable<User[]> {
  return getAll<User>(`${PEOPLE_URL}?_page=${page}&_limit=${limit}`);
}

export function apiGetUsersByStatus(page: number, limit: number, status: UserStatus)
  : Observable<User[]> {
  return getAll<User>(`${PEOPLE_URL}?_page=${page}&_limit=${limit}`);
}

export function apiGetUsersByName(fullName: string)
  : Observable<User[]> {
  return getAll<User>(`${PEOPLE_URL}/name/${fullName}`);
}

export function apiDeleteUsers(ids: string[]): Observable<Response[]> {
  return forkJoin(deleteMany(`${PEOPLE_URL}`, ids));
}

export function apiArchiveUsers(ids: string[]): Observable<Response[]> {
  return forkJoin(ids.map(id => apiArchiveUser(id)));
}

function apiArchiveUser(id: string): Observable<Response> {
  return getOne<User>(`${PEOPLE_URL}/${id}`).pipe(
    switchMap(value => {
      console.log(value);
      value.status = UserStatus.ARCHIVED;
      return updateOne<User>(`${PEOPLE_URL}/${id}`, value);
    })
  )
}