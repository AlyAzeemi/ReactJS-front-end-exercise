import { Route, Redirect } from "react-router-dom";
import { useLocation } from "react-router";

const GuardedRoute = ({ component: Component, auth, compProps, ...rest }) => {
  let location = useLocation();
  let RedirectPath = "";
  if (location.pathname === "/dashboard") {
    RedirectPath = "/login";
  } else {
    RedirectPath = "/dashboard";
    auth = !auth;
  }

  return (
    <Route
      {...rest}
      render={() =>
        auth === true ? (
          <Component {...compProps} />
        ) : (
          <Redirect to={RedirectPath} />
        )
      }
    />
  );
};

export default GuardedRoute;
