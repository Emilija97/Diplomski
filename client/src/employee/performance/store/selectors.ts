import { RootState } from "../../../store/store";
import { Report } from "./report-state";


export const selectReports = (state: RootState): Report[] => {
  return state.reports.allIds.map(report => state.reports.byId[report]);
}