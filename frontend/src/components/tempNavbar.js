import { useState, useContext } from "react";
import "./tempNavbar.css";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/authcontext";
import { useNavigate } from "react-router-dom";

const TempNavbar = () => {
  const navigate = useNavigate();
  //   const auth = useContext(AuthContext);
  //   const logoutHandler = () => {
  //     auth.logout();
  //     localStorage.removeItem("userid");
  //     navigate("/");
  //   };
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <Link
        to="/portfolio"
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: "large",
          margin: "0.2rem",
        }}
      >
        Portfolio
      </Link>
      <Link
        to="/profile"
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: "large",
          margin: "0.2rem",
        }}
      >
        Profile
      </Link>
      <Link
        to="/transactions"
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: "large",
          margin: "0.2rem",
        }}
      >
        Transactions
      </Link>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from Heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="black"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        {/* <button className="button-20" onClick={logoutHandler}>
          Logout
        </button> */}
      </div>
    </nav>
  );
};

export default TempNavbar;
