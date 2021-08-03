import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import LandingPage from "./components/login/LandingPage";
import ResetPassword from "./components/login/ResetPassword";
import Dashboard from "./components/Dashboard";
import GuardedRoute from "./middleware/GuardedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [JWToken, setJWToken] = useState(null);

  const checkWhetherAuthenticated = async () => {
    const cookieHeader = document.cookie;
    const cookies = cookieHeader.split(";");
    let sortedCookies = {};
    cookies.forEach((val) => {
      let cookie = val.split("=");
      sortedCookies[`${cookie[0].trim()}`] = cookie[1];
    });
    if (sortedCookies.JWToken !== "" && sortedCookies.JWToken !== undefined) {
      setIsAuthenticated(true);
      setJWToken(sortedCookies.JWToken);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkWhetherAuthenticated()
      .then(() => {
        console.log(
          `UseEffect ran and set isAuthenticated to ${isAuthenticated}`
        );
      })
      .catch((e) => console.error(`${e}`));
  }, [isAuthenticated]);

  return (
    <Router>
      <Switch>
        <GuardedRoute
          exact
          path="/"
          component={LandingPage}
          auth={isAuthenticated}
        />
        <GuardedRoute
          path="/login"
          component={Login}
          compProps={{ setIsAuthenticated }}
          auth={isAuthenticated}
        />
        <GuardedRoute
          path="/signup"
          component={Signup}
          auth={isAuthenticated}
        />
        <GuardedRoute
          path="/resetpassword"
          component={ResetPassword}
          auth={isAuthenticated}
        />
        <GuardedRoute
          path="/dashboard"
          component={Dashboard}
          compProps={{ setIsAuthenticated, JWToken }}
          auth={isAuthenticated}
        />
      </Switch>
    </Router>
  );
}

export default App;
