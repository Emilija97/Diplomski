import { NormalizedObjects } from "../../store/normalized-objects";
import { LeaveRequestsActionTypes, RequestsActions } from "./action";
import { LeaveRequest, LeaveRequestStatus } from "./request-state";

export interface RequestsState extends NormalizedObjects<LeaveRequest> {
  selectedRequestStatus: LeaveRequestStatus
}

const initialState: RequestsState = {
  allIds: [],
  byId: {},
  selectedRequestStatus: LeaveRequestStatus.PENDING
}

function reducer(state = initialState, action: RequestsActions): RequestsState {
  switch (action.type) {
    case LeaveRequestsActionTypes.LOAD_REQUESTS_SUCCESS: {
      return {
        ...action.requests,
        selectedRequestStatus: state.selectedRequestStatus
      }
    }
    case LeaveRequestsActionTypes.CHANGE_REQUEST_STATUS_SUCCESS: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            status: action.status
          }
        }
      }
    }
    case LeaveRequestsActionTypes.SET_SELECTED_REQUEST_STATUS: {
      return {
        ...state,
        selectedRequestStatus: action.selectedRequests
      }
    }

    default: return state;
  }
}

export { reducer as LeaveRequestsReducer };

