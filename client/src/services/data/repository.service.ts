import { from, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { v4 as uuid } from "uuid";

interface Entity {
  id: string
}

function fetchApi<T>(method: string, url: string, data?: T): Observable<Response> {
  return from(fetch(url, {
    headers: { 'Content-Type': "application/json" },
    method: method,
    body: JSON.stringify(data)
  }));
}

export function addOne<T extends Entity>(url: string, data: T): Observable<string> {
  if (data.id === "") data.id = uuid();

  return fetchApi('POST', url, data).pipe(
    switchMap(() => of(data.id))
  );
}

export function getOne<T>(url: string): Observable<T> {
  return fetchApi<T>('GET', url).pipe(
    switchMap(response => from(response.json() as Promise<T>))
  )
}

export function getAll<T>(url: string): Observable<T[]> {
  return fetchApi('GET', url).pipe(
    switchMap(response => from(response.json() as Promise<T[]>))
  )
}

export function deleteOne(url: string): Observable<Response> {
  return fetchApi('DELETE', url);
}

export function deleteMany(url: string, ids: string[]): Observable<Response>[] {
  return ids.map(id => fetchApi('DELETE', `${url}/${id}`));
}

export function updateOne<T>(url: string, data: T): Observable<Response> {
  return fetchApi('PUT', url, data);
}