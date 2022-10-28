// import NavBar from "../NavBar/Navbar"
import useInput from "../../hooks/useInput";
// import { useRequest } from "../../hooks/useInput"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import ErrorModal from "../../Design/UIElements/ErrorModal"
import { useState } from "react";
// import { setDriver } from "mongoose";

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
    <>
      {/* <NavBar /> */}
      {/* <ErrorModal error={isError} onClear={clearError} /> */}

      <form onSubmit={submitHandler}>
        <div className="form">
          <div className="title">Registration Form</div>
          <div className="subtitle">Let's create your account!</div>
          <div className="input-container ic1">
            <label for="name">Name</label>
            <input
              id="name"
              className="input"
              type="text"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={nameValue}
              placeholder="name"
            />

            {/* <div className="cut"></div> */}

            {nameError && <p className="error-text">Please Enter a Name!</p>}
          </div>
          <div className="input-container ic2">
            <label for="email">Email</label>
            <input
              id="email"
              className="input"
              type="text"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={emailValue}
              placeholder="email"
            />
            {/* <div className="cut cut-short"></div> */}

            {emailError && (
              <p className="error-text">Please Enter a valid Email!</p>
            )}
          </div>
          <div className="input-container ic2">
            <label for="password">Set Password</label>
            <input
              id="password"
              className="input"
              type="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={passwordValue}
              placeholder="password"
            />
            {/* <div className="cut"></div> */}
            {passwordError && (
              <p className="error-text">
                Password should be atleast 5 characters long!
              </p>
            )}
          </div>
          <div className="input-container ic2">
            <label for="mobile">Mobile Number</label>
            <input
              id="mobile"
              className="input"
              type="number"
              onChange={numberChangeHandler}
              onBlur={numberBlurHandler}
              value={numberValue}
              placeholder="mobile"
            />

            {/* <div className="cut cut-short"></div> */}
            {numberError && (
              <p className="error-text">Mobile Number should have 10 digits!</p>
            )}

            {/* {<p style={{ color: "red" }}>{isError}</p>} */}
          </div>
          <button type="submit" disabled={!formValid} className="submit">
            Submit
          </button>

          <Link to="/login">
            <button className="submit">Switch to Login</button>
          </Link>
        </div>
        {mess}
      </form>
    </>
  );
};

export default Register;
