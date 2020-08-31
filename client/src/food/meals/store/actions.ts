import { Action } from "redux";
import { NormalizedObjects } from "../../../store/normalized-objects";
import { Meal, MealType } from "./meal-types";

export enum MealsActionTypes {
  LOAD_MEAL_INIT = "Meals__LoadMealInit",
  LOAD_MEAL_SUCCESS = "Meals__LoadMealSuccess",
  LOAD_MEALS_INIT = "Meals__LoadMealsInit",
  LOAD_MEALS_SUCCESS = "Meals__LoadMealsSuccess",
  DELETE_MEALS_INIT = "Meals__DeleteMealsInit",
  DELETE_MEALS_SUCCESS = "Meals__DeleteMealsSuccess",
  ADD_MEAL_INIT = "Meals__AddMealInit",
  ADD_MEAL_SUCCESS = "Meals__AddMealSuccess",
  UPDATE_MEAL_INIT = "Meals__UpdateMealInit",
  UPDATE_MEAL_SUCCESS = "Meals__UpdateMealSuccess"
}

export interface LoadMealInit extends Action {
  type: MealsActionTypes.LOAD_MEAL_INIT,
  id: string
}

export function loadMealInit(id: string): MealsActions {
  return { type: MealsActionTypes.LOAD_MEAL_INIT, id }
}

export interface LoadMealSuccess extends Action {
  type: MealsActionTypes.LOAD_MEAL_SUCCESS,
  meal: Meal
}

export function loadMealSuccess(meal: Meal): MealsActions {
  return { type: MealsActionTypes.LOAD_MEAL_SUCCESS, meal }
}

export interface LoadMealsInit extends Action {
  type: MealsActionTypes.LOAD_MEALS_INIT,
  catering: string,
  mealType?: MealType
}

export function loadMealsInit(catering: string, mealType?: MealType): MealsActions {
  return { type: MealsActionTypes.LOAD_MEALS_INIT, catering, mealType }
}

export interface LoadMealsSuccess extends Action {
  type: MealsActionTypes.LOAD_MEALS_SUCCESS,
  meals: NormalizedObjects<Meal>
}

export function loadMealsSuccess(meals: NormalizedObjects<Meal>): MealsActions {
  return { type: MealsActionTypes.LOAD_MEALS_SUCCESS, meals }
}

export interface DeleteMealsInit extends Action {
  type: MealsActionTypes.DELETE_MEALS_INIT,
  ids: string[]
}

export function deleteMealsInit(ids: string[]): MealsActions {
  return { type: MealsActionTypes.DELETE_MEALS_INIT, ids }
}

export interface DeleteMealsSuccess extends Action {
  type: MealsActionTypes.DELETE_MEALS_SUCCESS,
  ids: string[]
}

export function deleteMealsSuccess(ids: string[]): MealsActions {
  return { type: MealsActionTypes.DELETE_MEALS_SUCCESS, ids }
}

export interface AddMealInit extends Action {
  type: MealsActionTypes.ADD_MEAL_INIT,
  meal: Meal
}

export function addMealInit(meal: Meal): MealsActions {
  return { type: MealsActionTypes.ADD_MEAL_INIT, meal }
}

export interface AddMealSuccess extends Action {
  type: MealsActionTypes.ADD_MEAL_SUCCESS,
  meal: Meal
}

export function addMealSuccess(meal: Meal): MealsActions {
  return { type: MealsActionTypes.ADD_MEAL_SUCCESS, meal }
}

export interface UpdateMealInit extends Action {
  type: MealsActionTypes.UPDATE_MEAL_INIT,
  meal: Meal
}

export function updateMealInit(meal: Meal): MealsActions {
  return { type: MealsActionTypes.UPDATE_MEAL_INIT, meal }
}

export interface UpdateMealSuccess extends Action {
  type: MealsActionTypes.UPDATE_MEAL_SUCCESS,
  meal: Meal
}

export function updateMealSuccess(meal: Meal): MealsActions {
  return { type: MealsActionTypes.UPDATE_MEAL_SUCCESS, meal }
}

export type MealsActions =
  LoadMealsInit | LoadMealsSuccess |
  DeleteMealsInit | DeleteMealsSuccess |
  LoadMealInit | LoadMealSuccess |
  AddMealInit | AddMealSuccess |
  UpdateMealInit | UpdateMealSuccess;