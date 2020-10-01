import { NormalizedObjects } from "../../store/normalized-objects";
import { ReportsActions, ReportsActionTypes } from "./actions";
import { Report } from "./report-state";

interface ReportsState extends NormalizedObjects<Report> {
}

const initialState: ReportsState = {
  allIds: [],
  byId: {}
}

function reducer(state = initialState, action: ReportsActions): ReportsState {
  switch (action.type) {
    case ReportsActionTypes.LOAD_REPORTS_SUCCESS: {
      state = initialState;
      return {
        ...state,
        allIds: Array.from(new Set([...state.allIds, ...action.reports.allIds])) as string[],
        byId: {
          ...state.byId,
          ...action.reports.byId
        }
      }
    }
    case ReportsActionTypes.GET_REPORTS_SUCCESS: {
      return {
        ...state,
        byId: action.reports.byId,
        allIds: action.reports.allIds
      };
    }
    case ReportsActionTypes.CLEAR_REPORTS: {
      return initialState;
    }
    case ReportsActionTypes.ADD_REPORT_SUCCESS: {
      return {
        ...state,
        allIds: [...state.allIds, action.report.id],
        byId: {
          ...state.byId,
          [action.report.id]: action.report
        }
      }
    }
    case ReportsActionTypes.UPDATE_REPORT_SUCCESS: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.report.id]: action.report
        }
      }
    }
    default: { return state; }
  }
}

export { reducer as ReportsReducer };

