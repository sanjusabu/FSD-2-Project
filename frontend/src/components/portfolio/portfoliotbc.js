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
    <div className="portcard">
      <p>
        Portfolio Name: {props.details.portfolio}
      </p>
      <p>Platform: {props.details.platform}</p>
      <p>Type: {props.details.type}</p>
      <p>Opening Date: {props.details.openingDate}</p>

      <button onClick={TableHandler} className="portbutton" value={props.count}>
        Show Table
      </button>
      {console.log(props.count, "table")}
      <button onClick={CloseHandler} className="portbutton" value={props.count}>
        Close
      </button>
      {show && (
        <div>
          <div className="table-responsive">
            <table id="ex" className="table table-striped data-table">
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
