import { Action } from "redux";
import { Person } from "./person-state";


export enum PersonsActionTypes {
  GET_PERSON = "Persons_GetPerson",
  GET_PERSON_SUCCESS = "Persons_GetPersonSuccess",
  UPDATE_PERSON = "Persons_UpdatePerson",
  UPDATE_PERSON_SUCCESS = "Persons_UpdatePersonSuccess",
  CHANGE_DIALOG_STATE = "Persons_ChangeDialogState"
}

export interface GetPerson extends Action {
  type: PersonsActionTypes.GET_PERSON;
  id: string;
}

export function getPerson(id: string): PersonsActions {
  return { type: PersonsActionTypes.GET_PERSON, id };
}

export interface GetPersonSuccess extends Action {
  type: PersonsActionTypes.GET_PERSON_SUCCESS;
  person: Person;
}

export function getPersonSuccess(person: Person): PersonsActions {
  return { type: PersonsActionTypes.GET_PERSON_SUCCESS, person };
}

export interface UpdatePerson extends Action {
  type: PersonsActionTypes.UPDATE_PERSON;
  id: string;
  person: Person;
  file: any;
  cvFile: any;
}

export function updatePerson(id: string, person: Person, file: any, cvFile: any): PersonsActions {
  return { type: PersonsActionTypes.UPDATE_PERSON, id, person, file, cvFile }
}

export interface UpdatePersonSuccess extends Action {
  type: PersonsActionTypes.UPDATE_PERSON_SUCCESS;
  person: Person;
}

export function updatePersonSuccess(person: Person): PersonsActions {
  return { type: PersonsActionTypes.UPDATE_PERSON_SUCCESS, person };
}

export interface ChangeDialogState extends Action {
  type: PersonsActionTypes.CHANGE_DIALOG_STATE;
}

export function changeDialogState(): ChangeDialogState {
  return { type: PersonsActionTypes.CHANGE_DIALOG_STATE }
}

export type PersonsActions =
  | GetPerson | GetPersonSuccess
  | UpdatePerson | UpdatePersonSuccess | ChangeDialogState;