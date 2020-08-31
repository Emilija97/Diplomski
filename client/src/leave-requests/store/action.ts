import { Action } from "redux";
import { NormalizedObjects } from "../../store/normalized-objects";
import { LeaveRequest, LeaveRequestStatus } from "./request-state";

export enum LeaveRequestsActionTypes {
  LOAD_REQUESTS_INIT = "LeaveRequests__LoadRequestsInit",
  LOAD_REQUESTS_SUCCESS = "LeaveRequests__LoadRequestsSuccess",
  CHANGE_REQUEST_STATUS_INIT = "LeaveRequests__ChangeRequestStatusInit",
  CHANGE_REQUEST_STATUS_SUCCESS = "LeaveRequests__ChangeRequestStatusSuccess",
  SET_SELECTED_REQUEST_STATUS = "LeaveRequest__SetSelectedRequestStatus"
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

export type RequestsActions =
  LoadRequestsSuccess | ChangeRequestStatusSuccess |
  ChangeRequestStatusInit | SetSelectedRequestStatus;