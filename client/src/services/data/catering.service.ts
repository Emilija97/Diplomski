import { Observable } from "rxjs";
import { Catering } from "../../food/catering/store/reducer";
import { addOne, getAll, getOne } from "./repository.service";

export const CATERINGS_URL = "http://localhost:4000/caterings";

export function apiLoadCaterings(): Observable<Catering[]> {
  return getAll<Catering>(CATERINGS_URL);
}

export function apiLoadCatering(id: string): Observable<Catering> {
  return getOne<Catering>(`${CATERINGS_URL}/${id}`);
}

export function apiAddCatering(catering: Catering): Observable<Catering> {
  return addOne<Catering>(`${CATERINGS_URL}`, catering);
}