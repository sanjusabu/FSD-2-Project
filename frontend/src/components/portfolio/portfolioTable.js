import Check from "./portfoliotbc";
import { Portfoliocontext } from "../../context/portfolio-context";
import { useContext } from "react";
const PortfolioTable = (props) => {
  const port = useContext(Portfoliocontext);
  // console.log(port, "ergyrihfj");
  let count = 0;
  // console.log();
  return (
    <div className="row porttable m-2">
      {port.portfolio.map((data) => {
        count++;
        return (
          <div className="col-md-4">
            <Check details={data} count={count} />
          </div>
        );
      })}
    </div>
  );
};

export default PortfolioTable;
