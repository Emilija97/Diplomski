import { Action } from "redux";
import { ActionsObservable, ofType, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { apiAddReport, apiDeleteReports, apiGetReports, apiLoadReports, apiUpdateReport } from "../../services/data/reports.service";
import normalize from "../../store/normalizer";
import { NiEpic, RootState } from "../../store/store";
import { AddReport, addReportSuccess, DeleteReports, deleteReportsSuccess, GetReports, getReportsSuccess, LoadReportsInit, loadReportsSuccess, ReportsActionTypes, UpdateReport, updateReportSuccess } from "./actions";

const loadReportsEpic = (action$: Observable<LoadReportsInit>, state$: StateObservable<RootState>)
  : Observable<Action> => {
  return action$.pipe(
    ofType(ReportsActionTypes.LOAD_REPORTS_INIT),
    switchMap(action => apiLoadReports(action.personId, action.year).pipe(
      map(reports => loadReportsSuccess(normalize(reports)))
    ))
  );
}

const getReportsEpic = (action$: Observable<GetReports>, state$: StateObservable<RootState>)
  : Observable<Action> => {
  return action$.pipe(
    ofType(ReportsActionTypes.GET_REPORTS),
    switchMap(action => apiGetReports(action.year, action.month).pipe(
      map(reports => getReportsSuccess(normalize(reports)))
    ))
  );
}

const addReportEpic = (action$: Observable<AddReport>, state: StateObservable<RootState>): Observable<Action> => {
  return action$.pipe(
    ofType(ReportsActionTypes.ADD_REPORT),
    switchMap(action => apiAddReport(action.report).pipe(
      map(id => addReportSuccess({ ...action.report, id }))
    ))
  )
}

const updateReportEpic = (action$: Observable<UpdateReport>, state$: StateObservable<RootState>)
  : Observable<Action> => {
  return action$.pipe(
    ofType(ReportsActionTypes.UPDATE_REPORT),
    switchMap(action => apiUpdateReport(action.report).pipe(
      map(() => updateReportSuccess(action.report))
    ))
  );
}

const deleteReportsEpic = (action$: ActionsObservable<DeleteReports>): Observable<Action> => {
  return action$.pipe(
    ofType(ReportsActionTypes.DELETE_REPORTS),
    switchMap(action => apiDeleteReports(action.ids).pipe(
      map(() => deleteReportsSuccess(action.ids))
    ))
  )
}

export const reportsEpics: NiEpic[] = [
  loadReportsEpic, getReportsEpic, addReportEpic, updateReportEpic, deleteReportsEpic
]