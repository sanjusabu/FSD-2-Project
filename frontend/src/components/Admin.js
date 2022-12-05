import React, { useContext } from 'react';
import { GlobalContext } from "./GlobalState";
import NavBar from "./NavBar";
import {
  Navbar,
  NavbarBrand,
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";


 const UserList = () => {
  
  let { users, removeUser } = useContext(GlobalContext);
  users = [{id: 1, name: "John Doe"}, {id: 2, name: "Jane Doe"}];

  return (
    <>
    <NavBar/>
    <Navbar color="dark" dark>
    <Container>
      <NavbarBrand href="/">Admin</NavbarBrand>
    </Container>
  </Navbar>
    <ListGroup className="mt-4">
      {users.length > 0 ? (
        <>
          {users.map(user => (
            <ListGroupItem className="d-flex" key={user.id}>
              <strong className="mr-3">{user.name}</strong>
              <div className = "ml-3">
                <Button  onClick={() => removeUser(user.id)} color="danger">Delete</Button>
              </div>
            </ListGroupItem>
          ))}
        </>
      ) : (
          <h4 className="text-center">No Users</h4>
        )}
    </ListGroup>
    </>
  )
        
}

export default UserList;