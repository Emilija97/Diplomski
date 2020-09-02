import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { UserType } from "../../auth/store";
import { Person } from "../../employee/store/person-state";
import { User } from "../../people/store";
import { PEOPLE_URL } from "./people.service";
import { addOne, getOne, updateOne } from "./repository.service";

export const PERSON_URL = "http://localhost:5000/people";

export function apiAddPerson(person: Person): Observable<string> {
  const user: User = {
    id: "",
    fullName: person.fullName,
    imageSrc: person.imageSrc,
    position: person.position,
    status: person.status,
    type: UserType.EMPLOYEE
  }
  return addOne<Person>(`${PERSON_URL}`, person).pipe(
    switchMap(id => addOne<User>(`${PEOPLE_URL}`, { ...user, id }).pipe(
      switchMap(() => of(id))
    ))
  );
}

export function apiGetPerson(id: string): Observable<Person> {
  return getOne<Person>(`${PERSON_URL}/${id}`);
}

export function apiUpdatePerson(id: string, person: Person): Observable<Response> {
  const user: User = {
    id: person.id,
    fullName: person.fullName,
    imageSrc: person.imageSrc,
    position: person.position,
    status: person.status,
    type: UserType.EMPLOYEE
  }
  return updateOne<Person>(`${PERSON_URL}/${id}`, person).pipe(
    switchMap(() => updateOne<User>(`${PEOPLE_URL}/${id}`, user))
  );
}
