import { useState, useContext, useEffect } from "react";
import { Detailscontext } from "../../context/details";
import { useSelector } from "react-redux";
import { useRequest } from "../../hooks/request-hook";

const ProfileTable = () => {
  const dets = useContext(Detailscontext);
<<<<<<< HEAD
  console.log(dets.details);
  const mode = useSelector((state) => state.darkMode);
  const { isdarkMode } = mode;
  
=======
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
>>>>>>> bc80bab72f5e700a0b3e1dfe254c0a74d17e8092
  return (
    <div className="row">
      <div className="col-md-12 mb-3">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table id="example" className="table table-striped data-table">
                <thead>
                  <tr>
                    <th>Portfolio</th>
                    <th>Date of Transaction </th>
                    <th>Ticker</th>
                    <th>Action</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>

                  {transData.map((i) => (
                    <tr>
<<<<<<< HEAD
                      <td>{i.Portfolio}</td>
                      <td>{i.Date}</td>
                      <td>{i.Ticker}</td>
                      <td>{i.action}</td>
                      <td>{i.quantity}</td>
                      <td>{i.price}</td>
                      <td>{i.total}</td>
=======
                      <td style={{ color: colors }}>{i.portfolio}</td>
                      <td style={{ color: colors }}>{i.date}</td>
                      <td style={{ color: colors }}>{i.ticker}</td>
                      <td style={{ color: colors }}>{i.action}</td>
                      <td style={{ color: colors }}>{i.quantity}</td>
                      <td style={{ color: colors }}>{i.price}</td>
                      <td style={{ color: colors }}>{i.total}</td>
>>>>>>> bc80bab72f5e700a0b3e1dfe254c0a74d17e8092
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
