import { Observable } from "rxjs";
import { User } from "../../people/store";
import { PEOPLE_URL } from "./people.service";
import { getOne } from "./repository.service";

export function apiGetUser(id: string): Observable<User> {
  return getOne<User>(`${PEOPLE_URL}/${id}`);
}