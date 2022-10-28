import useInput from "../../hooks/useInput";
import { useEffect, useState, useContext } from "react";
import { Portfoliocontext } from "../../context/portfolio-context";

const isNotEmpty = (value) => value.trim() !== "";
const PortfolioForm = (props) => {
  const port = useContext(Portfoliocontext);

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

  const {
    value: type,
    valueChangeHandler: typeChange,
    reset: resettype,
  } = useInput(isNotEmpty);

  const {
    value: openingDate,
    valueChangeHandler: openingDateChange,
    reset: resetopeningDate,
  } = useInput(isNotEmpty);

  useEffect(() => {
    if (platformName && portName && type && openingDate) {
      setformValid(true);
    } else {
      setformValid(false);
    }
  }, [platformName, portName, type, openingDate]);
  const submitHandler = async (e) => {
    e.preventDefault();

    port.portfolio.push({
      portfolio: portName,
      platform: platformName,
      type: type,
      openingDate: openingDate,
    });
    console.log(port);

    props.formdets({
      portfolio: portName,
      platform: platformName,
      type: type,
      openingDate: openingDate,
    });
    resetName();
    resetPlatform();
    resettype();
    resetopeningDate();
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
      </div>
      <div>
        <label for="type" style={{ color: "black" }}>
          Type Of Portfolio
        </label>
        <select id="type" value={type} onChange={typeChange}>
          <option>Select Type Of Portfolio</option>
          <option value="Equity">Equity</option>
          <option value="Cryptocurrency">Cryptocurrency</option>
        </select>
      </div>
      <div>
        <label for="openingDate" style={{ color: "black" }}>
          Opening Date
        </label>
        <input
          id="openingDate"
          type="date"
          value={openingDate}
          onChange={openingDateChange}
        />
      </div>
      <button disabled={!formValid} className="button-20" type="submit">
        Submit
      </button>
    </form>
  );
};

export default PortfolioForm;
