import { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function AppNavbar() {
  const { user } = useContext(UserContext); // Use destructuring

  return (
    <Navbar expand="lg" className="bg-light">
      <Container className="ms-0">
        <Navbar.Brand as={NavLink} to="/">
          Fitness Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" exact="true">
              Home
            </Nav.Link>

            {/* Conditionally render based on user state */}
            {user ? ( // Use the provided user value
              <>
                <Nav.Link as={NavLink} to="/workouts" exact="true">
                  Workouts
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout" exact="true">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" exact="true">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact="true">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}