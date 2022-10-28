import useInput from "../../hooks/useInput";
import { useEffect, useState, useContext } from "react";
const isNotEmpty = (value) => value.trim() !== "";
const PortfolioForm = (props) => {
  const [formValid, setformValid] = useState(false);
  const {
    value: portName,
    valueChangeHandler: portChange,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: platformName,
    valueChangeHandler: platformChange,
    reset: resetPlatform,
  } = useInput(isNotEmpty);

  useEffect(() => {
    if (platformName && portName) {
      setformValid(true);
    } else {
      setformValid(false);
    }
  }, [platformName, portName]);
  const submitHandler = async (e) => {
    e.preventDefault();
    props.formdets({
      portfolio: portName,
      platform: platformName,
    });
    resetName();
    resetPlatform();
  };
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label for="name" style={{ color: "black" }}>
          Name of Portfolio
        </label>
        <input id="name" type="text" value={portName} onChange={portChange} />
      </div>

      <div>
        <label for="platform" style={{ color: "black" }}>
          Platform
        </label>
        <input
          id="platform"
          type="text"
          value={platformName}
          onChange={platformChange}
        />

        <button disabled={!formValid} className="button-20" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default PortfolioForm;
