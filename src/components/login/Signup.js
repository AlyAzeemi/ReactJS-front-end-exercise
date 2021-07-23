import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [incorrectSubmission, setIncorrectSubmission] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const submitCredentials = (f) => {
    f.preventDefault();
    if (!email) {
      setErrMessage("No email provided");
      setIncorrectSubmission(true);
    } else if (!password) {
      setErrMessage("No password submitted");
      setIncorrectSubmission(true);
    } else if (password !== password2) {
      setErrMessage("Passwords do not match");
      setIncorrectSubmission(true);
    } else {
      //Clear variables anyways
      setIncorrectSubmission(false);
      setErrMessage("");

      //CallSignUpFunc
      //const res = fetch('insertAPIEndPointHere',{});
      let res = false;
      if (res) {
        //Redirect
      } else {
        setIncorrectSubmission(true);
        setErrMessage(res);
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
        {incorrectSubmission && (
          <small style={{ color: "red" }}>{errMessage}</small>
        )}
        <Link to="../resetPassword">Forgot password?</Link>
      </form>

      <Link to="../login">
        <button className="btn btn-block">Login</button>
      </Link>
    </div>
  );
};

export default Signup;
