import useInput from "../../hooks/useInput";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useRequest } from "../../hooks/request-hook";
import NavBar from "../NavBar";
const isNotEmpty = (value) => value.trim() !== "";
const isnumber = (value) => value.includes("@");

const ForgotPassword = () => {
  const { sendRequest } = useRequest();
  const navigate = useNavigate();
  const location = useLocation();
  const [pass, setPass] = useState();
  const [text, setText] = useState();
  const [res, setRes] = useState();
  const [err, setErr] = useState(false);
  useEffect(() => {
    setPass(location.state.code);
    // console.log();
  }, []);

  const {
    value: passwordValue,
    isValid: passwordisValid,
    hasError: passwordError,
    valueChangeHandler: passwordChangeHandler,
    BlurHandler: passwordBlurHandler,
    reset: resetpassword,
  } = useInput(isNotEmpty);

  const {
    value: numberValue,
    isValid: numberisValid,
    hasError: numberError,
    valueChangeHandler: numberChangeHandler,
    BlurHandler: numberBlurHandler,
    reset: resetnumber,
  } = useInput(isnumber);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(location.state);
    if (numberValue == location.state.code) {
      const response = await sendRequest(
        "https://fsdproject2.onrender.com/users/resetPassword",
        "POST",
        JSON.stringify({
          email: location.state.email,
          password: passwordValue,
        }),
        { "Content-Type": "application/json" }
      );
      // console.log(response);
      setErr(true);
      setRes(response.message);
      resetpassword();
      resetnumber();
      // navigate("/login");
    } else {
      setText("The code entered is wrong, please try again");
      setErr(true);
    }
  };
  return (
    <div className="backgroundimg">
      <NavBar />
      <div className="formcontainer-forgotpassword">
        <form onSubmit={submitHandler}>
          <div className="form-forgotpassword">
            <div className="img">
              <img
                src="https://www.linkpicture.com/q/logo_356.png"
                className="logo"
                alt="logo"
              />
            </div>
            <div className="title">Forgot Password</div>
            <div className="input-container ic1">
              {/* <label>Enter Code</label> */}
              <input
                type="number"
                className="input"
                onChange={numberChangeHandler}
                onBlur={numberBlurHandler}
                value={numberValue}
                placeholder="Code Received through Email"
              />
            </div>

            <div className="input-container ic2">
              {/* <label>Enter New Password</label> */}
              <input
                type="text"
                className="input"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                value={passwordValue}
                placeholder="New Password"
              />
            </div>
            {/* <button type="submit">Submit</button> */}
            <button type="submit" className="submit">
              Submit
            </button>
            <br />
            <br />
            {err && text && <h5 style={{ color: "red" }}>{text}</h5>}
            {err && res && <h5 style={{ color: "red" }}>{res}</h5>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
