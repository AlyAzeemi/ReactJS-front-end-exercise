import { useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios").default;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectSubmission, setIncorrectSubmission] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const emailRE =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const submitCredentials = async (f) => {
    //Validation Checks
    f.preventDefault();
    if (!email) {
      setErrMessage("No email provided");
      setIncorrectSubmission(true);
    } else if (!emailRE.test(email)) {
      setErrMessage("Invalid email");
      setIncorrectSubmission(true);
    } else if (!password) {
      setErrMessage("No password submitted");
      setIncorrectSubmission(true);
    } else {
      //Clear variables anyways
      setIncorrectSubmission(false);
      setErrMessage("");

      //CallLoginFunc

      try {
        const credentials = { email, password };
        const res = await axios.post(
          "https://whispering-headland-59794.herokuapp.com/api/signup",
          credentials
        );
        if (res.status === 200) {
          //SetCookiesAndChangeState
          //Redirect
          console.log(res);
          console.log("Set cookies. \n Change state. \n Redirect. \n");
        } else {
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div>
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
        {incorrectSubmission && (
          <small style={{ color: "red" }}>{errMessage}</small>
        )}
        <Link to="../resetPassword">Forgot password?</Link>
      </form>
      <Link to="../signup">
        <button className="btn btn-block">Don't have an account? Signup</button>
      </Link>
    </div>
  );
};

export default Login;
