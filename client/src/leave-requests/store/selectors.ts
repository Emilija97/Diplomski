import { UserType } from "../../auth/store/auth-state";
import { RootState } from "../../store/store";
import { LeaveRequest, LeaveRequestStatus } from "./request-state";

export function selectRequestsByStatus(
  state: RootState,
  status: LeaveRequestStatus,
  userId: string,
  userType: UserType): LeaveRequest[] {
  return state.leaveRequests.allIds
    .filter(id => state.leaveRequests.byId[id].status === status)
    .filter(id => userType !== UserType.EMPLOYEE ? true : state.leaveRequests.byId[id].employeeId === userId)
    .map(id => state.leaveRequests.byId[id]);
}


