import { useState } from "react";
import { Link } from "react-router-dom";
import signUpImage from "../../static/images/signup-image.jpg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [incorrectSubmission, setIncorrectSubmission] = useState(false);
  const [message, setMessage] = useState("");
  const passwordStrength = new RegExp("(?=.{8,})");
  const emailRE =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const callSignupAPI = async (email, username, password, password2) => {
    try {
      //Contact API
      console.log("API call function launched");
      const credentials = { email, username, password, password2 };
      let res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      res = await res.json();

      //Process response
      if (res.success) {
        setIncorrectSubmission(false);
        setMessage(res.message);
        //return <Redirect to="../login" />;
      } else {
        console.log("ah so ka");
        setIncorrectSubmission(true);
        setMessage(res.message);
      }
    } catch (e) {
      console.log(`Error during:${e}`);
      setIncorrectSubmission(true);
      setMessage(e);
    }
  };

  const submitCredentials = async (f) => {
    f.preventDefault();
    if (!email) {
      setMessage("No email provided");
      setIncorrectSubmission(true);
    } else if (!emailRE.test(email)) {
      setMessage("Invalid email");
      setIncorrectSubmission(true);
    } else if (!username) {
      setMessage("No username provided");
      setIncorrectSubmission(true);
    } else if (!password) {
      setMessage("No password submitted");
      setIncorrectSubmission(true);
    } else if (!passwordStrength.test(password)) {
      setMessage("Password must be 8 characters or longer.");
      setIncorrectSubmission(true);
    } else if (password !== password2) {
      setMessage("Passwords do not match");
      setIncorrectSubmission(true);
    } else {
      //Clear variables anyways
      setIncorrectSubmission(false);
      setMessage("");

      //CallSignUpFunc
      await callSignupAPI(email, username, password, password2);
    }
  };
  return (
    <section className="sign-up">
      <div className="container">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>
            <form
              onSubmit={submitCredentials}
              className="register-form"
              id="register-form"
            >
              <div className="form-group">
                <label for="name">
                  <i className="zmdi zmdi-account material-icons-name"></i>
                </label>
                <input
                  type="text"
                  name="username"
                  id="name"
                  placeholder="Username"
                  value={username}
                  onChange={(val) => {
                    setUsername(val.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label for="email">
                  <i className="zmdi zmdi-email"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(val) => {
                    setEmail(val.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label for="pass">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  placeholder="Password"
                  value={password}
                  onChange={(val) => {
                    setPassword(val.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label for="re-pass">
                  <i className="zmdi zmdi-lock-outline"></i>
                </label>
                <input
                  type="password"
                  name="re_pass"
                  id="re_pass"
                  placeholder="Repeat your password"
                  value={password2}
                  onChange={(val) => {
                    setPassword2(val.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="agree-term"
                  id="agree-term"
                  className="agree-term"
                />
                <label for="agree-term" className="label-agree-term">
                  <span>
                    <span></span>
                  </span>
                  I agree all statements in{" "}
                  <Link to="/TermsOfService" className="term-service">
                    Terms of service
                  </Link>
                </label>
              </div>
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  className="form-submit"
                  value="Register"
                />
              </div>
              {incorrectSubmission ? (
                <small style={{ color: "red" }}>{message}</small>
              ) : (
                <small style={{ color: "green" }}>{message}</small>
              )}
            </form>
          </div>
          <div className="signup-image">
            <figure>
              <img src={signUpImage} alt="sing up" />
            </figure>
            <Link to="/login" className="signup-image-link">
              I am already member
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
