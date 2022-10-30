import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Detailscontext } from "../../context/details";
import { useContext } from "react";
ChartJs.register(Tooltip, Title, ArcElement, Legend);
const ProfileBreakdown = () => {
  const dets = useContext(Detailscontext);
  console.log(dets);
  let ticker = dets.details.map((data) => {
    return data.Ticker;
  });

  let quantity = dets.details.map((data) => {
    return data.quantity;
  });

  let array_len = dets.details.length;
  let colorarray = [];

  for (let i = 0; i < array_len; i++) {
    colorarray.push("#" + Math.floor(Math.random() * 16777215).toString(16));
  }

  console.log(colorarray, "djjkekj");
  const data = {
    datasets: [
      {
        data: quantity,
        backgroundColor: colorarray,
      },
    ],
    labels: ticker,
  };
  return (
    <div className="card h-100">
      <div className="card-header">
        <span className="me-2">
          <i className="bi bi-bar-chart-fill"></i>
        </span>{" "}
        Portfolio Breakdown
      </div>
      <div style={{ width: "40%" }}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default ProfileBreakdown;
