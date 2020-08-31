import { NormalizedObjects } from "../../../store/normalized-objects";
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
      return {
        ...state,
        byId: action.reports.byId,
        allIds: action.reports.allIds
      }
    }
    default: { return state; }
  }
}

export { reducer as ReportsReducer };

