import React from 'react';
//import logo from './logo.svg';
import './App.css';

import {Home} from './componets/Home'
import {Department} from './componets/Department'
import {Employee} from './componets/Employee'
import {Navigation} from './componets/Navigation'
import Button from '@material-ui/core/Button';


//import Button from 'react-bootstrap/Button'

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SignIn from './componets/SignIn';
import PaginaInicio from './componets/PaginaInicio';

//import { NavLink } from 'react-bootstrap';

function Aplicacion() {
  return (

      <BrowserRouter>
    <div className="Container m-5 pb-5">

    <Button variant="contained" color="primary" disableElevation>
      Iniciar Sesion
    </Button>

      <h3 className="m-3 d-flex justify-content-center">
      Reac JS con Web api
      </h3>
      <h5 className="m-3 d-flex justify-content-center">
      Portal de gestión de empleados
      </h5>
      
       <Navigation></Navigation>
     
      <Switch>
      {/* <Route path='/Login' component={Login} exact  />     */}
      <Route path='/' component={Home} exact  />    
      <Route path='/department' component={Department} exact  />
        <Route path='/Employee' component={Employee} exact  />

      </Switch>
      
      {/* <Button>Guardar</Button> */}

     

    </div>
    </BrowserRouter>


  );
}

export default Aplicacion;
