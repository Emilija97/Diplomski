import { Action } from "redux";
import { ActionsObservable, ofType } from "redux-observable";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { apiAddMeal, apiDeleteMeals, apiLoadMeal, apiLoadMeals, apiUpdateMeal } from "../../../services/data/meals.service";
import normalize from "../../../store/normalizer";
import { NiEpic } from "../../../store/store";
import { AddMealInit, addMealSuccess, DeleteMealsInit, deleteMealsSuccess, LoadMealInit, LoadMealsInit, loadMealsSuccess, loadMealSuccess, MealsActionTypes, UpdateMealInit, updateMealSuccess } from "./actions";

const loadMealsByTypeEpic = (action$: Observable<LoadMealsInit>): Observable<Action> => {
  return action$.pipe(
    ofType(MealsActionTypes.LOAD_MEALS_INIT),
    switchMap((action) => apiLoadMeals(action.catering, action.mealType).pipe(
      map(meals => loadMealsSuccess(normalize(meals)))
    ))
  );
}

const deleteMealsEpic = (action$: ActionsObservable<DeleteMealsInit>): Observable<Action> => {
  return action$.pipe(
    ofType(MealsActionTypes.DELETE_MEALS_INIT),
    switchMap(action => apiDeleteMeals(action.ids).pipe(
      map(() => deleteMealsSuccess(action.ids))
    ))
  );
}

const loadMealByIdEpic = (action$: Observable<LoadMealInit>): Observable<Action> => {
  return action$.pipe(
    ofType(MealsActionTypes.LOAD_MEAL_INIT),
    switchMap((action) => apiLoadMeal(action.id).pipe(
      map(meal => loadMealSuccess(meal))
    ))
  );
}

const addMealEpic = (action$: Observable<AddMealInit>): Observable<Action> => {
  return action$.pipe(
    ofType(MealsActionTypes.ADD_MEAL_INIT),
    switchMap((action) => apiAddMeal(action.meal).pipe(
      map(id => addMealSuccess({ ...action.meal, id }))
    ))
  );
}

const updateMealEpic = (action$: Observable<UpdateMealInit>): Observable<Action> => {
  return action$.pipe(
    ofType(MealsActionTypes.UPDATE_MEAL_INIT),
    switchMap(action => apiUpdateMeal(action.meal).pipe(
      map(() => updateMealSuccess(action.meal))
    ))
  );
}

export const mealsEpics: NiEpic[] = [
  loadMealsByTypeEpic, deleteMealsEpic, loadMealByIdEpic,
  addMealEpic, updateMealEpic
]