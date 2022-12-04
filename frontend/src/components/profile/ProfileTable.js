import { useState, useContext, useEffect } from "react";
import { Detailscontext } from "../../context/details";
import { useSelector } from "react-redux";

const ProfileTable = () => {
  const dets = useContext(Detailscontext);
  const [colors, setColor] = useState("");
  console.log(dets.details);
  const mode = useSelector((state) => state.darkMode);
  const { isdarkMode } = mode;
  useEffect(() => {
    //changing color of body with darkmode in useEffect
    if (isdarkMode) {
      setColor("white");
    } else {
      setColor("black");
    }
  }, [isdarkMode]);
  return (
    <div className="row">
      <div className="col-md-12 mb-3">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table id="example" className="table table-striped data-table">
                <thead>
                  <tr>
                    <th style={{ color: colors }}>Portfolio</th>
                    <th style={{ color: colors }}>Date of Transaction </th>
                    <th style={{ color: colors }}>Ticker</th>
                    <th style={{ color: colors }}>Action</th>
                    <th style={{ color: colors }}>Quantity</th>
                    <th style={{ color: colors }}>Price</th>
                    <th style={{ color: colors }}>Total</th>
                  </tr>

                  {dets.details.map((i) => (
                    <tr>
                      <td style={{ color: colors }}>{i.Portfolio}</td>
                      <td style={{ color: colors }}>{i.Date}</td>
                      <td style={{ color: colors }}>{i.Ticker}</td>
                      <td style={{ color: colors }}>{i.action}</td>
                      <td style={{ color: colors }}>{i.quantity}</td>
                      <td style={{ color: colors }}>{i.price}</td>
                      <td style={{ color: colors }}>{i.total}</td>
                    </tr>
                  ))}
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTable;
