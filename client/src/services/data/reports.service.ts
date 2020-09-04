import { Observable } from "rxjs";
import { Report } from "../../employee/performance/store/report-state";
import { getAll } from "./repository.service";

export const REPORTS_URL = "http://localhost:5000/reports";

export function apiLoadReports(personId: string, year: number): Observable<Report[]> {
  return getAll(`${REPORTS_URL}/year/${year}`);
}