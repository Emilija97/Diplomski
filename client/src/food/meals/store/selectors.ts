import { RootState } from "../../../store/store";
import { Meal, MealType } from "./meal-types";

export const selectMealsByType = (state: RootState, catering: string, mealType: MealType): Meal[] => {
  return state.caterings.byId[catering]?.meals
    ?.filter(id => state.meals.byId[id]?.type === mealType)
    ?.map(id => state.meals.byId[id]);
}

export const selectMealById = (state: RootState, id: string): Meal => {
  return state.meals.byId[id];
}

export const selectCourseMealsByCatering = (state: RootState, catering: string, course: MealType): Meal[] => {
  return state.caterings.byId[catering]?.meals
    .map(meal => state.meals.byId[meal])
    .filter(meal => meal != null && meal.type === course);
}