import { forkJoin, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Catering } from "../../food/catering/store/reducer";
import { Meal, MealType } from "../../food/meals/store/meal-types";
import { CATERINGS_URL } from "./catering.service";
import { addOne, deleteMany, getAll, getOne, updateOne } from "./repository.service";

export const MEALS_URL = "http://localhost:4000/meals";

export function apiLoadMeals(catering: string, mealType?: MealType): Observable<Meal[]> {
  return mealType ?
    getAll(`${MEALS_URL}?catering=${catering}&type=${mealType}`) :
    getAll(`${MEALS_URL}?catering=${catering}`);
}

export function apiLoadMeal(id: string): Observable<Meal> {
  return getOne(`${MEALS_URL}?id=${id}`);
}

export function apiGetMeals(catering: string): Observable<Meal[]> {
  return getAll(`${MEALS_URL}?catering=${catering}`);
}

export function apiDeleteMeals(ids: string[]): Observable<Response[]> {
  return forkJoin(deleteMany(`${MEALS_URL}`, ids));
}

export function apiAddMeal(meal: Meal): Observable<string> {
  return addOne<Meal>(`${MEALS_URL}`, meal).pipe(
    switchMap(mealRes => getOne<Catering>(`${CATERINGS_URL}/${meal.catering}`).pipe(
      switchMap(catering => {
        catering.meals = [...catering.meals, mealRes.id];
        return updateOne<Catering>(`${CATERINGS_URL}/${catering.id}`, catering).pipe(
          switchMap(() => of(mealRes.id))
        )
      })
    ))
  );
}

export function apiUpdateMeal(meal: Meal): Observable<Response> {
  return updateOne(`${MEALS_URL}/${meal.id}`, meal);
}

export function apiGetMealsByIds(ids: string[]): Observable<Meal[]> {
  return forkJoin(ids.map(id => getOne<Meal>(`${MEALS_URL}/id`)));
}