import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRequest } from "../../hooks/request-hook";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

const ProfileGrowth = () => {
  const mode = useSelector((state) => state.darkMode);
  const { isdarkMode } = mode;
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

  console.log(tblData, "tblData");

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

  console.log(result , "result");

  let result_label = [];
  let result_data = [];
  for (let i = 0; i < result.length; i++) {
    result_label.push(result[i][0]);
    result_data.push(result[i][1]);
  }

  let array1 = [];
  for (let i = 0; i < tblData.length; i++) {
    if (tblData[i][2] === "buy") {
      array1.push([tblData[i][1], parseInt(tblData[i][5])]);
    } else if (tblData[i][2] === "sell") {
      array1.push([tblData[i][1], -1 * parseInt(tblData[i][5])]);
    }
  } 

  let result1 = [];
  array1.reduce(function (res, value) {
    if (!res[value[0]]) {
      res[value[0]] = { 0: value[0], 1: 0 };
      result1.push(res[value[0]]);
    }
    res[value[0]][1] += value[1];
    return res;
  }, {});

  console.log(result1, "result1");

  let result11 = [];
  for (let i = 0; i < result.length; i++) {
    if (result[i][1] >= 0) {
      result11.push([result1[i][0], result1[i][1]]);
    }
  }
  console.log(result11, "result11");

  let result_label11 = [];
  let result_data11 = [];
  for (let i = 0; i < result11.length; i++) {
    result_label11.push(result11[i][0]);
    result_data11.push(result11[i][1]);
  }

  const data = {
    labels: result_label11,
    datasets: [
      {
        label: "Money in Rupees",
        backgroundColor: "lightblue",
        borderColor: "royalblue",
        data: result_data11,
      },
    ],
  };

  const options = {
    layout: {
      padding: 10,
    },
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Gain from buying and selling stocks",
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Gain",
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Stock",
          },
        },
      ],
    },
  };
  return (
    <div className="card h-100">
      <div className="card-header">
        <span className="me-2">
          <i className="bi bi-bar-chart-fill"></i>
        </span>{" "}
        Portfolio Growth
      </div>
      <div className="card-body">
        <Bar data={data}/>
      </div>
    </div>
  );
};

export default ProfileGrowth;
