import { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
const axios = require("axios").default;

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
      try {
        const credentials = { email, username, password, password2 };
        const res = await axios.post(
          "http://localhost:5000/api/signup",
          credentials
        );
        console.log(res);
        if (res.data.success) {
          setIncorrectSubmission(false);
          setMessage(res.data.message);
          //return <Redirect to="../login" />;
        } else {
          setIncorrectSubmission(true);
          setMessage(res.data.message);
        }
      } catch (e) {
        console.log(`Error during`);
        setIncorrectSubmission(true);
        setMessage(e);
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
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(val) => {
              setUsername(val.target.value);
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
        <div className="form-control">
          <label>Confirm Password</label>
          <input
            type="password"
            value={password2}
            onChange={(val) => {
              setPassword2(val.target.value);
            }}
            required
          />
        </div>
        <input type="submit" value="Signup" className="btn btn-block" />
        {incorrectSubmission ? (
          <small style={{ color: "red" }}>{message}</small>
        ) : (
          <small style={{ color: "green" }}>{message}</small>
        )}
      </form>

      <Link to="../login">
        <button className="btn btn-block">Login</button>
      </Link>
    </div>
  );
};

export default Signup;
