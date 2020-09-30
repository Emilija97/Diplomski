import { from, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { UserType } from "../../auth/store";
import { Person } from "../../employee/store/person-state";
import { User } from "../../people/store";
import { PEOPLE_URL } from "./people.service";
import { addOne, getOne, updateOne } from "./repository.service";

export const PERSON_URL = "http://localhost:5000/users";

export function apiAddPerson(person: Person, file: File, cvFile: File): Observable<string> {
  // const user: User = {
  //   id: "",
  //   fullName: person.fullName,
  //   imageSrc: person.imageSrc,
  //   position: person.position,
  //   status: person.status,
  //   type: UserType.EMPLOYEE
  // }
  // console.log("Usao sam u add");
  // return addOne<Person>(`${PERSON_URL}`, person).pipe(
  //   switchMap(id => of(id))
  // );
  const formdata = new FormData();
  formdata.append('image', file);
  formdata.append('cv', cvFile);
  formdata.append('data', JSON.stringify(person));

  return from(fetch(`${PERSON_URL}`, {
    method: "POST",
    body: formdata
  }).then(response => response.json())
    .then(res => {
      console.log(res);
      return res.id;
    }).catch(error => console.log(error)));
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
