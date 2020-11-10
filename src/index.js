import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import SignIn from "./componets/SignIn";
import { SignIn2 } from "./componets/SignIn2";
//import PaginaInicio from './PaginaInicio';
// import { Login } from './componets/Login';
//import PaginaInicio from './componets/PaginaInicio';
import Ingreso from "./App";
//import Login from "./componets/Login";
import IniPrueba from "./componets/IniPrueba";

import { render } from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import ContactForm from "./componets/ContactForm";

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
 
const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
)

ReactDOM.render(
  <React.StrictMode>
    {/* <PaginaInicio></PaginaInicio> */}
    {/* <SignIn2 /> */}
    {/* <IniPrueba /> */}
    {/* <Ingreso /> */}
    <App />
    {/* <ContactForm></ContactForm> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
