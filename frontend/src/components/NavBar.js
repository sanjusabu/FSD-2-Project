import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import "./Navbar.css";

const NavBar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  //   const logoutHandler = () => {
  //     if (auth.isLoggedIn) {
  //       auth.logout();
  //       localStorage.removeItem("userid");
  //       navigate("/Home");
  //     }
  //   };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark sticky-nav bg-dark homenav">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span className="logo"><img src="https://www.linkpicture.com/q/logo_356.png"></img></span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!auth.isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    <span className="text">Home</span>
                  </Link>
                </li>
              )}
              {!auth.isLoggedIn && (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/login"
                  >
                    <span className="text">Login</span>
                  </Link>
                </li>
              )}
              {!auth.isLoggedIn && (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/register"
                  >
                    <span className="text">Register</span>
                  </Link>
                </li>
              )}
              {!auth.isLoggedIn && (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/help"
                  >
                    <span className="text">Help</span>
                  </Link>
                </li>
              )}
              {/* {auth.isLoggedIn &&  <li className="nav-item">
                <Link className="nav-link active" to="/profile">
                  Profile
                </Link>
              </li>} */}
            </ul>
            {/* {auth.isLoggedIn && (
              <li className="nav-item loggout">
                <button className="btn btn-danger logg" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            )} */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
