import useInput from "../../hooks/useInput";
import { useEffect, useState, useContext } from "react";
import { Portfoliocontext } from "../../context/portfolio-context";
import { Reloadcontext } from "../../context/reload-context";
import "./portfolioForm.css";
import { useRequest } from "../../hooks/request-hook";
const isNotEmpty = (value) => value.trim() !== "";
const PortfolioForm = (props) => {
  const port = useContext(Portfoliocontext);
  const reload = useContext(Reloadcontext);
  const { sendRequest } = useRequest();

  const [formValid, setformValid] = useState(false);

  const logolist = [
    {
      name: "Zerodha",
      address:
        "https://www.freelogovectors.net/wp-content/uploads/2021/12/zerodha-logo-freelogovectors.net_.png",
    },
    {
      name: "Groww",
      address:
        "https://upload.wikimedia.org/wikipedia/commons/b/bb/Groww_app_logo.png",
    },
    {
      name: "Upstox",
      address:
        "https://www.pngfind.com/pngs/m/95-958216_upstox-offers-free-demat-account-for-7-days.png",
    },
    {
      name: "ICICI",
      address: "https://secure.icicidirect.com/BaseMasterPage/images/logo.jpg",
    },
    {
      name: "WazirX",
      address: "https://wazirx.com/static/media/wazirx-logo-blue.8f74de7a.png",
    },
    { name: "Angel Broking", address: "https://angelones.in/images/angel.png" },
    {
      name: "5Paisa",
      address:
        "https://assets.smallcase.com/images/publishers/fivepaisa/logo.png",
    },
    {
      name: "Paytm",
      address:
        "https://upload.wikimedia.org/wikipedia/commons/e/e8/Paytm_Money_Logo.png",
    },
    {
      name: "Kotak",
      address: "https://assets.smallcase.com/images/publishers/kotak/logo.png",
    },
    {
      name: "Sharekhan",
      address:
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Official_Logo_of_Sharekhan_by_BNP_Paribas.png",
    },
  ];
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
    const newimg = logolist.filter(
      (dat) => dat.name.toLowerCase() === platformName.toLowerCase()
    );

    const response = await sendRequest(
      "http://localhost:5011/port/form",
      "POST",
      JSON.stringify({
        portfolio: portName,
        platform: platformName,
        type: type,
        openingDate: openingDate,
        images: newimg,
        id: localStorage.getItem("user"),
      }),
      { "Content-Type": "application/json" }
    );
    console.log(response, "dfkfjgekljgdekl");
    reload.rd = true;
    port.portfolio.push({
      portfolio: portName,
      platform: platformName,
      type: type,
      openingDate: openingDate,
      images: newimg,
    });
    // console.log(port);

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
