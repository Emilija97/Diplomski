import { Action } from "redux";
import { NormalizedObjects } from "../../../store/normalized-objects";
import { Catering } from "./reducer";

export enum CateringActionsType {
  LOAD_CATERINGS_INIT = "Catering__LoadCateringsInit",
  LOAD_CATERINGS_SUCCESS = "Catering__LoadCateringsSuccess",
  LOAD_CATERING_INIT = "Catering__LoadCateringInit",
  LOAD_CATERING_SUCCESS = "Catering__LoadCateringSuccess",
  ADD_CATERING_INIT = "Catering__AddCateringInit",
  ADD_CATERING_SUCCESS = "Catering__AddCateringSuccess"
}

export interface LoadCateringsInit extends Action {
  type: CateringActionsType.LOAD_CATERINGS_INIT
}

export function loadCateringsInit(): CateringActions {
  return { type: CateringActionsType.LOAD_CATERINGS_INIT }
}

export interface LoadCateringsSuccess extends Action {
  type: CateringActionsType.LOAD_CATERINGS_SUCCESS,
  caterings: NormalizedObjects<Catering>
}

export function loadCateringsSuccess(caterings: NormalizedObjects<Catering>): CateringActions {
  return { type: CateringActionsType.LOAD_CATERINGS_SUCCESS, caterings }
}


export interface LoadCateringInit extends Action {
  type: CateringActionsType.LOAD_CATERING_INIT,
  id: string
}

export function loadCateringInit(id: string): CateringActions {
  return { type: CateringActionsType.LOAD_CATERING_INIT, id }
}

export interface LoadCateringSuccess extends Action {
  type: CateringActionsType.LOAD_CATERING_SUCCESS,
  catering: Catering
}

export function loadCateringSuccess(catering: Catering): CateringActions {
  return { type: CateringActionsType.LOAD_CATERING_SUCCESS, catering }
}

export interface AddCateringInit extends Action {
  type: CateringActionsType.ADD_CATERING_INIT,
  catering: Catering
}

export function addCateringInit(catering: Catering): CateringActions {
  return { type: CateringActionsType.ADD_CATERING_INIT, catering }
}

export interface AddCateringSuccess extends Action {
  type: CateringActionsType.ADD_CATERING_SUCCESS,
  catering: Catering
}

export function addCateringSuccess(catering: Catering): CateringActions {
  return { type: CateringActionsType.ADD_CATERING_SUCCESS, catering }
}

export type CateringActions =
  LoadCateringsInit | LoadCateringsSuccess |
  LoadCateringInit | LoadCateringSuccess |
  AddCateringInit | AddCateringSuccess;