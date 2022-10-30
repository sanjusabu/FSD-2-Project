// import NavBar from "../NavBar/Navbar"
import useInput from "../../hooks/useInput";
// import { useRequest } from "../../hooks/useInput"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import ErrorModal from "../../Design/UIElements/ErrorModal"
import { useState } from "react";
// import { setDriver } from "mongoose";
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
import image from "./images/bg-01.jpg";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isPassword = (value) => value.trim().length >= 5;
// console.log(isPassword.value)
const number = (value) => value.trim().length === 10;
let formValid = false;

const Register = () => {
  const navigate = useNavigate();
  // const { isError, clearError, sendRequest } = useRequest();
  const [mess, setmess] = useState("");
  const [err, seterr] = useState(false);
  // const auth = useContext(AuthContext)
  const {
    value: nameValue,
    isValid: nameisValid,
    hasError: nameError,
    valueChangeHandler: nameChangeHandler,
    BlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

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

  const {
    value: numberValue,
    isValid: numberisValid,
    hasError: numberError,
    valueChangeHandler: numberChangeHandler,
    BlurHandler: numberBlurHandler,
    reset: resetNumber,
  } = useInput(number);

  if (nameisValid && emailisValid && passwordisValid && numberisValid) {
    formValid = true;
  }
  if (!nameisValid || !emailisValid || !passwordisValid || !numberisValid) {
    formValid = false;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formValid) {
      console.log("errorrrr");
      return;
    }
    // console.log(nameValue,emailValue,passwordValue,numberValue)
    navigate("/login");
    resetName();
    resetEmail();
    resetPassword();
    resetNumber();
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
              <span className="login100-form-title p-b-34 p-t-27">
                Register
              </span>
              <span className="login100-form-title p-b-34 p-t-27">
                Let's Create Your Account
              </span>
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter name"
              >
                <label for="name">Name</label>
                <input
                  id="name"
                  className="input"
                  type="text"
                  onChange={nameChangeHandler}
                  value={nameValue}
                  name="Username"
                  placeholder="name"
                />
                {nameError && (
                  <p className="error-text">Please Enter a Name!</p>
                )}
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter Email"
              >
                <label for="email">Email</label>
                <input
                  id="email"
                  className="input"
                  type="text"
                  onChange={emailChangeHandler}
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
                <label for="password">Set Password</label>
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
              <div
                class="wrap-input100 validate-input"
                data-validate="Enter Mobilenumber"
              >
                <label for="mobile">Mobile Number</label>
                <input
                  id="mobile"
                  className="input"
                  type="number"
                  onChange={numberChangeHandler}
                  onBlur={numberBlurHandler}
                  value={numberValue}
                  name="Mobile Number"
                  placeholder="mobile"
                />
                {numberError && (
                  <p className="error-text">
                    Mobile Number should have 10 digits!
                  </p>
                )}
              </div>
              <button type="submit" disabled={!formValid} className="submit">
                Submit
              </button>

              <Link to="/login">
                <button className="submit">Switch to Login</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
