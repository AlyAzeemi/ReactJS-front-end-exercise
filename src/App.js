import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import LandingPage from "./components/login/LandingPage";
import Header from "./components/login/Header";
import ResetPassword from "./components/login/ResetPassword";
import Dashboard from "./components/Dashboard";

function App() {
  const checkWhetherAuthenticated = () => {
    const cookieHeader = document.cookie;
    const cookies = cookieHeader.split(";");
    let sortedCookies = {};
    cookies.forEach((val) => {
      let cookie = val.split("=");
      sortedCookies[`${cookie[0].trim()}`] = cookie[1];
    });
    console.log(sortedCookies);

    if (sortedCookies.JWToken) {
      setIsAuthenticated(true);
    }
    return "";
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/resetpassword" component={ResetPassword} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
