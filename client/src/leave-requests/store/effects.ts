import { Action } from "redux";
import { ofType, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { apiChangeLeaveRequestStatus, apiLoadLeaveRequestsByStatus } from "../../services/data/leave-requests.service";
import normalize from "../../store/normalizer";
import { NiEpic, RootState } from "../../store/store";
import { ChangeRequestStatusInit, changeRequestStatusSuccess, LeaveRequestsActionTypes, loadRequestsSuccess, RequestsActions } from "./action";


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

export const leaveRequestsEpics: NiEpic[] = [
  loadLeaveRequestsEpic, changeLeaveRequestsStatusEpic
];