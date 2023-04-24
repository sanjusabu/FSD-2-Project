import { useState, useContext } from "react";
// import { Detailscontext } from "../../context/details";
import { Portfoliocontext } from "../../context/portfolio-context";
import { useEffect } from "react";
import { useRequest } from "../../hooks/request-hook";
import { Transcontext } from "../../context/trans-context";
import { useDispatch, useSelector } from "react-redux";

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

  const mode = useSelector((state) => state.darkMode);
  console.log(mode);
  const { isdarkMode } = mode;

  const [colors, setColor] = useState("");
  useEffect(() => {
    const Details = async () => {
      const res = await sendRequest(
        "https://fsdproject2.onrender.com/trans/getTrans",
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
        "https://fsdproject2.onrender.com/port/getform",
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

  useEffect(() => {
    if (isdarkMode) {
      setColor("white");
    } else {
      setColor("black");
    }
  }, [isdarkMode]);

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
        .
        <table className="portcardtable">
          <tr>
            <td style={{ fontSize: "1.4rem", color: colors }}>
              Portfolio Name:{" "}
            </td>
            <td style={{ fontSize: "1.4rem", color: colors }}>
              {props.details.portfolio}
            </td>
          </tr>
          <tr>
            <td style={{ color: colors }}>Type: </td>
            <td style={{ color: colors }}>{props.details.type}</td>
          </tr>
          <tr>
            <td style={{ color: colors }}>Platform: </td>
            <td style={{ color: colors }}>{props.details.platform}</td>
          </tr>
          <tr>
            <td style={{ color: colors }}>Opening Date: </td>
            <td style={{ color: colors }}>{props.details.openingDate}</td>
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
                  <th style={{ color: colors }}>Portfolio</th>
                  <th style={{ color: colors }}>Date of Transaction</th>
                  <th style={{ color: colors }}>Ticker</th>
                  <th style={{ color: colors }}>Action</th>
                  <th style={{ color: colors }}>Quantity</th>
                  <th style={{ color: colors }}>Price</th>
                  <th style={{ color: colors }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {match[val - 1] &&
                  match[val - 1].map((i) => {
                    return (
                      <tr>
                        <td style={{ color: colors }}>{i.portfolio}</td>
                        <td style={{ color: colors }}>{i.date}</td>
                        <td style={{ color: colors }}>{i.ticker}</td>
                        <td style={{ color: colors }}>{i.action}</td>
                        <td style={{ color: colors }}>{i.quantity}</td>
                        <td style={{ color: colors }}>{i.price}</td>
                        <td style={{ color: colors }}>{i.total}</td>
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
