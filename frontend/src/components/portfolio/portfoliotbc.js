import { useState, useContext } from "react";
import { Detailscontext } from "../../context/details";
import { Portfoliocontext } from "../../context/portfolio-context";
import { useEffect } from "react";
const Check = (props) => {
  // console.log(props.details, props.count);

  const port = useContext(Portfoliocontext);
  const dets = useContext(Detailscontext);
  const [show, setShow] = useState(false);
  const [match, setMatch] = useState(false);
  console.log(port.portfolio, "portfolio");
  console.log(dets.details, "details");
  const TableHandler = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const CloseHandler = (e) => {
    e.preventDefault();
    setShow(false);
  };
  return (
    <div style={{ backgroundColor: "black" }}>
      <h2 style={{ color: "white" }}>{props.details.portfolio}</h2>
      <h2 style={{ color: "white" }}>{props.details.platform}</h2>
      <h2 style={{ color: "white" }}>{props.details.type}</h2>
      <h2 style={{ color: "white" }}>{props.details.openingDate}</h2>

      <button onClick={TableHandler} className="button-20" value={props.count}>
        Show Table
      </button>
      <button onClick={CloseHandler} className="button-20" value={props.count}>
        Close
      </button>
      {show && (
        <div className="table-responsive">
          <table id="example" className="table table-striped data-table">
            <thead>
              <tr>
                <th>Portfolio</th>
                <th>Date of Transaction</th>
                <th>Ticker</th>
                <th>Action</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
              {dets.details.map((i) => {
                port.portfolio.map((j) => {
                  if (i.Portfolio === j.portfolio) {
                    return (
                      <tr>
                        <td>{i.Portfolio}</td>
                        <td>{i.Date}</td>
                        <td>{i.Ticker}</td>
                        <td>{i.action}</td>
                        <td>{i.quantity}</td>
                        <td>{i.price}</td>
                        <td>{i.total}</td>
                      </tr>
                    );
                  }
                });
              })}
              ;
            </thead>
            <tbody></tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Check;
