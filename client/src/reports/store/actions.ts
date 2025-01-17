

import { Action } from "redux";
import { NormalizedObjects } from "../../store/normalized-objects";
import { Report } from "./report-state";

export enum ReportsActionTypes {
  LOAD_REPORTS_INIT = "Reports__LoadReportsInit",
  LOAD_REPORTS_SUCCESS = "Reports__LoadReportsSuccess",
  GET_REPORTS = "Reports__GetReports",
  GET_REPORTS_SUCCESS = "Reports__GetReportsSuccess",
  CLEAR_REPORTS = "Reports__ClearReports",
  ADD_REPORT = "Reports__AddReport",
  ADD_REPORT_SUCCESS = "Reports__AddReportSuccess",
  UPDATE_REPORT = "Reports__UpdateReport",
  UPDATE_REPORT_SUCCESS = "Reports__UpdateReportSuccess",
  DELETE_REPORTS = "Reports__DeleteReports",
  DELETE_REPORTS_SUCCESS = "Reports__DeleteReportsSuccess",
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

export interface GetReports extends Action {
  type: ReportsActionTypes.GET_REPORTS,
  year: number;
  month: string;
}

export function getReports(year: number, month: string): ReportsActions {
  return { type: ReportsActionTypes.GET_REPORTS, year, month }
}

export interface GetReportsSuccess extends Action {
  type: ReportsActionTypes.GET_REPORTS_SUCCESS,
  reports: NormalizedObjects<Report>
}

export function getReportsSuccess(reports: NormalizedObjects<Report>): ReportsActions {
  return { type: ReportsActionTypes.GET_REPORTS_SUCCESS, reports }
}

export interface ClearReports extends Action {
  type: ReportsActionTypes.CLEAR_REPORTS;
}

export function clearReports(): ReportsActions {
  return { type: ReportsActionTypes.CLEAR_REPORTS }
}

export interface AddReport extends Action {
  type: ReportsActionTypes.ADD_REPORT;
  report: Report;
}

export function addReport(report: Report): ReportsActions {
  return { type: ReportsActionTypes.ADD_REPORT, report };
}

export interface AddReportSuccess extends Action {
  type: ReportsActionTypes.ADD_REPORT_SUCCESS;
  report: Report;
}

export function addReportSuccess(report: Report): ReportsActions {
  return { type: ReportsActionTypes.ADD_REPORT_SUCCESS, report };
}

export interface UpdateReport extends Action {
  type: ReportsActionTypes.UPDATE_REPORT;
  report: Report;
}

export function updateReport(report: Report): ReportsActions {
  return { type: ReportsActionTypes.UPDATE_REPORT, report };
}

export interface UpdateReportSuccess extends Action {
  type: ReportsActionTypes.UPDATE_REPORT_SUCCESS;
  report: Report;
}

export function updateReportSuccess(report: Report): ReportsActions {
  return { type: ReportsActionTypes.UPDATE_REPORT_SUCCESS, report };
}

export interface DeleteReports extends Action {
  type: ReportsActionTypes.DELETE_REPORTS;
  ids: string[];
}

export function deleteReports(ids: string[]): ReportsActions {
  return { type: ReportsActionTypes.DELETE_REPORTS, ids };
}

export interface DeleteReportsSuccess extends Action {
  type: ReportsActionTypes.DELETE_REPORTS_SUCCESS;
  ids: string[];
}

export function deleteReportsSuccess(ids: string[]): ReportsActions {
  return { type: ReportsActionTypes.DELETE_REPORTS_SUCCESS, ids };
}

export type ReportsActions =
  LoadReportsInit | LoadReportsSuccess
  | GetReports | GetReportsSuccess | ClearReports
  | AddReport | AddReportSuccess | UpdateReport | UpdateReportSuccess
  | DeleteReports | DeleteReportsSuccess;