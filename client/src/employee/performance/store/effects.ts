import { Action } from "redux";
import { ofType, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { apiLoadReports } from "../../../services/data/reports.service";
import normalize from "../../../store/normalizer";
import { NiEpic, RootState } from "../../../store/store";
import { LoadReportsInit, loadReportsSuccess, ReportsActionTypes } from "./actions";

const loadReportsEpic = (action$: Observable<LoadReportsInit>, state$: StateObservable<RootState>)
  : Observable<Action> => {
  return action$.pipe(
    ofType(ReportsActionTypes.LOAD_REPORTS_INIT),
    switchMap(action => apiLoadReports(action.personId, action.year).pipe(
      map(reports => loadReportsSuccess(normalize(reports)))
    ))
  );
}

export const reportsEpics: NiEpic[] = [
  loadReportsEpic
]