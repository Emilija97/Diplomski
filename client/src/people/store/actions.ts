import { Action } from "redux";
import { Person } from "../../employee/store/person-state";
import { NormalizedObjects } from "../../store/normalized-objects";
import { User, UserStatus } from "./user-state";

export enum PeopleActionTypes {
  LOAD_USERS_INIT = "People__LoadUsersInit",
  LOAD_USERS_SUCCESS = "People__LoadUsersSuccess",
  LOAD_USERS_BY_NAME_INIT = "People__LoadUsersByNameInit",
  LOAD_USERS_BY_NAME_SUCCESS = "People__LoadUsersByNameSuccess",
  ADD_USERS_REQUEST = "People__AddUsersInit",
  ADD_USERS_SUCCESS = "People__AddUsersSuccess",
  ADD_USER_INIT = "People__AddUserInit",
  ADD_USER_SUCCESS = "People__AddUserSuccess",
  DELETE_USERS_INIT = "People__DeleteUsersInit",
  DELETE_USERS_SUCCESS = "People__DeleteUsersSuccess",
  ARCHIVE_USERS_INIT = "People__ArchiveUsersInit",
  ARCHIVE_USERS_SUCCESS = "People__ArchiveUsersSuccess",
  INCREMENT_PAGE = "People__IncrementPage",
  RESET_PAGE = "People__ResetPage",
  CLEAR = "People__Clear",
  SET_SELECTED_TAB = "People__SetSelectedTab",
  ADD_NEW_PERSON = "Persons__AddNewPerson",
  ADD_NEW_PERSON_SUCCESS = "Persons__AddNewPersonSuccess",
  ADD_NEW_PERSON_FAILURE = "Persons__AddNewPersonFailure",
  GET_HIRED_USERS = "People__GetHiredUsers",
  GET_HIRED_USERS_SUCCESS = "People__GetHiredUsersSuccess",
}

export function loadUsersInit(): Action {
  return { type: PeopleActionTypes.LOAD_USERS_INIT }
}

export interface LoadUsersSuccess extends Action {
  type: PeopleActionTypes.LOAD_USERS_SUCCESS;
  users: NormalizedObjects<User>;
}

export function loadUsersSuccess(users: NormalizedObjects<User>): PeopleActions {
  return { type: PeopleActionTypes.LOAD_USERS_SUCCESS, users };
}

export interface LoadUsersByNameInit extends Action {
  type: PeopleActionTypes.LOAD_USERS_BY_NAME_INIT
  name: string
}

export function loadUsersByNameInit(name: string): PeopleActions {
  return { type: PeopleActionTypes.LOAD_USERS_BY_NAME_INIT, name }
}

export interface LoadUsersByNameSuccess extends Action {
  type: PeopleActionTypes.LOAD_USERS_BY_NAME_SUCCESS
  users: NormalizedObjects<User>;
}

export function loadUsersByNameSuccess(users: NormalizedObjects<User>): PeopleActions {
  return { type: PeopleActionTypes.LOAD_USERS_BY_NAME_SUCCESS, users }
}

export function addUsersInit(): Action {
  return { type: PeopleActionTypes.ADD_USERS_REQUEST }
}

export interface AddUsersSuccess extends Action {
  type: PeopleActionTypes.ADD_USERS_SUCCESS;
  users: NormalizedObjects<User>;
}

export function addUsersSuccess(users: NormalizedObjects<User>): PeopleActions {
  return { type: PeopleActionTypes.ADD_USERS_SUCCESS, users };
}

export interface AddUserInit {
  type: PeopleActionTypes.ADD_USER_INIT,
  user: string
}

export function addUserInit(user: string): PeopleActions {
  return { type: PeopleActionTypes.ADD_USER_INIT, user }
}

export interface AddUserSuccess {
  type: PeopleActionTypes.ADD_USER_SUCCESS,
  user: User
}

export function addUserSuccess(user: User): PeopleActions {
  return { type: PeopleActionTypes.ADD_USER_SUCCESS, user }
}

export interface DeleteUsersInit extends Action {
  type: PeopleActionTypes.DELETE_USERS_INIT;
  ids: string[];
}

export function deleteUsersInit(ids: string[]): PeopleActions {
  return { type: PeopleActionTypes.DELETE_USERS_INIT, ids };
}

export interface DeleteUsersSuccess extends Action {
  type: PeopleActionTypes.DELETE_USERS_SUCCESS;
  ids: string[];
}

export function deleteUsersSuccess(ids: string[]): PeopleActions {
  return { type: PeopleActionTypes.DELETE_USERS_SUCCESS, ids };
}

export interface ArchiveUsersInit extends Action {
  type: PeopleActionTypes.ARCHIVE_USERS_INIT;
  ids: string[];
}

export function archiveUsersInit(ids: string[]): PeopleActions {
  return { type: PeopleActionTypes.ARCHIVE_USERS_INIT, ids };
}

export interface ArchiveUsersSuccess extends Action {
  type: PeopleActionTypes.ARCHIVE_USERS_SUCCESS;
  ids: string[];
}

export function archiveUsersSuccess(ids: string[]): PeopleActions {
  return { type: PeopleActionTypes.ARCHIVE_USERS_SUCCESS, ids };
}

export interface IncrementPage extends Action {
  type: PeopleActionTypes.INCREMENT_PAGE;
}

export function incrementPage(): IncrementPage {
  return { type: PeopleActionTypes.INCREMENT_PAGE }
}

export interface ResetPage extends Action {
  type: PeopleActionTypes.RESET_PAGE;
}

export function resetPage(): PeopleActions {
  return { type: PeopleActionTypes.RESET_PAGE }
}

export interface Clear extends Action {
  type: PeopleActionTypes.CLEAR;
}

export function clear(): PeopleActions {
  return { type: PeopleActionTypes.CLEAR }
}

export interface SetSelectedTab extends Action {
  type: PeopleActionTypes.SET_SELECTED_TAB;
  selectedTab: UserStatus
}

export function setSelectedTab(selectedTab: UserStatus): PeopleActions {
  return { type: PeopleActionTypes.SET_SELECTED_TAB, selectedTab }
}

export interface AddNewPerson extends Action {
  type: PeopleActionTypes.ADD_NEW_PERSON;
  person: Person;
  file: any;
  cvFile: any
}

export function addNewPerson(person: Person, file: any, cvFile: any): PeopleActions {
  return { type: PeopleActionTypes.ADD_NEW_PERSON, person, file, cvFile };
}

export interface AddNewPersonSuccess extends Action {
  type: PeopleActionTypes.ADD_NEW_PERSON_SUCCESS;
  person: Person
}

export function addNewPersonSuccess(person: Person): PeopleActions {
  return { type: PeopleActionTypes.ADD_NEW_PERSON_SUCCESS, person };
}

export interface AddNewPersonFailure extends Action {
  type: PeopleActionTypes.ADD_NEW_PERSON_FAILURE;
  errorMessage: string
}

export function addNewPersonFailure(errorMessage: string): PeopleActions {
  return { type: PeopleActionTypes.ADD_NEW_PERSON_FAILURE, errorMessage };
}

export interface GetHiredUsers {
  type: PeopleActionTypes.GET_HIRED_USERS,
  year: number,
  month: string,
  hire: number
}

export function getHiredUsers(year: number, month: string, hire: number): PeopleActions {
  return { type: PeopleActionTypes.GET_HIRED_USERS, year, month, hire }
}

export interface GetHiredUsersSuccess {
  type: PeopleActionTypes.GET_HIRED_USERS_SUCCESS,
  users: NormalizedObjects<User>;
}

export function getHiredUsersSuccess(users: NormalizedObjects<User>): PeopleActions {
  return { type: PeopleActionTypes.GET_HIRED_USERS_SUCCESS, users }
}

export type PeopleActions =
  LoadUsersSuccess | AddUsersSuccess |
  DeleteUsersInit | DeleteUsersSuccess |
  ArchiveUsersInit | ArchiveUsersSuccess |
  IncrementPage | ResetPage | Clear |
  SetSelectedTab | LoadUsersByNameInit |
  LoadUsersByNameSuccess | AddUserInit | AddUserSuccess
  | AddNewPerson | AddNewPersonSuccess | AddNewPersonFailure
  | GetHiredUsers | GetHiredUsersSuccess;