import { useState } from "react";
import PortfolioForm from "./portfolioForm";
import PortfolioTable from "./portfolioTable";
const Portfolio = () => {
  const [render, setRender] = useState([]);
  const getPortfolio = (data) => {
    // console.log(data);
    setRender((prevState) => {
      let newState = [...prevState, data];
      return newState;
    });
  };
  console.log(render);
  return (
    <>
      <PortfolioForm formdets={getPortfolio} />
      <PortfolioTable table={render} />
    </>
  );
};

export default Portfolio;
