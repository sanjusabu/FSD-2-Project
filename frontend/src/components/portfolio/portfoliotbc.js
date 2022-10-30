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

  const logolist = [{name:"Zerodha",address: "https://www.freelogovectors.net/wp-content/uploads/2021/12/zerodha-logo-freelogovectors.net_.png"},
  {name:"Groww", address: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Groww_app_logo.png"},
  {name:"Upstox", address: "https://www.pngfind.com/pngs/m/95-958216_upstox-offers-free-demat-account-for-7-days.png"},
  {name:"ICICI Direct", address: "https://secure.icicidirect.com/BaseMasterPage/images/logo.jpg"},
  {name:"WazirX", address: "https://wazirx.com/static/media/wazirx-logo-blue.8f74de7a.png"},
  {name:"Angel Broking", address: "https://angelones.in/images/angel.png"},
  {name:"5Paisa", address: "https://assets.smallcase.com/images/publishers/fivepaisa/logo.png"},
  {name:"Paytm Money", address: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Paytm_Money_Logo.png"},
  {name:"Kotak Securities", address: "https://assets.smallcase.com/images/publishers/kotak/logo.png"},
  {name:"Sharekhan", address: "https://upload.wikimedia.org/wikipedia/commons/8/89/Official_Logo_of_Sharekhan_by_BNP_Paribas.png"}]

  return (
    <div className="portcard">
      <p>Portfolio Name: {props.details.portfolio}</p>
      <p>Platform: {props.details.platform}</p>
      <p>Type: {props.details.type}</p>
      <p>Opening Date: {props.details.openingDate}</p>

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
