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
  const [images, setImages] = useState([]);
  console.log(port.portfolio, "portfolio");
  console.log(dets.details, "details");
  useEffect(() => {
    let save = [];
    port.portfolio.map((p) => {
      save.push(dets.details.filter((det) => p.portfolio === det.Portfolio));
    });
    setMatch(save);
    // let newimg=[]
    // images.filter((data)=>
    //   data.name.lowercase() === props.details.platform
    // )
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
      <img src={props.details.images[0].address} style={{ width: "60%" }}></img>
      <div className="portcard__content">
      <table className="portcardtable">
      <tr>
        <td style={{fontSize: "1.4rem"}}>Portfolio Name: </td>
        <td style={{fontSize: "1.4rem"}}>{props.details.portfolio}</td>
      </tr>
      <tr>
      <td>Type: </td>
      <td>{props.details.type}</td>
      </tr>
      <tr>
      <td>Platform: </td>
      <td>{props.details.platform}</td>
      </tr>
      <tr>
      <td>Opening Date: </td>
      <td>{props.details.openingDate}</td>
      </tr>
      </table>
      </div>
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
