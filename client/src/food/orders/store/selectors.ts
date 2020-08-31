import { isSameWeek } from "date-fns";
import { User } from "../../../people/store";
import { RootState } from "../../../store/store";
import { Meal, MealType } from "../../meals/store/meal-types";
import { DayOfWeek, Order } from "./order-state";

export function selectOrders(state: RootState) {
  return state.orders.allIds.map(id => state.orders.byId[id]);
}

export function selectOrderMeals(state: RootState, orderId: string): Meal[] {
  return state.orders.byId[orderId]?.meals
    ?.map(meal => state.meals.byId[meal])
    ?.filter(meal => meal != null)
    ?.sort((x: Meal, y: Meal) => x.type - y.type);
}

export function selectOrderByDay(orders: Order[], day: DayOfWeek): Order | undefined {
  return orders.find(order => new Date(order.date).getDay() === day);
}

export function selectOrderMealsIds(state: RootState, order: string): string[] {
  if (order == null) return [];
  return state.orders.byId[order]?.meals;
}

export function selectCourseMealFromOrder(state: RootState, order: string, course: MealType): string {
  const result = state.orders.byId[order]?.meals.find(meal => state.meals.byId[meal]?.type === course);
  return result == null ? "" : result;
}

export function selectUsersWhoOrderedInWeek(state: RootState, dayInWeekDate: string): User[] {
  return state.people.allIds
    ?.map(userId => state.people.byId[userId])
    ?.filter(user => state.orders.allIds
      ?.map(orderId => state.orders.byId[orderId])
      ?.filter(order => order?.user === user?.id)
      ?.filter(order => isSameWeek(new Date(order?.date), new Date(dayInWeekDate), { weekStartsOn: 1 }))
      ?.length !== 0)
}