const ProfileBreakdown = () => {
  return (
    <div className="card h-100">
      <div className="card-header">
        <span className="me-2">
          <i className="bi bi-bar-chart-fill"></i>
        </span>{" "}
        Portfolio Breakdown
      </div>
      <div className="card-body">
        <canvas className="chart" id="pb" width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default ProfileBreakdown;
