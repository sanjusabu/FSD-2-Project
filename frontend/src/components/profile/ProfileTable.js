import { useState, useContext, useEffect } from "react";
import { Detailscontext } from "../../context/details";
import { useSelector } from "react-redux";
import { useRequest } from "../../hooks/request-hook";
import { FaRegTrashAlt } from "react-icons/fa";
import useInput from "../../hooks/useInput";

const isNotEmpty = (value) => value.trim() !== "";

const ProfileTable = () => {
  const dets = useContext(Detailscontext);
  const [colors, setColor] = useState("black");
  console.log(dets.details);
  const mode = useSelector((state) => state.darkMode);
  const { isdarkMode } = mode;
  const { sendRequest } = useRequest();
  const [transData, setTransData] = useState([]);
  const [chg, setChg] = useState(false);
  const {
    value: nameValue,
    isValid: nameisValid,
    hasError: nameError,
    valueChangeHandler: nameChangeHandler,
    BlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  useEffect(() => {
    const Details = async () => {
      setChg(false);
      const res = await sendRequest(
        "http://localhost:5011/trans/getTrans",
        "POST",
        JSON.stringify({
          id: localStorage.getItem("user"),
        }),
        { "Content-Type": "application/json" }
      );
      console.log(res, "getformdata");
      setTransData(res);
      // setportData((prevstate)=>{
      //   let newstate = [...prevstate,]
      // })
      // res.map((data) => setportData(data));
    };
    Details();
  }, [chg]);
  console.log(transData);
  const [tblColor, setTblColor] = useState("");

  const deleteHandler = async (e) => {
    e.preventDefault();
    console.log(nameValue);
    const res = await sendRequest(
      "http://localhost:5011/trans/deleteTrans",
      "POST",
      JSON.stringify({
        id: localStorage.getItem("user"),
        deleteticker: nameValue,
      }),
      { "Content-Type": "application/json" }
    );
    setChg(true);
    // console.log(res, "getformdata");
    // setTransData(res);
    // setportData((prevstate)=>{
    //   let newstate = [...prevstate,]
    // })
    // res.map((data) => setportData(data));
  };

  const tbldata = () => {
    return transData.map((data) => {
      if (data.action === "buy") {
        return (
          <tr>
            <td>{data.portfolio}</td>
            <td>{data.date}</td>
            <td>{data.ticker}</td>
            <td style={{ color: "green", fontWeight: "bold" }}>
              {data.action}
            </td>
            <td>{data.quantity}</td>
            <td>{data.price}</td>
            <td>{data.total}</td>
          </tr>
        );
      }
      if (data.action === "sell") {
        return (
          <tr>
            <td>{data.portfolio}</td>
            <td>{data.date}</td>
            <td>{data.ticker}</td>
            <td style={{ color: "red", fontWeight: "bold" }}>{data.action}</td>
            <td>{data.quantity}</td>
            <td>{data.price}</td>
            <td>{data.total}</td>
          </tr>
        );
      }
    });
  };
  return (
    <div className="row">
      <div className="col-md-12 mb-3">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <form onSubmit={deleteHandler}>
                <input
                  placeholder="DeleteTicker"
                  type="text"
                  onChange={nameChangeHandler}
                  value={nameValue}
                />{" "}
                <button type="submit">
                  {" "}
                  <FaRegTrashAlt />
                </button>
              </form>
              <table id="example" className="table table-striped data-table">
                <thead>Transaction Table</thead>

                <tbody>
                  <tr>
                    <th>Portfolio</th>
                    <th>Date of Transaction </th>
                    <th>Ticker</th>
                    <th>Action</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                  {tbldata()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTable;
