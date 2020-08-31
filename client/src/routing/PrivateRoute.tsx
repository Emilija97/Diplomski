import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { UserType } from "../auth/store";
import { RootState } from "../store/store";

interface PrivateRouteProps {
  component: () => JSX.Element,
  path: string,
  roles?: UserType[],
  exact?: boolean
}

function PrivateRoute(props: PrivateRouteProps) {
  const { loggedUserType } = useSelector((state: RootState) => state.auth);

  return (
    <Route exact={props.exact} path={props.path} render={(renderProps) => {
      if (loggedUserType === UserType.GUEST) {
        return (<Redirect to={{ pathname: "/login", state: { from: renderProps.location } }} />);
      }

      if (props.roles && !props.roles.includes(loggedUserType)) {
        return (<Redirect to={{ pathname: "/" }} />);
      }

      return React.createElement(props.component, { ...props, ...renderProps });
    }} />
  );
}

export default PrivateRoute;