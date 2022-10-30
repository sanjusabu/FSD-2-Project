import useInput from "../../hooks/useInput";
// import { useRequest } from "../../hooks/request-hook";
import "./vendor/bootstrap/css/bootstrap.min.css";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./fonts/iconic/css/material-design-iconic-font.min.css";
import "./vendor/animate/animate.css";
import "./vendor/css-hamburgers/hamburgers.min.css";
import "./vendor/animsition/css/animsition.min.css";
import "./vendor/select2/select2.min.css";
import "./vendor/daterangepicker/daterangepicker.css";
import "./css/util.css";
import "./css/main.css";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import image from "./images/bg-01.jpg";
const isEmail = (value) => value.includes("@");
const isPassword = (value) => value.trim().length >= 5;
let formValid = false;
const Login = () => {
  // <NavBar />
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // const { isError, clearError, sendRequest } = useRequest();

  const {
    value: emailValue,
    isValid: emailisValid,
    hasError: emailError,
    valueChangeHandler: emailChangeHandler,
    BlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordisValid,
    hasError: passwordError,
    valueChangeHandler: passwordChangeHandler,
    BlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);

  if (emailisValid && passwordisValid) {
    formValid = true;
  }
  if (!emailisValid || !passwordisValid) {
    formValid = false;
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formValid) {
      console.log("errorrrr");
      return;
    }

    // console.lo(isError);
    auth.login("loggedin");
    navigate("/profile");
    resetEmail();
    resetPassword();
  };
  return (
    <div>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="wrap-login100">
            <form
              className="login100-form validate-form"
              onSubmit={submitHandler}
            >
              <span className="login100-form-title p-b-34 p-t-27">Log in</span>
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter username"
              >
                <label for="username">User Name</label>
                <input
                  id="email"
                  className="input"
                  type="text"
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  value={emailValue}
                  name="Email"
                  placeholder="email"
                />
                {emailError && (
                  <p className="error-text">Please Enter a valid Email!</p>
                )}
              </div>
              <div
                class="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <label for="password">Password</label>
                <input
                  id="password"
                  className="input"
                  type="password"
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                  value={passwordValue}
                  name="Password"
                  placeholder="password"
                />
                {passwordError && (
                  <p className="error-text">
                    Password should be atleast 5 characters long!
                  </p>
                )}
              </div>
              <div class="contact100-form-checkbox">
                <input
                  class="input-checkbox100"
                  id="ckb1"
                  type="checkbox"
                  name="remember-me"
                />
                <label class="label-checkbox100" for="ckb1">
                  Remember me
                </label>
              </div>
              <button type="submit" disabled={!formValid} className="submit">
                Submit
              </button>
              <Link to="/register">
                <button className="submit">Switch to Register</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
