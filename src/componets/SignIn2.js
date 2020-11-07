import React, { Component } from "react";
import { Modal, Row, Col, Form } from "react-bootstrap";
//import { Department } from './Department';

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
//import LockOutlinedIcon from '@material-ui/icons/LockOutlinedIcon';
// '@material-ui/core/IconButton'
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import SignIn from "./SignIn";
import { Redirect } from "react-router-dom";

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
//import AlertTemplate from 'react-alert-template-basic';
import SweetAlert from 'sweetalert-react';
import { useAlert } from 'react-alert'
import swal from 'sweetalert';
import { AccessAlarm, ThreeDRotation, LockOutlinedIcon } from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';





export class SignIn2 extends Component {
  constructor(props) {
    super(props);
    //IconButton
    this.state = { snackbaropen: false, snackbarmsg: "" };
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  fun() {
    this.props.history.push("/path");
  }

  //funcion snackbarclose
  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  handlerSubmit(event) {
    
    event.preventDefault();

    //alert(event.target.DepartmentName.value);

    fetch("http://localhost:22692/api/login/Login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: event.target.Email.value,
        Password: event.target.Password.value,
      }),
    })
      .then((Response) => Response.json())
      .then((result) => {
        //console.log(result);
        if (result.Status == "Invalido")

        //alert(result.Message);         
        //swal(result.Message);

          swal ({
            text: result.Message,
            buttons: false,
            icon: "info",
            timer: 2000,
            positions: "Center"

          });

        else if (result.Status == "Exitoso")

        swal ({
          text: result.Message,
          buttons: false,
          title: "Bienvenido",
          icon: "success",
          timer: 3000

        }).then(() =>{
          this.props.history.push("/Department");
        });

        //alert("Exitoso");
        //this.fun.onSubmit.push("/Dashboard");
        //this.props.history.push("/Employee");
        else alert("Invalid User");
      });

    // })
    // .then(res=> res.json())
    // .then((result)=>
    // {
    //    // alert(result);
    //     //this.setState({snackbaropen:true, snackbarmsg:result})
    //     if (result.Status == 'Exitoso')
    //          this.props.history.push("/Department");

    // },
    // (error)=>{
    //     //alert('Failed')
    //     alert('Sorrrrrry !!!! Un-authenticated User !!!!!')
    // }
    // )
  }

  render() {
    return (
      <div className="container">
        {/* SnackBar - alerta con Material UI*/}

        <Snackbar
          anchorOrigin={{ vertical: "center", horizontal: "center" }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              x
            </IconButton>,
          ]}
        />

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            
            {/* <Avatar>{ <AccountCircle color="primary" />}</Avatar> */}
            
            
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={this.handlerSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Email"
                label="Email Address"
                name="Email"
                autoComplete="Email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="Password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>


              {/* <button onClick={() => this.setState({ show: true })}>Alert</button>
              <SweetAlert
                show={this.state.show}
                title="Demo"
                text="SweetAlert in React"
                onConfirm={() => this.setState({ show: false })}
              />

              <button
                    onClick={() => {
                      //alert.show('Oh look, an alert!')
                    }}
                  >
                    Show Alert
              </button>
              <useAlert

              /> */}

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}></Box>
        </Container>
      </div>
    );
  }
}

// import React, {Component} from 'react'

// import {Table} from  'react-bootstrap';
// //import {Form} from  'react-bootstrap';

// import {Button, ButtonToolbar} from 'react-bootstrap';
// import {AddDepModal}  from './AddDepModal';
// import {EditDepModal} from './EditDepModal';
// //import {types} from './typeS';

// export class SignIn2 extends Component{

//     constructor(props){
//         super(props);
//         this.state = {deps:[], addModalShow : false, editDepModal : false}
//     }

//     componentDidMount(){
//         this.refreshList();
//     }

//     refreshList(){

//         fetch('http://localhost:22692/api/Department')
//         .then(response=> response.json())
//         .then(data => {
//             this.setState({deps:data});
//          }
//            );

//         // this.setState({
//         //     deps:[{"DepartmentID":1, "DepartmentName":"IT"},
//         //           {"DepartmentID":2, "DepartmentName":"IT"}

//         // ]
//         // })
//     }

//     componentDidUpdate(){
//         this.refreshList();
//     }

//     render(){

//         const {deps, depid, depname} = this.state;
//         let addModalClose  =() => this.setState({addModalShow:false});
//         let editModalClose =() => this.setState({editModalShow:false});

//         return(

//             <div>

//                 <Table className="mt-4" striped bordered hover size="sm">

//                 <thead>
//                     <tr>
//                           <th>Codigo del Departamento</th>
//                           <th>Nombre Departmento</th>
//                           <th>Option</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {deps.map(dep=>

//                     <tr key = {dep.DepartmentID} >

//                     <td>{dep.DepartmentID}</td>
//                     <td>{dep.DepartmentName}</td>
//                     <td>
//                         <ButtonToolbar>
//                             <Button
//                             className="mr-2"
//                             variant="info"
//                             // OnClick={()=> this.setState({editModalShow:true, depid:dep.DepartmentID, depname:dep.DepartmentName}) }
//                                onClick={()=> this.setState({editModalShow:true, depid:dep.DepartmentID, depname:dep.DepartmentName}) }
//                             >
//                                 Editar
//                             </Button>

//                             {/* <EditDepModal
//                               show ={this.setState.editModalShow}
//                               onHide ={editModalClose}
//                               depid={depid}
//                               depname={depname}
//                             /> */}

//                         <EditDepModal
//                         show={this.state.editModalShow}
//                         onHide={editModalClose}
//                         depid={depid}
//                         depname={depname}
//                         />

//                         </ButtonToolbar>
//                     </td>
//                     </tr>

//                     )}
//                 </tbody>

//                 </Table>

//                 <ButtonToolbar>
//                     <Button
//                     variant='primary'
//                     onClick= {()=> this.setState({addModalShow: true}) } >
//                         Agregar departamento
//                     </Button>

//                         <AddDepModal
//                         show={this.state.addModalShow}
//                         onHide={addModalClose}
//                         />

//                 </ButtonToolbar>

//                 </div>

//             // <div className="mt-5 d-flex justify-content-left">
//             //     <h3>Este es el departamento
//             //     </h3>
//             // </div>
//         )
//     }

// }
