import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Navbar, Container, Button } from "react-bootstrap";

const Header = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <Navbar bg="dark" variant="dark" className="mb-0">
      <Container>
        <Navbar.Brand href="#">React Login with useContext</Navbar.Brand>
        <Navbar.Text className="me-3">
          {user ? `Goodbye, ${user.name}` : "Not loggd in"}
        </Navbar.Text>
        {user && (
          <Button variant="outline-light" onClick={logout}>
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
