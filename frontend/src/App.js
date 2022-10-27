import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Transactions from "./components/transactions";
import { Detailscontext } from "./details-context/details";
import Portfolio from "./components/portfolio/portfolio";
function App() {
  const details = [];
  let routes = (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/transactions" element={<Transactions />}></Route>
        <Route path="/portfolio" element={<Portfolio />}></Route>
        {/* <Route path='/login' element={<Home />}></Route> */}
        {/* <Route path='/register' element={<Home />}></Route> */}
      </Routes>
    </Router>
  );
  return (
    <div className="App">
      <Detailscontext.Provider value={{ details: details }}>
        <main>{routes}</main>
      </Detailscontext.Provider>
    </div>
  );
}

export default App;
