import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectSubmission, setIncorrectSubmission] = useState(false);
  const [message, setMessage] = useState("");
  const emailRE =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const callLoginAPI = async (email, password) => {
    try {
      //Contact API
      const credentials = { email, password };
      let res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      console.log(res);
      res = await res.json();
      if (res.success) {
        setMessage(res.message);
        setIncorrectSubmission(false);
        setIsAuthenticated(true);
      } else {
        setMessage(res.message);
        setIncorrectSubmission(true);
      }
    } catch (e) {
      console.log(`Error during login api call: ${e}`);
      setMessage(e);
      setIncorrectSubmission(true);
    }
  };

  const submitCredentials = async (f) => {
    //Validation Checks
    f.preventDefault();
    if (!email) {
      setMessage("No email provided");
      setIncorrectSubmission(true);
    } else if (!emailRE.test(email)) {
      setMessage("Invalid email");
      setIncorrectSubmission(true);
    } else if (!password) {
      setMessage("No password submitted");
      setIncorrectSubmission(true);
    } else {
      //Clear variables anyways
      setIncorrectSubmission(false);
      setMessage("");

      //CallLoginFunc
      await callLoginAPI(email, password);
    }
  };

  return (
    <div className="container">
      <Header />
      <form className="add-form" onSubmit={submitCredentials}>
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(val) => {
              setEmail(val.target.value);
            }}
            required
          />
        </div>

        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(val) => {
              setPassword(val.target.value);
            }}
            required
          />
        </div>
        <input type="submit" value="Login" className="btn btn-block" />
        {incorrectSubmission ? (
          <small style={{ color: "red" }}>{message}</small>
        ) : (
          <small style={{ color: "green" }}>{message}</small>
        )}
        <br />
        <Link to="../resetpassword">Forgot password?</Link>
      </form>
      <Link to="../signup" style={{ textDecoration: "none" }}>
        <button className="btn btn-block">Don't have an account? Signup</button>
      </Link>
    </div>
  );
};

export default Login;
