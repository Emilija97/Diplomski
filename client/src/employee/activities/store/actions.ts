import { Action } from "redux";
import { NormalizedObjects } from "../../../store/normalized-objects";
import { Person } from "../../store/person-state";
import { Activity } from "./activities-state";


export enum ActivityActionTypes {
  ADD_ACTIVITY = "Activity_AddActivity",
  ADD_ACTIVITY_SUCCESS = "Activity_AddActivitySuccess",
  LOAD_ACTIVITIES = "Activity_LoadActivities",
  LOAD_ACTIVITIES_SUCCESS = "Activity_LoadActivitiesSuccess",
  CLEAR = "Activity_Clear",
  UPDATE_ACTIVITY = "Activity_UpdateActivity",
  UPDATE_ACTIVITY_SUCCESS = "Activity_UpdateActivitySuccess",
  DELETE_ACTIVITY = "Activity_DeleteActivity",
  DELETE_ACTIVITY_SUCCESS = "Activity_DeleteActivitySuccess",
}

export interface AddActivity extends Action {
  type: ActivityActionTypes.ADD_ACTIVITY;
  activity: Activity;
  person?: Person;
}

export function addActivity(activity: Activity, person?: Person): ActivityActions {
  return { type: ActivityActionTypes.ADD_ACTIVITY, activity, person };
}

export interface AddActivitySuccess extends Action {
  type: ActivityActionTypes.ADD_ACTIVITY_SUCCESS;
  activity: Activity;
  person?: Person;
}

export function addActivitySuccess(activity: Activity, person?: Person): ActivityActions {
  return { type: ActivityActionTypes.ADD_ACTIVITY_SUCCESS, activity, person };
}

export interface LoadActivities extends Action {
  type: ActivityActionTypes.LOAD_ACTIVITIES;
  personId: string;
}

export function loadActivities(personId: string): ActivityActions {
  return { type: ActivityActionTypes.LOAD_ACTIVITIES, personId }
}

export interface LoadActivitiesSuccess extends Action {
  type: ActivityActionTypes.LOAD_ACTIVITIES_SUCCESS;
  activities: NormalizedObjects<Activity>;
}

export function loadActivitiesSuccess(activities: NormalizedObjects<Activity>): ActivityActions {
  return { type: ActivityActionTypes.LOAD_ACTIVITIES_SUCCESS, activities };
}

export interface Clear extends Action {
  type: ActivityActionTypes.CLEAR;
}

export function clear(): ActivityActions {
  return { type: ActivityActionTypes.CLEAR }
}

export interface UpdateActivity extends Action {
  type: ActivityActionTypes.UPDATE_ACTIVITY;
  activity: Activity;
  person?: Person;
}

export function updateActivity(activity: Activity, person?: Person): ActivityActions {
  return { type: ActivityActionTypes.UPDATE_ACTIVITY, activity, person };
}

export interface UpdateActivitySuccess extends Action {
  type: ActivityActionTypes.UPDATE_ACTIVITY_SUCCESS;
  activity: Activity;
  person?: Person;
}

export function updateActivitySuccess(activity: Activity, person?: Person): ActivityActions {
  return { type: ActivityActionTypes.UPDATE_ACTIVITY_SUCCESS, activity, person };
}

export interface DeleteActivity extends Action {
  type: ActivityActionTypes.DELETE_ACTIVITY,
  id: string
}

export function deleteActivity(id: string): ActivityActions {
  return { type: ActivityActionTypes.DELETE_ACTIVITY, id }
}

export interface DeleteActivitySuccess extends Action {
  type: ActivityActionTypes.DELETE_ACTIVITY_SUCCESS,
  id: string
}

export function deleteActivitySuccess(id: string): ActivityActions {
  return { type: ActivityActionTypes.DELETE_ACTIVITY_SUCCESS, id }
}

export type ActivityActions =
  AddActivity | AddActivitySuccess |
  LoadActivities | LoadActivitiesSuccess | Clear |
  UpdateActivity | UpdateActivitySuccess |
  DeleteActivity | DeleteActivitySuccess;