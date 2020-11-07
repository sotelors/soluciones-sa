import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";


export class Navigation extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <NavLink className="d-inline p-2 bg-dark text-white" to="/Home">
                Inicio
              </NavLink>

              <NavLink
                className="d-inline p-2 bg-dark text-white"
                to="/department"
              >
                Departmento
              </NavLink>

              <NavLink
                className="d-inline p-2 bg-dark text-white"
                to="/employee"
              >
                Colaboradores
              </NavLink>

              <NavLink
                className="d-inline p-2 bg-dark text-white"
                to="/Formulario"
              >
                Registro
              </NavLink>

              <NavLink
                className="d-inline p-2 bg-dark text-white"
                to="/SignIn2"
              >
                SignIn2
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
