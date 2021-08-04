import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [incorrectSubmission, setIncorrectSubmission] = useState(false);
  const [message, setMessage] = useState("");
  const passwordStrength = new RegExp("(?=.{8,})");
  const { email, ID } = useParams();

  const submitPassword = async (f) => {
    f.preventDefault();
    if (!password) {
      setMessage("No password submitted");
      setIncorrectSubmission(true);
    } else if (!passwordStrength.test(password)) {
      setMessage("Password must be 8 characters or longer.");
      setIncorrectSubmission(true);
    }
    let res = await fetch("http://localhost:5000/api/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, ID, password, password2 }),
    });
    res = await res.json();
    if (res.success) {
      setIncorrectSubmission(false);
      setMessage(res.message);
    } else {
      setIncorrectSubmission(true);
      setMessage(res.message);
    }
  };
  return (
    <section className="sign-in">
      <div className="container">
        <div className="signin-content">
          <div className="signin-form">
            <h2 className="form-title">Reset Password</h2>
            <form className="add-form" onSubmit={submitPassword}>
              <div className="form-group">
                <label>
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
                <label>
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
              <div className="form-group form-button">
                <input
                  type="submit"
                  value="Reset Password"
                  className="form-submit"
                />
                <br />
                {incorrectSubmission ? (
                  <small style={{ color: "red" }}>{message}</small>
                ) : (
                  <small style={{ color: "green" }}>{message}</small>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
