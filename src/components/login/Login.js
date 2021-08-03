import { useState } from "react";
import { Link } from "react-router-dom";

import signInImage from "../../static/images/signin-image.jpg";

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
    <section className="sign-in">
      <div className="container">
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <img src={signInImage} alt="sing up" />
            </figure>
            <Link to="/signup" className="signup-image-link">
              Create an account
            </Link>
          </div>

          <div className="signin-form">
            <h2 className="form-title">Log In</h2>
            <form
              onSubmit={submitCredentials}
              className="register-form"
              id="login-form"
            >
              <div className="form-group">
                <label for="your_name">
                  <i className="zmdi zmdi-email"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(val) => {
                    setEmail(val.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label for="your_pass">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="your_pass"
                  id="your_pass"
                  placeholder="Password"
                  value={password}
                  onChange={(val) => {
                    setPassword(val.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="agree-term"
                />
                <label for="remember-me" className="label-agree-term">
                  <span>
                    <span></span>
                  </span>
                  Remember me
                </label>
              </div>
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  className="form-submit"
                  value="Log in"
                />
              </div>
              {incorrectSubmission ? (
                <small style={{ color: "red" }}>{message}</small>
              ) : (
                <small style={{ color: "green" }}>{message}</small>
              )}
              <Link to="/resetPassword">Forgot Password?</Link>
            </form>
            <div className="social-login">
              <span className="social-label">Or login with</span>
              <ul className="socials">
                <li>
                  <Link to="#">
                    <i className="display-flex-center zmdi zmdi-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="display-flex-center zmdi zmdi-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="display-flex-center zmdi zmdi-google"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
