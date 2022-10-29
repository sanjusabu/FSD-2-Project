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

  const [page, setPage] = useState(0);

  const FormTitles = ["Portfolio Name", "Platform", "Type", "Opening Date"];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <div>
          <input
            id="name"
            type="text"
            value={portName}
            placeholder="Name of Portfolio"
            onChange={portChange}
          />
        </div>
      );
    } else if (page === 1) {
      return (
        <div>
          <input
            id="platform"
            type="text"
            placeholder="Platform"
            value={platformName}
            onChange={platformChange}
          />
        </div>
      );
    } else if (page === 2) {
      return (
        <div>
          <select id="type" value={type} onChange={typeChange}>
            <option>Select Type Of Portfolio</option>
            <option value="Equity">Equity</option>
            <option value="Cryptocurrency">Cryptocurrency</option>
          </select>
        </div>
      );
    } else {
      return (
        <div>
          <input
            id="openingDate"
            type="date"
            placeholder="Opening Date"
            value={openingDate}
            onChange={openingDateChange}
          />
        </div>
      );
    }
  };

  return (
    <div className="portform">
      <div className="progressbar">
        <div
          style={{
            width:
              page === 0
                ? "25%"
                : page == 1
                ? "50%"
                : page == 2
                ? "75%"
                : "100%",
          }}
        ></div>
      </div>
      <div className="portform-container">
        <form onSubmit={submitHandler}>
          <div className="header">
            <h1>{FormTitles[page]}</h1>
          </div>
          <div className="body">{PageDisplay()}</div>
          <div className="footer">
            <button
              disabled={page == 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              Prev
            </button>
            <button
              disabled={page == 3}
              onClick={() => {
                setPage((currPage) => currPage + 1);
              }}
            >
              Next
            </button>
          </div>

          <button disabled={!formValid} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PortfolioForm;
