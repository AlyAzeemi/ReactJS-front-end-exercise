import { useState } from "react";
import { Link } from "react-router-dom";

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
