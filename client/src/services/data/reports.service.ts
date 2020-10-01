import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Report } from "../../reports/store/report-state";
import { addOne, getAll, getOne, updateOne } from "./repository.service";

export const REPORTS_URL = "http://localhost:5000/reports";

export function apiLoadReports(personId: string, year: number): Observable<Report[]> {
  return getAll(`${REPORTS_URL}?personId=${personId}&year=${year}`);
}

export function apiGetReport(personId: string, year: number, month: string): Observable<Report> {
  return getOne(`${REPORTS_URL}/personId/${personId}?year=${year}&month=${month}`);
}

export function apiGetReports(year: number, month: string): Observable<Report[]> {
  return getAll(`${REPORTS_URL}/reports?year=${year}&month=${month}`);
}

export function apiAddReport(report: Report): Observable<string> {
  return addOne<Report>(`${REPORTS_URL}`, report).pipe(
    switchMap(id => of(id))
  );
}

export function apiUpdateReport(report: Report): Observable<Response> {
  return updateOne<Report>(`${REPORTS_URL}/${report.id}`, report);
}