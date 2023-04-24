import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useRequest } from "../../hooks/request-hook";
import { useState, useEffect } from "react";
ChartJs.register(Tooltip, Title, ArcElement, Legend);
const ProfileBreakdown = () => {
  // const dets = useContext(Detailscontext);
  // console.log(dets);
  // let ticker = dets.details.map((data) => {
  //   return data.Ticker;
  // });

  // let quantity = dets.details.map((data) => {
  //   return data.quantity;
  // });

  const { sendRequest } = useRequest();
  const [transData, setTransData] = useState([]);
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
  }, []);

  let tblData = transData.map((data) => {
    return [
      data.portfolio,
      data.ticker,
      data.action,
      data.quantity,
      data.price,
      data.total,
    ];
  });
  let array = [];

  for (let i = 0; i < tblData.length; i++) {
    if (tblData[i][2] === "buy") {
      array.push([tblData[i][1], parseInt(tblData[i][3])]);
    } else if (tblData[i][2] === "sell") {
      array.push([tblData[i][1], -1 * parseInt(tblData[i][3])]);
    }
  }

  let result = [];
  array.reduce(function (res, value) {
    if (!res[value[0]]) {
      res[value[0]] = { 0: value[0], 1: 0 };
      result.push(res[value[0]]);
    }
    res[value[0]][1] += value[1];
    return res;
  }, {});

  // console.log(result , "result");

  let result_label = [];
  let result_data = [];
  for (let i = 0; i < result.length; i++) {
    result_label.push(result[i][0]);
    result_data.push(result[i][1]);
  }

  let array_len = transData.length;
  let colorarray = [];

  for (let i = 0; i < array_len; i++) {
    colorarray.push("#" + Math.floor(Math.random() * 16777215).toString(16));
  }

  // console.log(colorarray, "djjkekj");
  const data = {
    datasets: [
      {
        data: result_data,
        backgroundColor: colorarray,
      },
    ],
    labels: result_label,
  };
  return (
    <div className="card h-100">
      <div className="card-header">
        <span className="me-2">
          <i className="bi bi-bar-chart-fill"></i>
        </span>{" "}
        Portfolio Breakdown
      </div>
      <div style={{ width: "40%", marginLeft: "30%", marginTop: "10%" }}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default ProfileBreakdown;
