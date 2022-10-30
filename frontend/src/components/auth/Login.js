import useInput from "../../hooks/useInput";
// import { useRequest } from "../../hooks/request-hook";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../auth/logo.png";
import NavBar from "../NavBar";
const isEmail = (value) => value.includes("@");
const isPassword = (value) => value.trim().length >= 5;
let formValid = false;

const Login = () => {
  // <NavBar />
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={handleOnChange} />
        <span style={{ color: "white" }}> {label}</span>
      </label>
    );
  };

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
    <div className="backgroundimg">
      <NavBar />
      <div className="formcontainer">
        <form onSubmit={submitHandler}>
          {/* {console.log(isError)} */}
          <div className="form">
            <div className="img">
              <img src={logo} className="logo" alt="logo" />
            </div>
            <div className="title">Login</div>

            <div className="input-container ic1">
              <input
                id="email"
                className="input"
                type="text"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={emailValue}
                placeholder="Email"
              />

              {emailError && (
                <p className="error-text">Please Enter a valid Email!</p>
              )}
            </div>
            <div className="input-container ic2">
              <input
                id="lastname"
                className="input"
                type="password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                value={passwordValue}
                placeholder="Password"
              />
              {passwordError && (
                <p className="error-text">
                  Password should be atleast 5 characters long!
                </p>
              )}

              {/* {<p style={{ color: "red" }}>{isError}</p>} */}
            </div>
            <br />
            <br />
            {/* <input
              type="checkbox"
              id="Remember me"
              name="Remember me"
              value="remember me"
              checked={isChecked}
              onChange={handleOnChange}
            />
            <label for="Remember me"> Remember me</label> */}
            <div>
              <Checkbox
                label="Remember me"
                value={isChecked}
                onChange={handleOnChange}
              ></Checkbox>
            </div>
            {/* {console.log(isError)} */}
            <button type="submit" disabled={!formValid} className="submit">
              Submit
            </button>
            <Link to="/register">
              <button className="submit">Switch to Register</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
