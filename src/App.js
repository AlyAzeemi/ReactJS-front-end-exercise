import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import LandingPage from "./components/login/LandingPage";
import Header from "./components/login/Header";
function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Route path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </div>
    </Router>
  );
}

export default App;
