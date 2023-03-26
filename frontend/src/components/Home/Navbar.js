import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";

function Navbar() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  // const signinHandler = () => {
  //   setClick(false);
  //   navigate("/login");
  // };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const logoutHandler = () => {
    if (auth.isLoggedIn) {
      auth.logout();
      localStorage.removeItem("userid");
      navigate("/home");
    }
  };
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className={styles.Navbar}>
        <div className="navbar-container">
        <Link className="navbar-brand" to="/">
            <span className="logo">
              <img src="https://www.linkpicture.com/q/logo_356.png"></img>
            </span>
          </Link>
          <Link
            to="/"
            className="navbar-logo webnamee"
            onClick={closeMobileMenu}
            style={{ textDecoration: "none" }}
          >
            SPD
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {localStorage.hasOwnProperty("userid") && (
              <>
                <li className="nav-item">
                  <Link
                    to="/nsedashboard"
                    className="nav-links"
                    onClick={closeMobileMenu}
                    style={{ textDecoration: "none" }}
                  >
                    NSE/BSE
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/companies"
                    className="nav-links"
                    style={{ textDecoration: "none" }}
                    onClick={closeMobileMenu}
                  >
                    Companies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/best-stocks"
                    className="nav-links"
                    style={{ textDecoration: "none" }}
                    onClick={closeMobileMenu}
                  >
                    Best Stocks
                  </Link>
                </li>
              </>
            )}
            {localStorage.hasOwnProperty("userid") ? (
              <li className="nav-items">
                <Link
                  to="/"
                  className="nav-links"
                  onClick={closeMobileMenu}
                  style={{ textDecoration: "none" }}
                >
                  <button className="signinnnbuttt" onClick={logoutHandler}>
                    LOGOUT
                  </button>
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/about"
                    className="nav-links"
                    onClick={closeMobileMenu}
                    style={{ textDecoration: "none" }}
                  >
                    AboutUs
                  </Link>
                </li>
                <li className="nav-items">
                  <Link
                    to="/login"
                    className="nav-links"
                    onClick={closeMobileMenu}
                    style={{ textDecoration: "none" }}
                  >
                    <button className="signinnnbuttt">SIGN UP</button>
                  </Link>
                </li>
                <li className="nav-items">
                  <Link
                    to="/login"
                    className="nav-links"
                    onClick={closeMobileMenu}
                    style={{ textDecoration: "none" }}
                  >
                    <button className="signinnnbuttt">LOGIN</button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
