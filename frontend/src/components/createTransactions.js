import useInput from "../hooks/useInput";
import { useEffect, useState, useContext } from "react";
import { Detailscontext } from "../context/details";
import { Portfoliocontext } from "../context/portfolio-context";
import "./createTransactions.css";

const isNotEmpty = (value) => value.trim() !== "";
const CreateTransactions = (props) => {
  const dets = useContext(Detailscontext);
  const [formValid, setformValid] = useState(false);
  const port = useContext(Portfoliocontext);

  // console.log(port.portfolio);

  const {
    value: Portfolio,
    valueChangeHandler: PortfolioChange,
    reset: resetPortfolio,
  } = useInput(isNotEmpty);

  const {
    value: Ticker,
    valueChangeHandler: taskChange,
    reset: resetTask,
  } = useInput(isNotEmpty);
  const {
    value: actionvalue,
    valueChangeHandler: actionChange,
    reset: resetAction,
  } = useInput(isNotEmpty);
  const {
    value: quantity,
    valueChangeHandler: quanChange,
    reset: resetQuantity,
  } = useInput(isNotEmpty);
  const {
    value: startDate,
    valueChangeHandler: startChange,
    reset: resetStart,
  } = useInput(isNotEmpty);
  const {
    value: price,
    valueChangeHandler: priceChange,
    reset: resetPrice,
  } = useInput(isNotEmpty);

  const { valueChangeHandler: totalChange, reset: resetTotal } =
    useInput(isNotEmpty);
  useEffect(() => {
    if (Portfolio && Ticker && startDate && quantity && price && actionvalue) {
      setformValid(true);
    } else {
      setformValid(false);
    }
  }, [Portfolio, Ticker, startDate, quantity, price, actionvalue]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // dets.details.push({ Ticker });
    // console.log(dets);
    props.takedetails({
      Portfolio: Portfolio,
      Ticker: Ticker,
      Date: startDate,
      quantity: quantity,
      price: price,
      action: actionvalue,
      total: quantity * price,
    });
    resetPortfolio();
    resetTask();
    resetStart();
    resetTotal();
    resetPrice();
    resetQuantity();
    resetAction();
    setPage(0);
  };

  const [page, setPage] = useState(0);

  const FormTitles = [
    "Which Portfolio?",
    "Ticker",
    "Date of Transaction",
    "How Many Stocks Bought or Sold?",
    "Price",
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <div>
          <select
            name="Portfolio"
            id="Portfolio"
            value={Portfolio}
            onChange={PortfolioChange}
          >
            <option> Select--an--option</option>
            {port.portfolio.map((data) => {
              return <option value={data.portfolio}>{data.portfolio}</option>;
            })}
          </select>
        </div>
      );
    } else if (page === 1) {
      return (
        <div>
          <input
            id="name"
            type="text"
            placeholder="Enter the Stock Ticker"
            value={Ticker}
            onChange={taskChange}
          />
        </div>
      );
    } else if (page === 2) {
      return (
        <div>
          <input
            id="start"
            type="date"
            value={startDate}
            onChange={startChange}
          />
        </div>
      );
    } else if (page === 3) {
      return (
        <div className="traninput">
          <select
            name="Priority"
            id="Priority"
            value={actionvalue}
            onChange={actionChange}
          >
            <option> Select--an--option</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
          <input
            id="name"
            type="number"
            placeholder="Enter the Quantity"
            value={quantity}
            onChange={quanChange}
          />
        </div>
      );
    } else {
      return (
        <div className="traninput">
          <input
            id="name"
            type="number"
            placeholder="Enter the Price"
            value={price}
            onChange={priceChange}
          />
          <input
            id="name"
            type="number"
            value={quantity * price}
            onChange={totalChange}
          />
        </div>
      );
    }
  };
  return (
    <div className="tranform">
      <div className="progressbar">
        <div
          style={{
            width:
              page === 0
                ? "20%"
                : page === 1
                ? "40%"
                : page === 2
                ? "60%"
                : page === 3
                ? "80%"
                : "100%",
          }}
        ></div>
      </div>
      <div className="tranform-container">
        <form>
          <div className="header">
            <h1>{FormTitles[page]}</h1>
          </div>
          <div className="body">{PageDisplay()}</div>
          <div className="footer">
            <button
              disabled={page === 0}
              onClick={(e) => {
                e.preventDefault();
                setPage((currPage) => currPage - 1);
              }}
            >
              Prev
            </button>
            <button
              disabled={page === 4}
              onClick={(e) => {
                e.preventDefault();
                setPage((currPage) => currPage + 1);
              }}
            >
              Next
            </button>
          </div>
          <button
            disabled={!formValid}
            type="submit"
            onClick={submitHandler}
          >
            Submit Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTransactions;
