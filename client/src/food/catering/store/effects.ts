import { Action } from "redux";
import { ofType } from "redux-observable";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { apiAddCatering, apiLoadCatering, apiLoadCaterings } from "../../../services/data/catering.service";
import normalize from "../../../store/normalizer";
import { NiEpic } from "../../../store/store";
import { AddCateringInit, CateringActionsType, LoadCateringInit, loadCateringsSuccess, loadCateringSuccess } from "./actions";

const loadCateringsEpic = (action$: Observable<Action>): Observable<Action> => {
  return action$.pipe(
    ofType(CateringActionsType.LOAD_CATERINGS_INIT),
    switchMap(() => apiLoadCaterings().pipe(
      map(caterings => loadCateringsSuccess(normalize(caterings)))
    ))
  );
}

const loadCateringEpic = (action$: Observable<LoadCateringInit>): Observable<Action> => {
  return action$.pipe(
    ofType(CateringActionsType.LOAD_CATERING_INIT),
    switchMap(action => apiLoadCatering(action.id).pipe(
      map(catering => loadCateringSuccess(catering))
    ))
  );
}

const addCateringEpic = (action$: Observable<AddCateringInit>): Observable<Action> => {
  return action$.pipe(
    ofType(CateringActionsType.ADD_CATERING_INIT),
    switchMap(action => apiAddCatering(action.catering).pipe(
      map(cateringId => loadCateringSuccess({ ...action.catering, id: cateringId }))
    ))
  );
}

export const cateringsEpics: NiEpic[] = [
  loadCateringsEpic, loadCateringEpic, addCateringEpic
]