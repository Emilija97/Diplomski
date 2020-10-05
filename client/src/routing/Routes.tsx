import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../auth/login/Login';
import RecoverAccount from '../auth/recover-account/RecoverAccount';
import Register from '../auth/register/Register';
import { UserType } from '../auth/store';
import Dashboard from '../dashboard/Dasboard';
import CreateEditPerson from '../employee/create-edit-person/CreateEditPerson';
import UserProfile from '../employee/user-profile/UserProfile';
import Catering from '../food/catering/Catering';
import Caterings from '../food/catering/Caterings';
import FoodDashboard from '../food/FoodDashboard';
import MealForm from '../food/meals/MealForm';
import Meals from '../food/meals/Meals';
import CateringMeals from '../food/orders/components/CateringMeals';
import UsersWeeklyOrders from '../food/orders/components/UsersWeeklyOrders';
import UserWeeklyOrders from '../food/orders/components/UserWeeklyOrders';
import WeeklyOrders from '../food/orders/components/WeeklyOrders';
import HomePage from '../home/HomePage';
import LoadingScreen from '../home/LoadingScreen';
import CreateLeaveRequest from '../leave-requests/components/CreateLeaveRequest';
import LeaveRequestRescheduler from '../leave-requests/components/LeaveRequestRescheduler';
import LeaveRequests from '../leave-requests/components/LeaveRequests';
import People from '../people/People';
import Reports from '../reports/components/Reports';
import PersonalInformation from '../user-menu/components/PersonalInformation';
import UserAccess from '../user-menu/components/UserAccess';
import PrivateRoute from './PrivateRoute';

function Routes() {

  const foodRoutes = () => {
    return (
      <Switch>
        <PrivateRoute component={FoodDashboard} path="/food"
          roles={[UserType.ADMIN, UserType.HR]} />

        <PrivateRoute exact={true} component={Caterings} path="/caterings"
          roles={[UserType.ADMIN, UserType.HR]} />

        <PrivateRoute exact={true} component={Catering} path="/caterings/:cateringId"
          roles={[UserType.ADMIN, UserType.HR]} />

        <PrivateRoute exact={true} component={Meals} path="/caterings/:cateringId/meal-types/:mealType"
          roles={[UserType.ADMIN, UserType.HR]} />

        <PrivateRoute component={MealForm} path="/caterings/:cateringId/meal-types/:mealType/form/:mealId?"
          roles={[UserType.ADMIN, UserType.HR]} />

        <PrivateRoute exact={true} component={WeeklyOrders} path="/weekly-orders"
          roles={[UserType.ADMIN, UserType.HR, UserType.EMPLOYEE]} />

        <PrivateRoute exact={true} component={UsersWeeklyOrders} path="/orders"
          roles={[UserType.ADMIN, UserType.HR]} />

        <PrivateRoute component={UserWeeklyOrders} path="/orders/:userId/:date"
          roles={[UserType.ADMIN, UserType.HR]} />

        <PrivateRoute exact={true} component={CateringMeals}
          path="/weekly-orders/:day/:order?/:catering?/:mealType?"
          roles={[UserType.ADMIN, UserType.HR, UserType.EMPLOYEE]} />
      </Switch>
    )
  }

  const authRoutes = () => {
    return (
      <Switch>
        <Route path="/login"><Login /></Route>
        <Route path="/register"><Register /></Route>
        <Route path="/loading"><LoadingScreen /></Route>
        <Route path="/recover-account"><RecoverAccount /></Route>
      </Switch>
    )
  }

  const leaveRequestsRoutes = () => {
    return (
      <Switch>
        <PrivateRoute component={LeaveRequests} path="/requests" />
        <Route path="/create-request"><CreateLeaveRequest /></Route>
        <Route path="/rescheduler"><LeaveRequestRescheduler /></Route>
      </Switch>
    )
  }

  const userAccessRoutes = () => {
    return (
      <Switch>
        <Route path="/user-access" ><UserAccess /></Route>
        <Route path="/personal-information/:id" ><PersonalInformation /></Route>
      </Switch>
    )
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><HomePage /></Route>
        <PrivateRoute component={Dashboard} path="/dashboard" />
        <PrivateRoute component={People} path="/people" />
        <PrivateRoute component={UserProfile} path="/user-profile/:id" />
        <Route exact path="/create-edit-person"><CreateEditPerson /></Route>
        <Route path="/create-edit-person/:id"><CreateEditPerson /></Route>
        <Route path="/work-reports"><Reports /></Route>
      </Switch>
      {authRoutes()}
      {leaveRequestsRoutes()}
      {foodRoutes()}
      {userAccessRoutes()}
    </BrowserRouter>
  )
}

export default Routes;