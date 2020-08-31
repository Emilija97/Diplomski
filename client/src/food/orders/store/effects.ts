import { History } from "history";
import { Action } from "redux";
import { ofType, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { loadUsersSuccess } from "../../../people/store";
import { apiAddOrder, apiChangeOrder, apiLoadOrdersAndMeals, apiLoadUsersWeeklyOrders } from "../../../services/data/orders.service";
import normalize from "../../../store/normalizer";
import { NiEpic, RootState } from "../../../store/store";
import { loadMealsSuccess } from "../../meals/store/actions";
import { Meal } from "../../meals/store/meal-types";
import { AddOrderInit, addOrderSuccess, ChangeOrderInit, changeOrderSuccess, LoadOrdersInit, loadOrdersSuccess, LoadUsersWeeklyOrdersInit, loadUsersWeeklyOrdersSuccess, OrdersActionTypes } from "./actions";
import { Order } from "./order-state";

const addOrderEpic = (action$: Observable<AddOrderInit>): Observable<Action> => {
  return action$.pipe(
    ofType(OrdersActionTypes.ADD_ORDER_INIT),
    switchMap((action) => apiAddOrder({
      id: "",
      date: new Date(action.order.date).toLocaleDateString(),
      meals: action.order.meals,
      user: action.order.user,
      catering: action.order.catering
    }).pipe(
      map(id => addOrderSuccess({
        id: id,
        date: new Date(action.order.date).toLocaleDateString(),
        meals: action.order.meals,
        user: action.order.user,
        catering: action.order.catering
      }))
    ))
  );
}

const changeOrderEpic = (action$: Observable<ChangeOrderInit>): Observable<Action> => {
  return action$.pipe(
    ofType(OrdersActionTypes.CHANGE_ORDER_INIT),
    switchMap((action) => apiChangeOrder(action.id, action.meals, action.catering).pipe(
      map(() => changeOrderSuccess(action.id, action.meals, action.catering))
    ))
  );
}

const loadOrdersEpic = (action$: Observable<LoadOrdersInit>): Observable<Action> => {
  return action$.pipe(
    ofType(OrdersActionTypes.LOAD_ORDERS_INIT),
    switchMap(action => apiLoadOrdersAndMeals(action.date, action.user).pipe(
      mergeMap(values =>
        [loadOrdersSuccess(normalize(values[0] as Order[])),
        loadMealsSuccess(normalize(values[1] as Meal[]))]
      )
    ))
  );
}

const changeOrderSuccessEpic = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
  dependencies: { history: History<History.PoorMansUnknown> }
): Observable<Action> => {
  return action$.pipe(
    ofType(OrdersActionTypes.CHANGE_ORDER_SUCCESS, OrdersActionTypes.ADD_ORDER_SUCCESS),
    map(() => {
      dependencies.history.goBack();
      return { type: "" }
    })
  );
}

const loadUsersWeeklyOrdersEpic = (action$: Observable<LoadUsersWeeklyOrdersInit>): Observable<Action> => {
  return action$.pipe(
    ofType(OrdersActionTypes.LOAD_USERS_WEEKLY_ORDERS_INIT),
    switchMap(action => apiLoadUsersWeeklyOrders(action.dayInWeekDate).pipe(
      mergeMap(values => [
        loadUsersWeeklyOrdersSuccess(normalize(values[0])),
        loadUsersSuccess(normalize(values[1]))
      ])
    ))
  );
}

export const ordersEpics: NiEpic[] = [
  addOrderEpic, loadOrdersEpic, changeOrderEpic,
  changeOrderSuccessEpic, loadUsersWeeklyOrdersEpic
]