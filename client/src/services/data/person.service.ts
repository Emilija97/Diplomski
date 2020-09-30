import { from, Observable } from "rxjs";
import { Person } from "../../employee/store/person-state";
import { getOne } from "./repository.service";

export const PERSON_URL = "http://localhost:5000/users";

export function apiAddPerson(person: Person, file: File, cvFile: File): Observable<string> {
  const formdata = new FormData();
  formdata.append('image', file);
  formdata.append('cv', cvFile);
  formdata.append('data', JSON.stringify(person));

  return from(fetch(`${PERSON_URL}`, {
    method: "POST",
    body: formdata
  }).then(response => {
    // if (response.ok)
    return response.json();
    // else
    //   throw new Error("Something went wrong.");
  })
    .then(res => {
      console.log(res);
      if (res.error === "User already exists.") {
        console.log("usao sam u res message");
        return res.error;
      }
      else
        return res.id;
    }));
}

export function apiGetPerson(id: string): Observable<Person> {
  return getOne<Person>(`${PERSON_URL}/${id}`);
}

export function apiUpdatePerson(id: string, person: Person, file: File, cvFile: File): Observable<Response> {

  console.log(cvFile);
  const formdata = new FormData();
  formdata.append('image', file);
  formdata.append('cv', cvFile);
  formdata.append('data', JSON.stringify(person));

  return from(fetch(`${PERSON_URL}/upload/${id}`, {
    method: "POST",
    body: formdata
  }));
}
