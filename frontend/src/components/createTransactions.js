import useInput from "../hooks/useInput";
import { useEffect, useState, useContext } from "react";
import { Detailscontext } from "../context/details";
const isNotEmpty = (value) => value.trim() !== "";
const CreateTransactions = (props) => {
  const dets = useContext(Detailscontext);
  const [formValid, setformValid] = useState(false);

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
    if (Ticker && startDate && quantity && price && actionvalue) {
      setformValid(true);
    } else {
      setformValid(false);
    }
  }, [Ticker, startDate, quantity, price, actionvalue]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // dets.details.push({ Ticker });
    // console.log(dets);
    props.takedetails({
      Ticker: Ticker,
      Date: startDate,
      quantity: quantity,
      price: price,
      action: actionvalue,
      total: quantity * price,
    });
    resetTask();
    resetStart();
    resetTotal();
    resetPrice();
    resetQuantity();
    resetAction();
  };
  // date of trans,name,action,quantity,price,total
  return (
    <>
      <form onSubmit={submitHandler} className="form">
        <div className="input-container ic3">
          <label for="name" style={{ color: "black" }}>
            Ticker
          </label>
          <input
            id="name"
            className="input"
            type="text"
            value={Ticker}
            onChange={taskChange}
          />
        </div>

        <div className="input-container ic3">
          <label for="start" style={{ color: "black" }}>
            Date
          </label>
          <input
            id="start"
            type="date"
            className="input"
            value={startDate}
            onChange={startChange}
          />
        </div>

        <div className="input-container ic3">
          <label for="Priority" style={{ color: "black" }}>
            Action
          </label>
          <select
            name="Priority"
            className="input"
            id="Priority"
            value={actionvalue}
            onChange={actionChange}
          >
            <option> Select--an--option</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        <div className="input-container ic3">
          <label for="name" style={{ color: "black" }}>
            Quantity
          </label>
          <input
            id="name"
            className="input"
            type="number"
            value={quantity}
            onChange={quanChange}
          />
        </div>

        <div className="input-container ic3">
          <label for="name" style={{ color: "black" }}>
            Price
          </label>
          <input
            id="name"
            className="input"
            type="number"
            value={price}
            onChange={priceChange}
          />
        </div>
        <div className="input-container ic3">
          <label for="name" style={{ color: "black" }}>
            Total
          </label>
          <input
            id="name"
            className="input"
            type="number"
            value={quantity * price}
            onChange={totalChange}
          />
        </div>

        <button className="button-87" disabled={!formValid} type="submit">
          Submit Task
        </button>
      </form>
    </>
  );
};

export default CreateTransactions;
