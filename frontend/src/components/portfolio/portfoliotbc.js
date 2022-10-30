import { useState, useContext } from "react";
import { Detailscontext } from "../../context/details";
import { Portfoliocontext } from "../../context/portfolio-context";
import { useEffect } from "react";
const Check = (props) => {
  // console.log(props.details, props.count);

  const port = useContext(Portfoliocontext);
  const dets = useContext(Detailscontext);
  const [show, setShow] = useState(false);
  const [match, setMatch] = useState([]);
  const [val, setVal] = useState(0);
  console.log(port.portfolio, "portfolio");
  console.log(dets.details, "details");
  useEffect(() => {
    let save = [];
    port.portfolio.map((p) => {
      save.push(dets.details.filter((det) => p.portfolio === det.Portfolio));
    });
    setMatch(save);
  }, []);

  const TableHandler = (e) => {
    e.preventDefault();
    setVal(e.target.value);
    setShow(true);
  };
  const CloseHandler = (e) => {
    e.preventDefault();
    setShow(false);
  };

  console.log(match, "matched");
  console.log(dets.details);

  return (
    <div style={{ backgroundColor: "black", width: "40vw" }}>
      <h2 style={{ color: "white" }}>
        Portfolio Name: {props.details.portfolio}
      </h2>
      <h2 style={{ color: "white" }}>Platform: {props.details.platform}</h2>
      <h2 style={{ color: "white" }}>Type: {props.details.type}</h2>
      <h2 style={{ color: "white" }}>Date: {props.details.openingDate}</h2>

      {!show && (
        <button
          onClick={TableHandler}
          className="button-20"
          value={props.count}
        >
          Show Table
        </button>
      )}
      {console.log(props.count, "table")}
      {show && (
        <button
          onClick={CloseHandler}
          className="button-20"
          value={props.count}
        >
          Close
        </button>
      )}
      {show && (
        <div style={{ backgroundColor: "white" }}>
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
              </thead>
              <tbody>
                {match[val - 1].map((i) => {
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
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Check;
