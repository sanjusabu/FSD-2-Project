import useInput from "../../hooks/useInput";
import { useEffect, useState, useContext } from "react";
import { Portfoliocontext } from "../../context/portfolio-context";
import "./portfolioForm.css";

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
    console.log("triggered");
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
    <div className="center">
      <h1>Add Portfolio</h1>
      <form onSubmit={submitHandler}>
        <div className="inputbox">
          <input
            id="name"
            type="text"
            value={portName}
            placeholder="Name of Portfolio"
            onChange={portChange}
          />
        </div>
        <div className="inputbox">
          <input
            id="platform"
            type="text"
            placeholder="Platform"
            value={platformName}
            onChange={platformChange}
          />
        </div>
        <div className="inputbox">
          <select id="type" value={type} onChange={typeChange}>
            <option>Select Type Of Portfolio</option>
            <option value="Equity">Equity</option>
            <option value="Cryptocurrency">Cryptocurrency</option>
          </select>
        </div>
        <div className="inputbox">
          <input
            id="openingDate"
            type="date"
            placeholder="Opening Date"
            value={openingDate}
            onChange={openingDateChange}
          />
        </div>
        <div className="inputbox">
        <button disabled={!formValid} type="submit">
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioForm;
