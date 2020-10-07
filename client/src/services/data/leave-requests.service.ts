import { forkJoin, from, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { LeaveRequest, LeaveRequestStatus } from "../../leave-requests/store";
import { addOne, deleteMany, getAll, getOne, updateOne } from "./repository.service";

export const REQUESTS_URL = "http://localhost:5000/requests";

export function apiLoadLeaveRequests(): Observable<LeaveRequest[]> {
  return getAll<LeaveRequest>(`${REQUESTS_URL}`);
}

export function apiLoadLeaveRequestsByStatus(status: LeaveRequestStatus): Observable<LeaveRequest[]> {
  return getAll<LeaveRequest>(`${REQUESTS_URL}?status=${status}`);
}

export function apiChangeLeaveRequestStatus(id: string, status: LeaveRequestStatus): Observable<Response> {
  return getOne<LeaveRequest>(`${REQUESTS_URL}/${id}`).pipe(
    switchMap(request => {
      request.status = status;
      return updateOne(`${REQUESTS_URL}/${id}`, request);
    })
  );
}

export function apiCreateRequest(request: LeaveRequest): Observable<string> {
  return addOne<LeaveRequest>(`${REQUESTS_URL}`, request).pipe(
    switchMap(request => of(request.id))
  );
}

export function apiUpdateRequest(request: LeaveRequest): Observable<Response> {
  return updateOne<LeaveRequest>(`${REQUESTS_URL}/${request.id}`, request);
}

export function apiDeleteRequests(ids: string[]): Observable<Response[]> {
  return forkJoin(deleteMany(`${REQUESTS_URL}`, ids));
}