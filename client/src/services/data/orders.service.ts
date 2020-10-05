import { isSameWeek } from "date-fns/esm";
import { forkJoin, Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Meal } from "../../food/meals/store/meal-types";
import { Order } from "../../food/orders/store/order-state";
import { User } from "../../people/store";
import { MEALS_URL } from "./meals.service";
import { PEOPLE_URL } from "./people.service";
import { addOne, getAll, getOne, updateOne } from "./repository.service";

export const ORDERS_URL = "http://localhost:4000/orders";

export function apiAddOrder(order: Order): Observable<Order> {
  return addOne<Order>(`${ORDERS_URL}`, order);
}

export function apiChangeOrder(id: string, meals: string[], catering: string): Observable<Response> {
  return getOne<Order>(`${ORDERS_URL}/${id}`).pipe(
    switchMap(order => {
      order.catering = catering;
      order.meals = meals;
      return updateOne(`${ORDERS_URL}/${id}`, order);
    })
  )
}

export function apiLoadOrdersAndMeals(date: string, user: string): Observable<[Order[], Meal[]]> {
  return forkJoin(
    getAll<Order>(`${ORDERS_URL}`),
    getAll<Meal>(`${MEALS_URL}`)
  ).pipe(
    map(values => [
      values[0].filter(order =>
        isSameWeek(new Date(date), new Date(order.date), { weekStartsOn: 1 }) && order.user === user),
      values[1]
    ]),
    switchMap(values => {
      const meals: string[] = [];
      (values[0] as Order[]).forEach(order => {
        meals.push(...order.meals);
      });

      return forkJoin(
        of(values[0] as Order[]),
        of((values[1] as Meal[]).filter(meal => meals.includes(meal?.id))))
    })
  );
}

export function apiLoadUsersWeeklyOrders(dayInWeekDate: string): Observable<[Order[], User[]]> {
  return forkJoin(
    getAll<Order>(`${ORDERS_URL}`).pipe(
      map(orders => orders.filter(order =>
        isSameWeek(new Date(order.date), new Date(dayInWeekDate), { weekStartsOn: 1 })))
    ),
    getAll<User>(`${PEOPLE_URL}`)
  );
}