import { Action } from "redux";
import { ActionsObservable, ofType, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { addReportSuccess } from "../../reports/store/actions";
import { apiChangeLeaveRequestStatus, apiCreateRequest, apiDeleteRequests, apiLoadLeaveRequestsByStatus, apiUpdateRequest } from "../../services/data/leave-requests.service";
import normalize from "../../store/normalizer";
import { NiEpic, RootState } from "../../store/store";
import { ChangeRequestStatusInit, changeRequestStatusSuccess, CreateRequest, createRequestSuccess, DeleteRequests, deleteRequestsSuccess, LeaveRequestsActionTypes, loadRequestsSuccess, RequestsActions, UpdateRequest, updateRequestSuccess } from "./actions";


const loadLeaveRequestsEpic = (action$: Observable<Action>, state$: StateObservable<RootState>)
  : Observable<Action> => {
  return action$.pipe(
    ofType(LeaveRequestsActionTypes.LOAD_REQUESTS_INIT),
    switchMap(() => apiLoadLeaveRequestsByStatus(state$.value.leaveRequests.selectedRequestStatus).pipe(
      map(requests => normalize(requests)),
      map(requests => loadRequestsSuccess(requests))
    ))
  );
}

const changeLeaveRequestsStatusEpic = (action$: Observable<ChangeRequestStatusInit>): Observable<RequestsActions> => {
  return action$.pipe(
    ofType(LeaveRequestsActionTypes.CHANGE_REQUEST_STATUS_INIT),
    switchMap(action => apiChangeLeaveRequestStatus(action.id, action.status).pipe(
      map(() => changeRequestStatusSuccess(action.id, action.status))
    ))
  )
}

const createRequestEpic = (action$: Observable<CreateRequest>, state: StateObservable<RootState>): Observable<Action> => {
  return action$.pipe(
    ofType(LeaveRequestsActionTypes.CREATE_REQUEST),
    switchMap(action => apiCreateRequest(action.request).pipe(
      map(id => createRequestSuccess({ ...action.request, id }))
    ))
  )
}

const updateRequestEpic = (action$: Observable<UpdateRequest>, state$: StateObservable<RootState>)
  : Observable<Action> => {
  return action$.pipe(
    ofType(LeaveRequestsActionTypes.UPDATE_REQUEST),
    switchMap(action => apiUpdateRequest(action.request).pipe(
      map(() => updateRequestSuccess(action.request))
    ))
  );
}

const deleteRequestsEpic = (action$: ActionsObservable<DeleteRequests>): Observable<Action> => {
  return action$.pipe(
    ofType(LeaveRequestsActionTypes.DELETE_REQUESTS),
    switchMap(action => apiDeleteRequests(action.ids).pipe(
      map(() => deleteRequestsSuccess(action.ids))
    ))
  )
}

export const leaveRequestsEpics: NiEpic[] = [
  loadLeaveRequestsEpic, changeLeaveRequestsStatusEpic,
  createRequestEpic, updateRequestEpic, deleteRequestsEpic
];