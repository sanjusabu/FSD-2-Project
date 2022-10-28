import ProfileGrowth from "./ProfileGrowth";
import ProfileBreakdown from "./ProfileBreakdown";
import ProfileTable from "./ProfileTable";
import TempNavbar from "./tempNavbar";

const Profile = () => {
  return (
    <>
      <TempNavbar />
      <main className="mt-5 pt-3" id="dashboard">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h4>Dashboard</h4>
            </div>
          </div>
          <div className="row">
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
