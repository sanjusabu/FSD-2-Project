import Check from "./portfoliotbc";
import { Portfoliocontext } from "../../context/portfolio-context";
import { useContext } from "react";
const PortfolioTable = (props) => {
  const port = useContext(Portfoliocontext);
  // console.log(port, "ergyrihfj");
  let count = 0;
  // console.log();
  return (
    <div className="porttable">
      {port.portfolio.map((data) => {
        count++;
        return <Check details={data} count={count} />;
      })}
    </div>
  );
};

export default PortfolioTable;
