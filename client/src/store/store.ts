import { createBrowserHistory } from "history";
import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineEpics, createEpicMiddleware, Epic } from "redux-observable";
import { authEpics } from "../auth/store/effects";
import { AuthReducer } from "../auth/store/reducer";
import { activitiesEpics } from "../employee/activities/store/effects";
import { ActivityReducer } from "../employee/activities/store/reducer";
import { reportsEpics } from "../reports/store/effects";
import { ReportsReducer } from "../reports/store/reducer";
import { personsEpics } from "../employee/store/effects";
import { PersonsReducer } from "../employee/store/reducer";
import { cateringsEpics } from "../food/catering/store/effects";
import { CateringReducer } from "../food/catering/store/reducer";
import { mealsEpics } from "../food/meals/store/effects";
import { MealsReducer } from "../food/meals/store/reducer";
import { ordersEpics } from "../food/orders/store/effects";
import { OrdersReducer } from "../food/orders/store/reducer";
import { leaveRequestsEpics } from "../leave-requests/store/effects";
import { LeaveRequestsReducer } from "../leave-requests/store/reducer";
import { peopleEpics } from "../people/store/effects";
import { PeopleReducer } from "../people/store/reducer";
import { UserMenuReducer } from "../user-menu/store";
import { userMenuEpics } from "../user-menu/store/effects";

export type NiEpic = Epic<any, Action, RootState, any>;

const rootReducer = combineReducers({
  people: PeopleReducer,
  leaveRequests: LeaveRequestsReducer,
  person: PersonsReducer,
  auth: AuthReducer,
  userMenuReducer: UserMenuReducer,
  caterings: CateringReducer,
  meals: MealsReducer,
  activities: ActivityReducer,
  orders: OrdersReducer,
  reports: ReportsReducer
});

const rootEpic = combineEpics<NiEpic>(
  ...peopleEpics,
  ...leaveRequestsEpics,
  ...personsEpics,
  ...authEpics,
  ...userMenuEpics,
  ...cateringsEpics,
  ...mealsEpics,
  ...activitiesEpics,
  ...ordersEpics,
  ...reportsEpics
);

export type RootState = ReturnType<typeof rootReducer>;

function configureStore() {
  const epicMiddleware = createEpicMiddleware<Action, Action, RootState, any>(
    { dependencies: { history: createBrowserHistory() } });

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic);
  return store;
}

export const store = configureStore();
