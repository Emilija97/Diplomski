import { Observable } from "rxjs";
import { Person } from "../../employee/store/person-state";
import { User } from "../../people/store";
import { PEOPLE_URL } from "./people.service";
import { getOne, updateOne } from "./repository.service";

export function apiGetUser(id: string): Observable<User> {
  return getOne<User>(`${PEOPLE_URL}/${id}`);
}

export function apiUpdateUserType(person: Person): Observable<Response> {
  return updateOne<Person>(`${PEOPLE_URL}/${person.id}`, person);
}