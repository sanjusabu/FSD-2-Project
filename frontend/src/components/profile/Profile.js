import ProfileTable from "./ProfileTable";
import TempNavbar from "../tempNavbar";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { handledarkMode } from "../../store/actions/darkModeAction";
import { useRequest } from "../../hooks/request-hook";
import "./Profile.css";
import networth from "../Images/net-worth.jpg";
import totalgains from "../Images/total-gains.jpg";
import totalinvestment from "../Images/total-investment.jpg";
import ProfileCharts from "./ProfileCharts";
import ProfileStatNetworth from "./ProfileStatNetworth";
import ProfileStatTInvest from "./ProfileStatTInvest";
import ProfileStatTGain from "./ProfileStatTGain";
import { FaRegTrashAlt } from "react-icons/fa";
import Card from "../Card/Card";
import TopCard1 from "../Card/TopCard1";
import TopCard2 from "../Card/TopCard2";
import TopCard3 from "../Card/TopCard3";
import classes from "../Card/Card.module.css";
import axios from "axios";
const Profile = () => {
  const dispatch = useDispatch();
  const { sendRequest } = useRequest();
  const mode = useSelector((state) => state.darkMode);
  // console.log(mode);
  const { isdarkMode } = mode;
  const [colors, setColor] = useState("");
  const [num, setNum] = useState(0);
  const [transnum, setTransNum] = useState(0);
  const [portNames, setPortNames] = useState("");
  const [modes, setMode] = useState("dark");
  const [photo, setPhoto] = useState("");
  const [img, setImages] = useState("");
  const [exist, setExist] = useState(false);
  const [msg, setMsg] = useState("");
  const [show, setshow] = useState(false);
  // const [close,setclose] =  useState(false)
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
      setMode("light");
      setColor("white");
    } else {
      setMode("dark");
      setColor("black");
    }
  }, [isdarkMode]);

  useEffect(() => {
    // console.log(localStorage.getItem("user"));
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
    const Profile = async () => {
      const res = await sendRequest(
        "http://localhost:5011/users/check",
        "POST",
        JSON.stringify({
          id: localStorage.getItem("user"),
        }),
        { "Content-Type": "application/json" }
      );
      console.log(res);
      if (res.photo) {
        setExist(true);
        setImages(`http://localhost:5011/${res.photo}`);
      } else {
        setExist(false);
        setMsg(res.message);
      }
    };
    Portfoilo();
    Transaction();
    Profile();
  }, []);

  const imageHandler = (e) => {
    e.preventDefault();
    console.log(e.target.files[0].name);
    setPhoto(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("photo", photo);
    formdata.append("id", localStorage.getItem("user"));
    formdata.append("name", photo.name);

    // console.log(photo + "dj");
    // console.log(formdata);
    axios.post("http://localhost:5011/upload/add", formdata).then((res) => {
      setImages(`http://localhost:5011/${res.data.name}`);
      console.log(res.data.name);
      setExist(true);
    });
  };
  const handler = (e) => {
    e.preventDefault();
    setshow(true);
  };
  const closehandler = (e) => {
    e.preventDefault();
    setshow(false);
  };
  return (
    <div className="profile">
      <TempNavbar />
      <main className="mt-5 pt-3" id="dashboard">
        <div id="darkmode" className="darkmode">
          <p style={{ marginRight: "5%" }}>
            <strong style={{ color: colors }}>Enable {modes} mode</strong>
          </p>
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
            {exist && <img className="image" src={img} />}
            {!exist && <p>{msg}</p>}
            <div className="ppbutt">
            <button onClick={handler}>Change Profile Picture</button>
            <button onClick={closehandler}>Close</button>
            </div>
            {show && (
              <div className="pp">
                {/* console.log(`http://localhost:5011/public/${img}`); */}

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <label for="file-upload" style={{ color: colors }}>
                    Choose Profile Photo:
                  </label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={imageHandler}
                    id="file-upload"
                    name="photo"
                    style={{ color: colors }}
                  ></input>
                  {/* {console.log(img)} */}
                  <button type="submit">Submit</button>
                </form>
              </div>
            )}
            <div className="col-md-12">
              <h1 style={{ color: colors }}>Dashboard</h1>
            </div>
          </div>
          {/* <div className="row cards">
            <div className="col-md-3 mb-3 row11">
              <div className="card bg-white text-black h-100">
                <div className="card-body py-5">
                  <p>
                    <span style={{ fontWeight: "bold", fontSize: "30px" }}>
                      Hello User, Welcome to SPD!
                    </span>{" "}
                    <br />
                    <br />
                    <span style={{ fontSize: "20px" }}>Let's get started!</span>
                  </p>
                </div>
                <div className="card-body bg-success text-white">
                  Add your portfolios to get started <br />
                  After that add your transaction history in respective
                  portfolios
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3 row12">
              <div className="card bg-success text-white h-100">
                <div className="card-body py-5">
                  <span style={{fontWeight: "bold", fontSize: "30px", color: "white"}}>Portfolios:</span>{" "}<br/><br/>
                  <div style={{display: "flex"}}>
                  {portNames &&
                    portNames.map((data) => {
                      return (
                          <h4 style={{paddingRight: "10px"}}>{data.portfolio}</h4>
                      );
                    })}
                  </div>
                  
                </div>
                <div className="card-body bg-white text-black">
                Your Portfolios: {num} <br />
                  Your Transactions: {transnum}
                </div>
              </div>
            </div>
          </div> */}

          <div className="row cards r2">
            <div className="col-md-3 mb-3 topcard1">
              <div>
                {/* <img className="profile-short-images" src={networth} /> */}
                <TopCard1>
                  <div style={{ fontWeight: "20", fontSize: "30px" }}>
                    Networth
                  </div>
                  <br />
                  <div>
                    <ProfileStatNetworth />
                  </div>
                </TopCard1>
              </div>
            </div>
            <div className="col-md-3 mb-3 topcard2">
              <div>
                {/* <img className="profile-short-images" src={totalinvestment} /> */}
                <TopCard2>
                  <div style={{ fontWeight: "20", fontSize: "30px" }}>
                    Total Investment
                  </div>
                  <br />
                  <div>
                    <ProfileStatTInvest />
                  </div>
                </TopCard2>
              </div>
            </div>
            <div className="col-md-3 mb-3 topcard3">
              <div>
                {/* <img className="profile-short-images" src={totalgains} /> */}
                <TopCard3>
                  <div style={{ fontWeight: "20", fontSize: "30px" }}>
                    Total Gains
                  </div>
                  <br />
                  <div>
                    <ProfileStatTGain />
                  </div>
                </TopCard3>
              </div>
            </div>
          </div>

          <div className="row cards">
            <div className="col-md-3 mb-3 row31">
              <Card>
                <div>
                  <ProfileTable />
                </div>
              </Card>
            </div>
            {/* <div className="col-md-3 mb-3">
              <div className="card bg-warning text-dark h-100">
                <div className="card-body py-5">Total Investment</div>
                <div className="card-footer d-flex" id="tinvestment"></div>
              </div>
            </div> */}
            <div className="col-md-3 mb-3 row32">
              <Card>
                <div>
                  <ProfileCharts />
                </div>
              </Card>
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
