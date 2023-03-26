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
import AdminLogin from "./components/auth/Admin Login";
import { useContext, useEffect, useState, useCallback } from "react";
import Login from "./components/auth/Login";
import Help from "./components/Help";
import About from "./components/About Us";
import Admin from "./components/Admin";
import News from "./components/news/News";
import { Portfoliocontext } from "./context/portfolio-context";
import { useRequest } from "./hooks/request-hook";
import { Provider } from "react-redux";
import ForgotPassword from "./components/auth/ForgotPassword";
import store from "./store/store";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setuserId] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  const { sendRequest } = useRequest();

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
    async function init() {
      const resData = await sendRequest("http://localhost:5011/", "GET");
      console.log(resData);
      setCsrfToken(resData.csrfToken);
    }
    init();
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
          <Route path="/help" element={<Help />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Admin" element={<Admin />}></Route>
          <Route path="/AdminLogin" element={<AdminLogin />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        </Routes>
      </Router>
    );
  } else {
    routes = (
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/transactions" element={<Transactions />}></Route>
            <Route path="/portfolio" element={<Portfolio />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/" element={<Profile />}></Route>
            <Route path="/news" element={<News />}></Route>
          </Routes>
        </Router>
      </Provider>
    );
  }
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          userId: userId,
          login: login,
          logout: logout,
          csrfToken: csrfToken,
        }}
      >
        {/* <Detailscontext.Provider value={{ details: details }}> */}

        <main>{routes}</main>
        {/* </Detailscontext.Provider> */}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
