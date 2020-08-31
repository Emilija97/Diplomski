import { NormalizedObjects } from "../../../store/normalized-objects";
import { OrdersActions, OrdersActionTypes } from "./actions";
import { Order } from "./order-state";

interface OrdersState extends NormalizedObjects<Order> { }

const initialState: OrdersState = {
  allIds: [],
  byId: {}
}

function reducer(state = initialState, action: OrdersActions): OrdersState {
  switch (action.type) {
    case OrdersActionTypes.ADD_ORDER_SUCCESS: {
      return {
        ...state,
        allIds: [...state.allIds, action.order.id],
        byId: {
          ...state.byId,
          [action.order.id]: action.order
        }
      }
    }
    case OrdersActionTypes.CHANGE_ORDER_SUCCESS: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            meals: [...action.meals],
            catering: action.catering
          }
        }
      }
    }
    case OrdersActionTypes.LOAD_ORDERS_SUCCESS: {
      return {
        ...state,
        byId: action.orders.byId,
        allIds: action.orders.allIds
      }
    }
    case OrdersActionTypes.LOAD_USERS_WEEKLY_ORDERS_SUCCESS: {
      return {
        ...state,
        byId: action.orders.byId,
        allIds: action.orders.allIds
      }
    }
    default: { return state; }
  }
}

export { reducer as OrdersReducer };

