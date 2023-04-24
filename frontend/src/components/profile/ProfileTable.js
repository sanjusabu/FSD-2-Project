import { useState, useContext, useEffect } from "react";
import { Detailscontext } from "../../context/details";
import { useSelector } from "react-redux";
import { useRequest } from "../../hooks/request-hook";
import { FaRegTrashAlt } from "react-icons/fa";
import useInput from "../../hooks/useInput";
import ReactPaginate from "react-paginate";
import "./ProfileTable.css";

const isNotEmpty = (value) => value.trim() !== "";

const ProfileTable = () => {
  const dets = useContext(Detailscontext);
  const [colors, setColor] = useState("black");
  // console.log(dets.details);
  const mode = useSelector((state) => state.darkMode);
  const { isdarkMode } = mode;
  const { sendRequest } = useRequest();
  const [transData, setTransData] = useState([]);
  const [chg, setChg] = useState(false);
  const [del, setdel] = useState(false);
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
  }, [chg, del]);
  // console.log(transData);
  const [tblColor, setTblColor] = useState("");

  const deleteHandler = async (e) => {
    e.preventDefault();
    // console.log(nameValue);
    const res = await sendRequest(
      "https://fsdproject2.onrender.com/trans/deleteTrans",
      "POST",
      JSON.stringify({
        id: localStorage.getItem("user"),
        deleteticker: nameValue,
      }),
      { "Content-Type": "application/json" }
    );
    setChg(true);
    resetName();
    // console.log(res, "getformdata");
    // setTransData(res);
    // setportData((prevstate)=>{
    //   let newstate = [...prevstate,]
    // })
    // res.map((data) => setportData(data));
  };
  const deleteAll = async (e) => {
    //  console.log("HGJHJJKKHKHJKLHJKHK");
    e.preventDefault();
    setdel(false);
    //  window.location.reload()
    const res = await sendRequest(
      "https://fsdproject2.onrender.com/trans/deleteAll",
      "POST",
      JSON.stringify({
        id: localStorage.getItem("user"),
      }),
      { "Content-Type": "application/json" }
    );
    setdel(true);
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
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  return (
    <div className="row">
      <div className="col-md-12 mb-3">
        <div className="card">
          <div className="card-header">
            {/* <span className="me-2">
              <i className="bi bi-bar-chart-fill"></i>
            </span> */}
            <div style={{ justifyContent: "space-between" }}>
              <span
                style={{
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "1.5rem",
                }}
              >
                Transaction Table
              </span>

              <div className="delete">
                <div>
                  <form onSubmit={deleteAll}>
                    <button type="submit" style={{backgroundColor: "#EA4C46"}}>Delete All</button>
                  </form>
                </div>
                <div style={{marginLeft: "55%"}}>
                  <form onSubmit={deleteHandler}>
                    <input
                      placeholder="DeleteTicker"
                      type="text"
                      onChange={nameChangeHandler}
                      value={nameValue}
                    />{" "}
                    <button type="submit">
                      <FaRegTrashAlt />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div></div>
          <div className="card-body">
            <div className="table-responsive">
              <table id="example" className="table table-striped data-table">
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
                  {tbldata().slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )}
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                pageCount={Math.ceil(tbldata().length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={({ selected }) => setCurrentPage(selected)}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
                activeLinkClassName={"active-link"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTable;
