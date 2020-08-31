import { BreadImage, DessertsImage, MainCourseImage, SaladsImage } from "../../../assets"

export interface Meal {
  id: string,
  catering: string,
  imageSrc: string,
  name: string,
  quantity: number,
  price: number,
  description: string,
  type: MealType
}

export enum MealType {
  MAIN_MEAL = 1,
  APPETIZER = 2,
  SALAD = 3,
  BREAD = 4
}

export const mealTypesMap: Map<MealType, string> = new Map([
  [MealType.BREAD, "Breads"],
  [MealType.APPETIZER, "Appetizer"],
  [MealType.MAIN_MEAL, "Main Meal"],
  [MealType.SALAD, "Salads"]
])

export const mealsCourseImageMap: Map<MealType, string> = new Map([
  [MealType.BREAD, BreadImage],
  [MealType.APPETIZER, DessertsImage],
  [MealType.MAIN_MEAL, MainCourseImage],
  [MealType.SALAD, SaladsImage]
])