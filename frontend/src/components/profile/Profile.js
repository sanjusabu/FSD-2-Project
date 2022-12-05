import ProfileGrowth from "./ProfileGrowth";
import ProfileBreakdown from "./ProfileBreakdown";
import ProfileTable from "./ProfileTable";
import TempNavbar from "../tempNavbar";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { handledarkMode } from "../../store/actions/darkModeAction";
import { useRequest } from "../../hooks/request-hook";
import "./Profile.css";
import ProfileCharts from "./ProfileCharts";

const Profile = () => {
  const dispatch = useDispatch();
  const { sendRequest } = useRequest();
  const mode = useSelector((state) => state.darkMode);
  console.log(mode);
  const { isdarkMode } = mode;
  const [colors, setColor] = useState("");
  const [num, setNum] = useState(0);
  const [transnum, setTransNum] = useState(0);
  const [portNames, setPortNames] = useState("");

  const switchDarkMode = () => {
    isdarkMode
      ? dispatch(handledarkMode(false))
      : dispatch(handledarkMode(true));
  };
  useEffect(() => {
    document.body.style.background = isdarkMode
      ? "radial-gradient(circle, rgba(32,32,32,1) 0%, rgba(9,9,9,1) 100%)"
      : "#f5f5f5";
    if (isdarkMode) {
      setColor("white");
    } else {
      setColor("black");
    }
  }, [isdarkMode]);

  const Portfoilo = async () => {
    const res = await sendRequest(
      "http://localhost:5011/port/nums",
      "POST",
      JSON.stringify({
        id: localStorage.getItem("user"),
      }),
      { "Content-Type": "application/json" }
    );
    // console.log(res, "getformdata");
    setNum(res.len);
    setPortNames(res.names);
  };

  const Transaction = async () => {
    const res = await sendRequest(
      "http://localhost:5011/trans/nums",
      "POST",
      JSON.stringify({
        id: localStorage.getItem("user"),
      }),
      { "Content-Type": "application/json" }
    );
    // console.log(res, "getformdata");
    setTransNum(res.len);
  };

  useEffect(() => {
    console.log(localStorage.getItem("user"));
    Portfoilo();
    Transaction();
  }, []);
  console.log(portNames);

  return (
    <div className="profile">
      <TempNavbar />
      <main className="mt-5 pt-3" id="dashboard">
        <div id="darkmode">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={switchDarkMode}
            checked={isdarkMode}
          />
          <label htmlFor="checkbox" className="label">
            <BsMoonStarsFill color="red" />
            <BsFillSunFill color="yellow" />
            <div className="ball"></div>
          </label>
        </div>
        <br />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h1 style={{ color: colors }}>Dashboard</h1>
            </div>
          </div>
          <div className="row cards">
            <div className="col-md-3 mb-3 row11">
              <div className="card bg-white text-black h-100">
                <div className="card-body py-5">Networth</div>
                <div
                  className="card-footer d-flex bg-success text-white"
                  id="networth"
                >
                  abc
                </div>
              </div>
            </div>
            {/* <div className="col-md-3 mb-3">
              <div className="card bg-warning text-dark h-100">
                <div className="card-body py-5">Total Investment</div>
                <div className="card-footer d-flex" id="tinvestment"></div>
              </div>
            </div> */}
            <div className="col-md-3 mb-3 row12">
              <div className="card bg-success text-white h-100">
                <div className="card-body py-5">Total Gains</div>
                {/* <div
                  className="card-footer d-flex bg-white text-black"
                  id="tgain"
                > */}
                {/* abc
                </div> */}
                Portfolios:{" "}
                {portNames.map((data) => {
                  return (
                    <div>
                      <h4>{data.portfolio}</h4>
                    </div>
                  );
                })}
                Your Portfolios: {num}
                Your Transactions: {transnum}
              </div>
            </div>
          </div>

          <div className="row cards r2">
            <div className="col-md-3 mb-3">
              <div className="card bg-white text-black h-100">
                <div className="card-body py-5">Networth</div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card bg-white text-black h-100">
                <div className="card-body py-5">Total Investment</div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card bg-white text-black h-100">
                <div className="card-body py-5">Total Gains</div>
              </div>
            </div>
          </div>

          <div className="row cards">
            <div className="col-md-3 mb-3 row31">
              <div className="card bg-white text-black h-100">
                <div className="card-body py-5">
                  <ProfileTable />
                </div>
              </div>
            </div>
            {/* <div className="col-md-3 mb-3">
              <div className="card bg-warning text-dark h-100">
                <div className="card-body py-5">Total Investment</div>
                <div className="card-footer d-flex" id="tinvestment"></div>
              </div>
            </div> */}
            <div className="col-md-3 mb-3 row32">
              <div className="card bg-white text-black h-100">
                <div className="card-body py-5">
                  <ProfileCharts/>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="row">
            <div className="col-md-6 mb-3">
              <ProfileGrowth />
            </div>
            <div className="col-md-6 mb-3">
              <ProfileBreakdown />
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default Profile;
