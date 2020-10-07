import { NormalizedObjects } from "../../store/normalized-objects";
import LeaveRequests from "../components/LeaveRequests";
import { LeaveRequestsActionTypes, RequestsActions } from "./actions";
import { LeaveRequest, LeaveRequestStatus } from "./request-state";

export interface RequestsState extends NormalizedObjects<LeaveRequest> {
  selectedRequestStatus: LeaveRequestStatus,
}

const initialState: RequestsState = {
  allIds: [],
  byId: {},
  selectedRequestStatus: LeaveRequestStatus.PENDING,
}

function reducer(state = initialState, action: RequestsActions): RequestsState {
  switch (action.type) {
    case LeaveRequestsActionTypes.LOAD_REQUESTS_SUCCESS: {
      return {
        allIds: Array.from(new Set([...state.allIds, ...action.requests.allIds])) as string[],
        byId: {
          ...state.byId,
          ...action.requests.byId
        },
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
    case LeaveRequestsActionTypes.CREATE_REQUEST_SUCCESS: {
      return {
        ...state,
        allIds: [...state.allIds, action.request.id],
        byId: {
          ...state.byId,
          [action.request.id]: action.request
        }
      }
    }
    case LeaveRequestsActionTypes.UPDATE_REQUEST_SUCCESS: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.request.id]: action.request
        }
      }
    }
    case LeaveRequestsActionTypes.DELETE_REQUESTS_SUCCESS: {
      let users = { ...state.byId };
      action.ids.filter(id => delete users[id]);
      return {
        ...state,
        byId: users,
        allIds: state.allIds.filter(element => !action.ids.includes(element))
      };
    }
    default: return state;
  }
}

export { reducer as LeaveRequestsReducer };

