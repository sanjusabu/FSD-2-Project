import useInput from "../../hooks/useInput";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useRequest } from "../../hooks/request-hook";
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
    console.log();
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
    console.log(location.state);
    if (numberValue == location.state.code) {
      const response = await sendRequest(
        "http://localhost:5011/users/resetPassword",
        "POST",
        JSON.stringify({
          email: location.state.email,
          password: passwordValue,
        }),
        { "Content-Type": "application/json" }
      );
      console.log(response);
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
    <div>
      <form onSubmit={submitHandler}>
        <label>Enter Code</label>
        <input
          type="number"
          onChange={numberChangeHandler}
          onBlur={numberBlurHandler}
          value={numberValue}
        />

        <label>Enter New Password</label>
        <input
          type="text"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={passwordValue}
        />
        <button type="submit">Submit</button>
        {err && text && <h5 style={{ color: "red" }}>{text}</h5>}
        {err && res && <h5 style={{ color: "red" }}>{res}</h5>}
      </form>
    </div>
  );
};

export default ForgotPassword;
