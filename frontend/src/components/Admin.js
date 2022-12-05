import React, { useContext } from 'react';
import { GlobalContext } from "./GlobalState";
import {Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'


 const UserList = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  }
  let { users, removeUser } = useContext(GlobalContext);
  users = [{id: 1, name: "John Doe"}, {id: 2, name: "Jane Doe"}];

  return (
    <>
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <h1 className="text-white">Admin</h1>
      <button variant = "primary" className = "ms-auto" onclick = {navigateHome}>
      <Link to="/"><i class="fa-solid fa-right-from-bracket"></i></Link>
      </button>

    </nav>
    <ul className="mt-4">
      
      {users.length > 0 ? (
        <>
        <nav className="navbar navbar-expand-md navbar-light bg-primary">
              <a className="navbar-brand ms-3" href="/">Users</a>
        </nav>
          {users.map(user => (
            <>
            <li className="d-flex m-3" key={user.id}>
              <strong>{user.name}</strong>
              <Button  variant = "danger" className = "ms-auto"onClick={() => removeUser(user.id)}>Delete</Button>
            </li>
            <hr />
            </>
          ))}
          <h5>No of Users: {users.length}</h5>
        </>
      ) : (
          <h4 className="text-center">No Users</h4>
        )}
    </ul>
    </>
  )
        
}

export default UserList;