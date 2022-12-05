import React, { useContext } from 'react';
import { GlobalContext } from "./GlobalState";
import NavBar from "./NavBar";
import {
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";

<NavBar/>
 const UserList = () => {
  
  let { users, removeUser } = useContext(GlobalContext);
  users = ["test", "test2", "test3"];

  return (
    <ListGroup className="mt-4">
      {users.length > 0 ? (
        <>
          {users.map(user => (
            <ListGroupItem className="d-flex" key={user.id}>
              <strong>{user.name}</strong>
              <div className="ml-auto">
                <Button onClick={() => removeUser(user.id)} color="danger">Delete</Button>
              </div>
            </ListGroupItem>
          ))}
        </>
      ) : (
          <h4 className="text-center">No Users</h4>
        )}
    </ListGroup>
  )
}

export default UserList;