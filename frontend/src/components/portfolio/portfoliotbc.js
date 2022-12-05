import { useState, useContext } from "react";
// import { Detailscontext } from "../../context/details";
import { Portfoliocontext } from "../../context/portfolio-context";
import { useEffect } from "react";
import { useRequest } from "../../hooks/request-hook";
import { Transcontext } from "../../context/trans-context";

const Check = (props) => {
  // console.log(props.details, props.count);
  // const port = useContext(Portfoliocontext);
  // const dets = useContext(Detailscontext);
  const [show, setShow] = useState(false);
  const [match, setMatch] = useState([]);
  const [val, setVal] = useState(0);
  // const [images, setImages] = useState([]);
  const { sendRequest } = useRequest();
  const [portData, setportData] = useState([]);
  const [transData, setTransData] = useState([]);
  const trans = useContext(Transcontext);

  useEffect(() => {
    const Details = async () => {
      const res = await sendRequest(
        "http://localhost:5011/trans/getTrans",
        "POST",
        JSON.stringify({
          id: localStorage.getItem("user"),
        }),
        { "Content-Type": "application/json" }
      );
      // console.log(res, "getformdata");
      setTransData(res);
      // setportData((prevstate)=>{
      //   let newstate = [...prevstate,]
      // })
      // res.map((data) => setportData(data));
    };
    Details();
    // console.log(trans.tr);
    const Portfoilo = async () => {
      const res = await sendRequest(
        "http://localhost:5011/port/getform",
        "POST",
        JSON.stringify({
          id: localStorage.getItem("user"),
        }),
        { "Content-Type": "application/json" }
      );
      // console.log(res, "getformdata");
      setportData(res);
    };
    Portfoilo();

    // let newimg=[]
    // images.filter((data)=>
    //   data.name.lowercase() === props.details.platform
    // )
  }, [trans.tr]);
  // console.log(portData);
  // console.log(transData);
  useEffect(() => {
    let save = [];
    portData.map((p) => {
      save.push(transData.filter((det) => p.portfolio === det.portfolio));
    });
    // console.log(save, "yugyugyugiuiu");
    setMatch(save);
    trans.tr = false;
    // console.log(trans.tr);
  }, [transData]);

  const TableHandler = (e) => {
    e.preventDefault();
    setVal(e.target.value);
    setShow(true);
  };
  const CloseHandler = (e) => {
    e.preventDefault();
    setShow(false);
  };

  // console.log(match, "matched");
  // console.log(props.details, "image");
  // console.log(dets.details);

  return (
    <div className="portcard">
      {console.log(props.details)}
      <img src={props.details.images[0].address} style={{ width: "60%" }}></img>
      <div className="portcard__content">
        <table className="portcardtable">
          <tr>
            <td style={{ fontSize: "1.4rem" }}>Portfolio Name: </td>
            <td style={{ fontSize: "1.4rem" }}>{props.details.portfolio}</td>
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
          className="btn btn-dark"
          value={props.count}
        >
          Show Table
        </button>
      )}
      {/* {console.log(props.count, "table")} */}
      {show && (
        <button
          onClick={CloseHandler}
          className="btn btn-dark"
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
                {match[val - 1] &&
                  match[val - 1].map((i) => {
                    return (
                      <tr>
                        <td>{i.portfolio}</td>
                        <td>{i.date}</td>
                        <td>{i.ticker}</td>
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
