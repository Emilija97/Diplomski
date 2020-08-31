import { Action } from "redux";
import { NormalizedObjects } from "../../../store/normalized-objects";
import { Order } from "./order-state";

export enum OrdersActionTypes {
  ADD_ORDER_INIT = "Orders__AddOrderInit",
  ADD_ORDER_SUCCESS = "Orders__AddOrderSuccess",
  LOAD_ORDERS_INIT = "Orders__LoadOrdersInit",
  LOAD_ORDERS_SUCCESS = "Orders__LoadOrdersSuccess",
  LOAD_USERS_WEEKLY_ORDERS_INIT = "Orders__LoadUsersWeeklyOrdersInit",
  LOAD_USERS_WEEKLY_ORDERS_SUCCESS = "Orders__LoadUsersWeeklyOrdersSuccess",
  CHANGE_ORDER_INIT = "Order__ChangeOrderInit",
  CHANGE_ORDER_SUCCESS = "Order__ChangeOrderSuccess"
}

export interface AddOrderInit extends Action {
  type: OrdersActionTypes.ADD_ORDER_INIT,
  order: {
    user: string,
    catering: string,
    meals: string[],
    date: string
  }
}

export function addOrderInit(order: { user: string, catering: string, meals: string[], date: string }): OrdersActions {
  return { type: OrdersActionTypes.ADD_ORDER_INIT, order }
}

export interface AddOrderSuccess extends Action {
  type: OrdersActionTypes.ADD_ORDER_SUCCESS,
  order: Order
}

export function addOrderSuccess(order: Order): OrdersActions {
  return { type: OrdersActionTypes.ADD_ORDER_SUCCESS, order }
}

export interface LoadOrdersInit extends Action {
  type: OrdersActionTypes.LOAD_ORDERS_INIT,
  date: string,
  user: string
}

export function loadOrdersInit(date: string, user: string): OrdersActions {
  return { type: OrdersActionTypes.LOAD_ORDERS_INIT, date, user }
}

export interface LoadOrdersSuccess extends Action {
  type: OrdersActionTypes.LOAD_ORDERS_SUCCESS,
  orders: NormalizedObjects<Order>
}

export function loadOrdersSuccess(orders: NormalizedObjects<Order>): OrdersActions {
  return { type: OrdersActionTypes.LOAD_ORDERS_SUCCESS, orders }
}

export interface LoadUsersWeeklyOrdersInit {
  type: OrdersActionTypes.LOAD_USERS_WEEKLY_ORDERS_INIT,
  dayInWeekDate: string
}

export function loadUsersWeeklyOrdersInit(dayInWeekDate: string): OrdersActions {
  return { type: OrdersActionTypes.LOAD_USERS_WEEKLY_ORDERS_INIT, dayInWeekDate }
}

export interface LoadUsersWeeklyOrdersSuccess {
  type: OrdersActionTypes.LOAD_USERS_WEEKLY_ORDERS_SUCCESS,
  orders: NormalizedObjects<Order>
}

export function loadUsersWeeklyOrdersSuccess(orders: NormalizedObjects<Order>): OrdersActions {
  return { type: OrdersActionTypes.LOAD_USERS_WEEKLY_ORDERS_SUCCESS, orders }
}

export interface ChangeOrderInit extends Action {
  type: OrdersActionTypes.CHANGE_ORDER_INIT,
  id: string,
  meals: string[],
  catering: string
}

export function changeOrderInit(id: string, meals: string[], catering: string): OrdersActions {
  return { type: OrdersActionTypes.CHANGE_ORDER_INIT, id, meals, catering }
}

export interface ChangeOrderSuccess extends Action {
  type: OrdersActionTypes.CHANGE_ORDER_SUCCESS,
  id: string,
  meals: string[],
  catering: string
}

export function changeOrderSuccess(id: string, meals: string[], catering: string): OrdersActions {
  return { type: OrdersActionTypes.CHANGE_ORDER_SUCCESS, id, meals, catering }
}

export type OrdersActions =
  AddOrderInit | AddOrderSuccess |
  LoadOrdersInit | LoadOrdersSuccess |
  ChangeOrderInit | ChangeOrderSuccess |
  LoadUsersWeeklyOrdersInit | LoadUsersWeeklyOrdersSuccess;