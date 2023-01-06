import React, {useEffect, useState } from "react";
import { GlobalContext } from "./GlobalState";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRequest } from "../hooks/request-hook";

const UserList = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  const [user, setusers] = useState([]);
  const [chg, setchg] = useState(false);
  // let { users, removeUser } = useContext(GlobalContext);
  // users = [{id: 1, name: "John Doe"}, {id: 2, name: "Jane Doe"}];
  const { sendRequest } = useRequest();

  useEffect(() => {
    setchg(true);
    const Details = async () => {
      const resp = await sendRequest(
        "http://localhost:5011/users/getusers",
        "POST",
        JSON.stringify({ u: "jrkljg" }),
        { "Content-Type": "application/json" }
      );
      setusers(resp);
    };
    Details();
  }, [chg]);
  console.log(user);

  const deleteHandler = async (e) => {
    e.preventDefault();
    setchg(false);
    console.log(e.target.value);
    const res = await sendRequest(
      "http://localhost:5011/users/deleteusers",
      "POST",
      JSON.stringify({
        email: e.target.value,
      }),
      { "Content-Type": "application/json" }
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <h1 className="text-white">Admin</h1>
        <button variant="primary" className="ms-auto" onClick={navigateHome}>
          <Link to="/">
            <i class="fa-solid fa-right-from-bracket"></i>
          </Link>
        </button>
      </nav>
      <ul className="mt-4">
        {user.length > 0 ? (
          <>
            <nav className="navbar navbar-expand-md navbar-light bg-primary">
              <a className="navbar-brand ms-3" href="/">
                Users
              </a>
            </nav>
            {user.map((data) => (
              <>
                <li className="d-flex m-3" key={data.id}>
                  <strong>{data.name}</strong>
                  <li className="d-flex m-3"></li>
                  <strong>{data.email}</strong>
                  <Button
                    variant="danger"
                    className="ms-auto"
                    value={data.email}
                    onClick={deleteHandler}
                  >
                    Delete
                  </Button>
                </li>
                <hr />
              </>
            ))}
            <h5>No of Users: {user.length}</h5>
          </>
        ) : (
          <h4 className="text-center">No Users</h4>
        )}
      </ul>
    </>
  );
};

export default UserList;
