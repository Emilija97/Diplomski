import { RootState } from "../../store/store";
import { Report } from "./report-state";
import { monthsNumberMap } from "./month-name";


export const selectReports = (state: RootState): Report[] => {
  return state.reports.allIds.map(report => state.reports.byId[report]);
}

export const selectReportsByYear = (state: RootState): Report[] => {
  const reports = state.reports.allIds.map(report => state.reports.byId[report]);
  return reports.sort((a, b) => { return new Date(a.year, monthsNumberMap.get(a.month) as number).getTime() - new Date(b.year, monthsNumberMap.get(b.month) as number).getTime() });
}

export const selectReport = (reports: Report[], personId: string, month: string, year: number): Report => {
  return reports.find(report => report.personId === personId && report.month === month && report.year === year) as Report;
}

