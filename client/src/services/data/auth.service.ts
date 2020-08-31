import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../../people/store";
import { PEOPLE_URL } from "./people.service";
import { getAll } from "./repository.service";

export const apiLogin = (email: string, password: string): Observable<User> => {
  return getAll<User>(`${PEOPLE_URL}?email=${email}&password=${password}`).pipe(
    map(users => users[0])
  );
}