import { useState, useContext, useEffect } from "react";
import PortfolioForm from "./portfolioForm";
import PortfolioTable from "./portfolioTable";
import TempNavbar from "../tempNavbar";
import { Detailscontext } from "../../context/details";
import { Reloadcontext } from "../../context/reload-context";
const Portfolio = () => {
  const dets = useContext(Detailscontext);
  // console.log(dets.details);
  const [render, setRender] = useState([]);
  const [chang, setChange] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const getPortfolio = (data) => {
    // console.log(data);
    setRender((prevState) => {
      let newState = [...prevState, data];
      return newState;
    });
  };
  // console.log(render);
  return (
    <>
      <TempNavbar />
      <PortfolioForm formdets={getPortfolio} />
      <PortfolioTable table={render} />
    </>
  );
};

export default Portfolio;
