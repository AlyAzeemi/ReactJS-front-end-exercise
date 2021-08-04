import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [incorrectSubmission, setIncorrectSubmission] = useState("");
  const emailRE =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const callResetPasswordAPI = async (email) => {
    try {
      let res = await fetch("http://localhost:5000/api/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      res = await res.json();

      if (res.success) {
        setMessage(res.message);
        setIncorrectSubmission(false);
      } else {
        setMessage(res.message);
        setIncorrectSubmission(true);
      }
    } catch (e) {
      console.log(`Error during reset API call: ${e}`);
      setMessage(e);
      setIncorrectSubmission(true);
    }
  };

  const submitEmail = async (f) => {
    f.preventDefault();
    if (!email) {
      setMessage("No email provided");
      setIncorrectSubmission(true);
    } else if (!emailRE.test(email)) {
      setMessage("Invalid email");
      setIncorrectSubmission(true);
    }
    //Call API
    await callResetPasswordAPI(email);
  };
  return (
    <section className="sign-in">
      <div className="container">
        <div className="signin-content">
          <div className="signin-form">
            <h2 className="form-title">Reset Password</h2>
            <form className="add-form" onSubmit={submitEmail}>
              <div className="form-group">
                <label>
                  <i className="zmdi zmdi-email"></i>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(val) => {
                    setEmail(val.target.value);
                  }}
                  required
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

              <Link to="/login">Back to Login</Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
