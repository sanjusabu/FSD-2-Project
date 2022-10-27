import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/authcontext";
import { useContext } from "react";
import "./Navbar.css";

const NavBar = () => {
  //   const auth = useContext(AuthContext);
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
      <nav className="navbar navbar-expand-lg navbar-dark sticky-nav bg-*">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            <span className="logo">S.P.D</span>
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
              <li className="nav-item">
                {/*                 
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/Landingpage"
                  >
                    Home
                  </Link> */}

                <Link className="nav-link active" aria-current="page" to="/">
                  <span className="text">Home</span>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link active" to="/profile">
                  Profile
                </Link>
              </li> */}
            </ul>
            {/* <li className="nav-item loggout">
              <button className="btn btn-danger logg" onClick={logoutHandler}>
                Logout
              </button>
            </li> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
