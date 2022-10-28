import { useState, useContext } from "react";
import { Detailscontext } from "../../details-context/details";
const Check = (props) => {
  console.log(props.details, props.count);
  const dets = useContext(Detailscontext);
  console.log(dets.details);
  const [show, setShow] = useState(false);
  const TableHandler = (e) => {
    e.preventDefault();
    setShow(true);
  };
  return (
    <div style={{ backgroundColor: "black" }}>
      <h2>{props.details.portfolio}</h2>
      <h2>{props.details.platform}</h2>
      <button onClick={TableHandler} className="button-20" value={props.count}>
        Show Table
      </button>
      {show && (
        <div className="table-responsive">
          <table id="example" className="table table-striped data-table">
            <thead>
              <tr>
                <th>Date of Transaction</th>
                <th>Ticker</th>
                <th>Action</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
              {dets.details.map((i) => (
                <tr>
                  <td>{i.Date}</td>
                  <td>{i.Ticker}</td>
                  <td>{i.action}</td>
                  <td>{i.quantity}</td>
                  <td>{i.price}</td>
                  <td>{i.total}</td>
                </tr>
              ))}
            </thead>
            <tbody></tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Check;
