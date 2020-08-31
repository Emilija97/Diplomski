import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { LeaveRequest, LeaveRequestStatus } from "../../leave-requests/store";
import { getAll, getOne, updateOne } from "./repository.service";

export const REQUESTS_URL = "http://localhost:4000/requests";

export function apiLoadLeaveRequests(): Observable<LeaveRequest[]> {
  return getAll<LeaveRequest>(`${REQUESTS_URL}`);
}

export function apiLoadLeaveRequestsByStatus(status: LeaveRequestStatus): Observable<LeaveRequest[]> {
  return getAll<LeaveRequest>(`${REQUESTS_URL}?status=${status}`);
}

export function apiChangeLeaveRequestStatus(id: string, status: LeaveRequestStatus): Observable<Response> {
  return getOne<LeaveRequest>(`${REQUESTS_URL}/${id}`).pipe(
    switchMap(user => {
      user.status = status;
      return updateOne(`${REQUESTS_URL}/${id}`, user);
    })
  );
}