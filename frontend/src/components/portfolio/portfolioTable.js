import Check from "./portfoliotbc";
import { Portfoliocontext } from "../../context/portfolio-context";
import { useContext, useEffect, useState } from "react";
import { useRequest } from "../../hooks/request-hook";
import { Reloadcontext } from "../../context/reload-context";

const PortfolioTable = (props) => {
  const port = useContext(Portfoliocontext);
  // console.log(port, "ergyrihfj");
  let count = 0;

  const reload = useContext(Reloadcontext);
  const [portData, setportData] = useState([]);
  const { sendRequest } = useRequest();
  useEffect(() => {
    const Details = async () => {
      console.log(reload.rd);

      const res = await sendRequest(
        "https://fsdproject2.onrender.com/port/getform",
        "POST",
        JSON.stringify({
          id: localStorage.getItem("user"),
        }),
        { "Content-Type": "application/json" }
      );
      console.log(res, "getformdata");
      setportData(res);
      // console.log(props.reload);
      reload.rd = false;
      // setportData((prevstate)=>{
      //   let newstate = [...prevstate,]
      // })
      // res.map((data) => setportData(data));
    };
    Details();
  }, [reload.rd]);

  console.log(portData);
  return (
    <div className="row porttable m-2">
      {portData &&
        portData.map((data) => {
          count++;
          return (
            <div className="col-md-4">
              {console.log(data, "ewiofewofj")}
              {data.images[0] && <Check details={data} count={count} />}
            </div>
          );
        })}
    </div>
  );
};

export default PortfolioTable;
