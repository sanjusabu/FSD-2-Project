import ProfileGrowth from "./ProfileGrowth";
import ProfileBreakdown from "./ProfileBreakdown";
import ProfileTable from "./ProfileTable";
import TempNavbar from "../tempNavbar";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handledarkMode } from "../../store/actions/darkModeAction";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.darkMode);
  console.log(mode);
  const { isdarkMode } = mode;

  const switchDarkMode = () => {
    isdarkMode
      ? dispatch(handledarkMode(false))
      : dispatch(handledarkMode(true));
  };
  useEffect(() => {
    document.body.style.backgroundColor = isdarkMode ? "#292c35" : "#fff";
    document.body.style.color = isdarkMode ? "#fff" : "#292c35";
  }, [isdarkMode]);

  return (
    <>
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
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h4>Dashboard</h4>
            </div>
          </div>
          <div className="row cards">
            <div className="col-md-3 mb-3">
              <div className="card bg-primary text-white h-100">
                <div className="card-body py-5">Networth</div>
                <div className="card-footer d-flex" id="networth"></div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card bg-warning text-dark h-100">
                <div className="card-body py-5">Total Investment</div>
                <div className="card-footer d-flex" id="tinvestment"></div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card bg-success text-white h-100">
                <div className="card-body py-5">Total Gains</div>
                <div className="card-footer d-flex" id="tgain"></div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <ProfileGrowth />
            </div>
            <div className="col-md-6 mb-3">
              <ProfileBreakdown />
            </div>
          </div>
          <ProfileTable />
        </div>
      </main>
    </>
  );
};

export default Profile;
