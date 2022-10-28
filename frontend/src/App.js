<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './components/Home';
import Help from "./components/Help";
=======
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Transactions from "./components/transactions";
import Profile from "./components/profile/Profile";
import { Detailscontext } from "./context/details";
import Portfolio from "./components/portfolio/portfolio";
import Register from "./components/auth/Register";
import { AuthContext } from "./context/auth-context";
import { useContext, useEffect, useState, useCallback } from "react";
import Login from "./components/auth/Login";

>>>>>>> aa0931d3b0e5b78d0022a5726e10d6bbf01f1e5b
function App() {
  const details = [];
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userId, setuserId] = useState("");

  const login = useCallback((uid) => {
    localStorage.setItem("user", uid);
    setIsLoggedIn(true);
    setuserId(localStorage.getItem("user"));
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setuserId(null);
  }, []);

  useEffect(() => {
    if (localStorage.hasOwnProperty("user")) {
      setuserId(localStorage.getItem("user"));
      setIsLoggedIn(true);
    }
  }, []);
  let routes;

  if (!isLoggedIn) {
    routes = (
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    );
  } else {
    routes = (
      <Router>
        <Routes>
          <Route path="/transactions" element={<Transactions />}></Route>
          <Route path="/portfolio" element={<Portfolio />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </Router>
    );
  }
  return (
    <div className="App">
<<<<<<< HEAD
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/help" element={<Help />}></Route>
          {/* <Route path='/login' element={<Home />}></Route> */}
          {/* <Route path='/register' element={<Home />}></Route> */}
        </Routes>
      </Router>
=======
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Detailscontext.Provider value={{ details: details }}>
          <main>{routes}</main>
        </Detailscontext.Provider>
      </AuthContext.Provider>
>>>>>>> aa0931d3b0e5b78d0022a5726e10d6bbf01f1e5b
    </div>
  );
}

export default App;
