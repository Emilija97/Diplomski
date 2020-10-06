import { from, Observable } from "rxjs";
import { LoginData } from "../../auth/store";
import { Person } from "../../employee/store/person-state";
import { updateOne } from "./repository.service";


export const AUTH_URL = "http://localhost:5000/users/auth";

export const apiLogin = (email: string, password: string): Observable<LoginData> => {
  return from(fetch(`${AUTH_URL}/login-user`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      "email": email,
      "password": password
    })
  }).then(response => { return response.json(); })
    .then(res => {
      if (res.message === "Invalid email/password.") {
        const data: LoginData = {
          user: {} as any,
          error: res.message
        }
        return data;
      }
      else {
        const data: LoginData = {
          user: res.user,
          error: ""
        }
        return data;
      }
    }));
}

export const apiSignUp = (fullName: string, email: string, password: string, type: number): Observable<string> => {
  return from(fetch(`${AUTH_URL}/register-user`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      "fullName": fullName,
      "email": email,
      "password": password,
      "type": type
    })
  }).then(response => { return response.json(); })
    .then(res => { console.log(res); return res.message }));
}

export const apiChangePassword = (email: string, oldPassword: string, newPassword: string): Observable<string> => {
  return from(fetch(`${AUTH_URL}/change-password`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify({
      "email": email,
      "oldPassword": oldPassword,
      "newPassword": newPassword,
    })
  }).then(response => { return response.json(); })
    .then(res => { console.log(res); return res.message }));
}