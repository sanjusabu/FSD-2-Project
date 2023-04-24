import React from "react";
import Papa from "papaparse";
import TempNavbar from "./tempNavbar";
import useInput from "../hooks/useInput";
import { useEffect, useState, useContext } from "react";
import { Detailscontext } from "../context/details";
import { Portfoliocontext } from "../context/portfolio-context";
import "./createTransactions.css";
import { useRequest } from "../hooks/request-hook";
import { Transcontext } from "../context/trans-context";
import { useDispatch, useSelector } from "react-redux";

const isNotEmpty = (value) => value.trim() !== "";
function TransactionsCSV() {
  const [csvData, setCsvData] = useState([]);
  // const { sendRequest } = useRequest();
  const handleCsvFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });
  };

  const dets = useContext(Detailscontext);
  const [formValid, setformValid] = useState(false);
  const port = useContext(Portfoliocontext);
  const [portData, setportData] = useState([]);
  const [colors, setColor] = useState("");
  const [ref, setref] = useState(false);

  // console.log(port.portfolio);
  const trans = useContext(Transcontext);
  const mode = useSelector((state) => state.darkMode);
  console.log(mode);
  const { isdarkMode } = mode;
  const { sendRequest } = useRequest();
  useEffect(() => {
    const Details = async () => {
      const res = await sendRequest(
        "http://localhost:5011/port/getform",
        "POST",
        JSON.stringify({
          id: localStorage.getItem("user"),
        }),
        { "Content-Type": "application/json" }
      );
      console.log(res, "getformdata");
      setportData(res);
    };
    Details();
  }, [ref]);
  const {
    value: Portfolio,
    valueChangeHandler: PortfolioChange,
    reset: resetPortfolio,
  } = useInput(isNotEmpty);

  useEffect(() => {
    if (Portfolio) {
      setformValid(true);
    } else {
      setformValid(false);
    }
  }, [Portfolio]);

  const submitHandler = async (e) => {
    // e.preventDefault();
    // // dets.details.push({ Ticker });
    // // console.log(dets);
    // setref(false)
    const response = await sendRequest(
      "http://localhost:5011/trans/csvdata",
      "POST",
      JSON.stringify({
        portfolio: Portfolio,
        data: csvData,
        id: localStorage.getItem("user"),
      }),
      { "Content-Type": "application/json" }
    );
    setref(true)
    // resetPortfolio();
    // setPage(0);
  };
  useEffect(() => {
    if (isdarkMode) {
      setColor("white");
    } else {
      setColor("black");
    }
  }, [isdarkMode]);
  const [page, setPage] = useState(0);

  const FormTitles = ["Which Portfolio?", "Upload file"];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <div>
          <select
            name="Portfolio"
            id="Portfolio"
            value={Portfolio}
            onChange={PortfolioChange}
          >
            <option> Select--an--option</option>
            {portData.map((data) => {
              return <option value={data.portfolio}>{data.portfolio}</option>;
            })}
          </select>
        </div>
      );
    } else if (page === 1) {
      return (
        <div>
          <input type="file" accept=".csv" onChange={handleCsvFileUpload} />
        </div>
      );
    }
  };

  return (
    <div>
      <TempNavbar />
      {/* <p>CSV data:</p>
      <pre>{JSON.stringify(csvData, null, 2)}</pre> */}
      <div className="tranform">
        <h1 style={{ color: colors }}>Step {page + 1} of 2</h1>
        <div className="progressbar">
          <div
            style={{
              width: page === 0 ? "50%" : "100%",
            }}
          ></div>
        </div>
        <div className="tranform-container">
          <form>
            <div className="header">
              <h1>{FormTitles[page]}</h1>
            </div>
            <div className="body">{PageDisplay()}</div>
            <div className="footer">
              <button
                disabled={page === 0}
                onClick={(e) => {
                  e.preventDefault();
                  setPage((currPage) => currPage - 1);
                }}
                style={{ backgroundColor: "black" }}
              >
                Prev
              </button>
              <button
                disabled={page === 1}
                onClick={(e) => {
                  e.preventDefault();
                  setPage((currPage) => currPage + 1);
                }}
                style={{ backgroundColor: "black" }}
              >
                Next
              </button>
            </div>
            <button
              disabled={!formValid}
              type="submit"
              onClick={submitHandler}
              style={{ backgroundColor: "black" }}
            >
              Submit Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TransactionsCSV;
