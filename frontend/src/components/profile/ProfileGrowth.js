import { useSelector } from "react-redux";
const ProfileGrowth = () => {
  const mode = useSelector((state) => state.darkMode);
  const { isdarkMode } = mode;
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
