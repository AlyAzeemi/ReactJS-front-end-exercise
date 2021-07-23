import { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectSubmission, setIncorrectSubmission] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const submitCredentials = (f) => {
    f.preventDefault();
    if (!email) {
      alert("Email cannot be left empty");
    } else if (!password) {
      alert("No password provided");
    } else {
      //CallLoginFunc
      const res = false;
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
        <input type="submit" value="Login" className="btn btn-block" />
        {incorrectSubmission && (
          <small style={{ color: "red" }}>{errMessage}</small>
        )}
      </form>
      <Link to="../signup">
        <button className="btn btn-block">Don't have an account? Signup</button>
      </Link>
    </div>
  );
};

export default Login;
