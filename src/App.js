import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import LandingPage from "./components/login/LandingPage";
import ResetPassword from "./components/login/ResetPassword";
import Dashboard from "./components/Dashboard";

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
    if (sortedCookies.JWToken) {
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
        <Route
          exact
          path="/"
          render={(props) =>
            isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <LandingPage {...props} />
            )
          }
        />
        <Route
          path="/login"
          render={(props) =>
            isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <Login {...props} setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/signup"
          render={(props) =>
            isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <Signup {...props} />
            )
          }
        />
        <Route
          path="/resetpassword"
          render={(props) =>
            isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <ResetPassword {...props} />
            )
          }
        />
        <Route
          path="/dashboard"
          render={(props) =>
            isAuthenticated ? (
              <Dashboard
                {...props}
                setIsAuthenticated={setIsAuthenticated}
                JWToken={JWToken}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
