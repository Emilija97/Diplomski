import { Action } from "redux";
import { NormalizedObjects } from "../../store/normalized-objects";
import { LeaveRequest, LeaveRequestStatus } from "./request-state";

export enum LeaveRequestsActionTypes {
  LOAD_REQUESTS_INIT = "LeaveRequests__LoadRequestsInit",
  LOAD_REQUESTS_SUCCESS = "LeaveRequests__LoadRequestsSuccess",
  CHANGE_REQUEST_STATUS_INIT = "LeaveRequests__ChangeRequestStatusInit",
  CHANGE_REQUEST_STATUS_SUCCESS = "LeaveRequests__ChangeRequestStatusSuccess",
  SET_SELECTED_REQUEST_STATUS = "LeaveRequest__SetSelectedRequestStatus",
  CREATE_REQUEST = "LeaveRequest__CreateRequest",
  CREATE_REQUEST_SUCCESS = "LeaveRequest__CreateRequestSuccess",
  UPDATE_REQUEST = "LeaveRequest__UpdateRequest",
  UPDATE_REQUEST_SUCCESS = "LeaveRequest__UpdateRequestSuccess",
  DELETE_REQUESTS = "LeaveRequest__DeleteRequests",
  DELETE_REQUESTS_SUCCESS = "LeaveRequest__DeleteRequestsSuccess",
}

export function loadRequestsInit(): Action {
  return { type: LeaveRequestsActionTypes.LOAD_REQUESTS_INIT }
}

export interface LoadRequestsSuccess extends Action {
  type: LeaveRequestsActionTypes.LOAD_REQUESTS_SUCCESS,
  requests: NormalizedObjects<LeaveRequest>
}

export function loadRequestsSuccess(requests: NormalizedObjects<LeaveRequest>): RequestsActions {
  return { type: LeaveRequestsActionTypes.LOAD_REQUESTS_SUCCESS, requests }
}

export interface ChangeRequestStatusInit extends Action {
  type: LeaveRequestsActionTypes.CHANGE_REQUEST_STATUS_INIT,
  id: string, status: LeaveRequestStatus
}

export function changeRequestStatusInit(id: string, status: LeaveRequestStatus): RequestsActions {
  return { type: LeaveRequestsActionTypes.CHANGE_REQUEST_STATUS_INIT, id, status }
}

export interface ChangeRequestStatusSuccess extends Action {
  type: LeaveRequestsActionTypes.CHANGE_REQUEST_STATUS_SUCCESS,
  id: string, status: LeaveRequestStatus
}

export function changeRequestStatusSuccess(id: string, status: LeaveRequestStatus): RequestsActions {
  return { type: LeaveRequestsActionTypes.CHANGE_REQUEST_STATUS_SUCCESS, id, status }
}

export interface SetSelectedRequestStatus extends Action {
  type: LeaveRequestsActionTypes.SET_SELECTED_REQUEST_STATUS,
  selectedRequests: LeaveRequestStatus
}

export function setSelectedRequestStatus(selectedRequestStatus: LeaveRequestStatus): RequestsActions {
  return {
    type: LeaveRequestsActionTypes.SET_SELECTED_REQUEST_STATUS,
    selectedRequests: selectedRequestStatus
  }
}

export interface CreateRequest extends Action {
  type: LeaveRequestsActionTypes.CREATE_REQUEST;
  request: LeaveRequest;
}

export function createRequest(request: LeaveRequest): RequestsActions {
  return { type: LeaveRequestsActionTypes.CREATE_REQUEST, request };
}

export interface CreateRequestSuccess extends Action {
  type: LeaveRequestsActionTypes.CREATE_REQUEST_SUCCESS;
  request: LeaveRequest;
}

export function createRequestSuccess(request: LeaveRequest): RequestsActions {
  return { type: LeaveRequestsActionTypes.CREATE_REQUEST_SUCCESS, request };
}

export interface UpdateRequest extends Action {
  type: LeaveRequestsActionTypes.UPDATE_REQUEST;
  request: LeaveRequest;
}

export function updateRequest(request: LeaveRequest): RequestsActions {
  return { type: LeaveRequestsActionTypes.UPDATE_REQUEST, request };
}

export interface UpdateRequestSuccess extends Action {
  type: LeaveRequestsActionTypes.UPDATE_REQUEST_SUCCESS;
  request: LeaveRequest;
}

export function updateRequestSuccess(request: LeaveRequest): RequestsActions {
  return { type: LeaveRequestsActionTypes.UPDATE_REQUEST_SUCCESS, request };
}

export interface DeleteRequests extends Action {
  type: LeaveRequestsActionTypes.DELETE_REQUESTS;
  ids: string[];
}

export function deleteRequests(ids: string[]): RequestsActions {
  return { type: LeaveRequestsActionTypes.DELETE_REQUESTS, ids };
}

export interface DeleteRequestsSuccess extends Action {
  type: LeaveRequestsActionTypes.DELETE_REQUESTS_SUCCESS;
  ids: string[];
}

export function deleteRequestsSuccess(ids: string[]): RequestsActions {
  return { type: LeaveRequestsActionTypes.DELETE_REQUESTS_SUCCESS, ids };
}

export type RequestsActions =
  LoadRequestsSuccess | ChangeRequestStatusSuccess |
  ChangeRequestStatusInit | SetSelectedRequestStatus |
  CreateRequest | CreateRequestSuccess | UpdateRequest | UpdateRequestSuccess |
  DeleteRequests | DeleteRequestsSuccess;