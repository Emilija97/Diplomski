

import { Action } from "redux";
import { NormalizedObjects } from "../../../store/normalized-objects";
import { Report } from "./report-state";

export enum ReportsActionTypes {
  LOAD_REPORTS_INIT = "Reports__LoadReportsInit",
  LOAD_REPORTS_SUCCESS = "Reports__LoadReportsSuccess"
}

export interface LoadReportsInit extends Action {
  type: ReportsActionTypes.LOAD_REPORTS_INIT,
  personId: string;
  year: number;
}

export function loadReportsInit(personId: string, year: number): ReportsActions {
  return { type: ReportsActionTypes.LOAD_REPORTS_INIT, personId, year }
}

export interface LoadReportsSuccess extends Action {
  type: ReportsActionTypes.LOAD_REPORTS_SUCCESS,
  reports: NormalizedObjects<Report>
}

export function loadReportsSuccess(reports: NormalizedObjects<Report>): ReportsActions {
  return { type: ReportsActionTypes.LOAD_REPORTS_SUCCESS, reports }
}

export type ReportsActions =
  LoadReportsInit | LoadReportsSuccess;