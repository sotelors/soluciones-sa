import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import Login from "./componets/IniPrueba";
import Reg from "./components/Reg";
import Dashboard from "./componets/Dashboard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Inicio from "./components/Inicio";
function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navheader">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/IniPrueba"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/Signup"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </nav>{" "}
        <br />
        <Switch>
          <Route exact path="/IniPrueba" component={IniPrueba} />
          <Route path="/Signup" component={Reg} />
        </Switch>
        <Switch>
          <Route path="/Dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
