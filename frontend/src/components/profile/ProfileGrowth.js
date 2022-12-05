import { useSelector } from "react-redux";
import { useState, useContext, useEffect } from "react";
import { useRequest } from "../../hooks/request-hook";

const ProfileGrowth = () => {
  const mode = useSelector((state) => state.darkMode);
  const { isdarkMode } = mode;
  const { sendRequest } = useRequest();
  const [transData, setTransData] = useState([]);
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
      console.log(res, "getformdata");
      setTransData(res);
      // setportData((prevstate)=>{
      //   let newstate = [...prevstate,]
      // })
      // res.map((data) => setportData(data));
    };
    Details();
  }, []);
  console.log(transData);
  return (
    <div className="card h-100">
      <div className="card-header">
        <span className="me-2">
          <i className="bi bi-bar-chart-fill"></i>
        </span>{" "}
        Portfolio Growth
      </div>
      <div className="card-body">
        <canvas className="chart" id="pg" width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default ProfileGrowth;
