import { useState, useContext, useEffect } from "react";
import { Detailscontext } from "../../context/details";
import { useSelector } from "react-redux";
import { useRequest } from "../../hooks/request-hook";

const ProfileTable = () => {
  const dets = useContext(Detailscontext);
  const [colors, setColor] = useState("black");
  console.log(dets.details);
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

                  {transData.map((i) => (
                    <tr>
                      <td style={{ color: colors }}>{i.portfolio}</td>
                      <td style={{ color: colors }}>{i.date}</td>
                      <td style={{ color: colors }}>{i.ticker}</td>
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
