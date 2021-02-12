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

import { transitions, positions, Provider as AlertProvider } from "react-alert";
//import AlertTemplate from 'react-alert-template-basic';
import SweetAlert from "sweetalert-react";
import { useAlert } from "react-alert";
import swal from "sweetalert";
import {
  AccessAlarm,
  ThreeDRotation,
  LockOutlinedIcon,
} from "@material-ui/icons";
import AccountCircle from "@material-ui/icons/AccountCircle";
//import Box from '@material-ui/core/Box';

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { Formik, Field, ErrorMessage } from "formik";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

//Inicio Const Email
const EMAIL_REGEX = new RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
//Fin Const Email

export class Ingreso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbaropen: false,
      snackbarmsg: "",

      Password: "",
      Email: "",
      touched: {
        Password: false,
        Email: false,
      },
      errors: {
        required: {
          Password: false,
          Email: false,
        },
        valid: {
          Email: false,
          Password: true,
        },
      },
    };

    this.handlerSubmit = this.handlerSubmit.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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

    //fetch("http://localhost:22692/api/login/Login", {
      fetch("https://webapi7.azurewebsites.net/Api/login/Login", {
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

          swal({
            text: result.Message,
            buttons: false,
            icon: "info",
            timer: 2000,
            positions: "Center",
          });
        else if (result.Status == "Exitoso")
          swal({
            text: result.Message,
            buttons: false,
            title: "Bienvenido",
            icon: "success",
            timer: 3000,
          }).then(() => {
            this.props.history.push("/Department");
          });
        else alert("Invalid User");
      });
  }

  //Inicio Metodos

  handleChange(event) {
    const target = event.target;
    const { value, name } = target;
    const errors = {
      required: { ...this.state.errors.required, [name]: false },
    };
    this.setState({
      [name]: value,
      errors: { ...this.state.errors, ...errors },
    });
  }

  handleBlur(event) {
    const field = event.target.name;
    console.log(field);
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
    this.validate(event);

    this.isFormInvalid(true);
  }

  validate(event) {
    const target = event.target;
    const { value, name } = target;

    if (value.length === 0) {
      const errors = {
        required: { ...this.state.errors.required, [name]: true },
      };

      this.setState({
        errors: { ...this.state.errors, ...errors },
      });
      return;
    }

    if (name === "Email") {
      this.validateEmail(value);
    }
  }

  validateEmail(Email) {
    const emailIsValid = EMAIL_REGEX.test(this.state.Email);
    const errors = {
      valid: { ...this.state.errors.valid, Email: emailIsValid },
    };

    this.setState({
      errors: { ...this.state.errors, ...errors },
    });
  }

  hasError(field) {
    return (
      (this.state.errors.required[field] || !this.state.errors.valid[field]) &&
      this.state.touched[field]
    );
  }

  isFormInvalid() {
    const { Email, Password, errors } = this.state;
    const { required, valid } = errors;
    const isSomeFieldRequired = Object.keys(required).some(
      (error) => required[error]
    );
    const isSomeFieldInvalid = Object.keys(valid).some(
      (error) => !valid[error]
    );

    return isSomeFieldInvalid || isSomeFieldRequired;
  }

  displayError(field) {
    const { required, valid } = this.state.errors;
    const errorMessage = `Field ${field} is `;

    if (required[field]) {
      return `${errorMessage} required`;
    }

    if (!valid[field]) {
      return `${errorMessage} not valid`;
    }
  }

  //Fin Metodos

  render() {
    //const classes = useStyles();
    const { Email, Password, errors } = this.state;
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
            <Typography component="div">
              {/* <Box fontStyle="italic" m={7}>
              Sotelo Solutions
            </Box> */}
            </Typography>

            <Typography component="h1" variant="h5">
              Sign in -
            </Typography>
            <form onSubmit={this.handlerSubmit} noValidate autocomplete="nope">
              <div className="row-input">
                <TextField
                  //variant="outlined"
                  margin="normal"
                  //required = {true}
                  fullWidth
                  id="Email"
                  label="Email Address"
                  //name="Email"
                  autoComplete="Email"
                  autoFocus
                  //validar que se un correo electronico valido
                  value={Email}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  className={this.hasError("Email") ? "error" : ""}
                  name="Email"
                />
              </div>

              <div className="row-input">
                <TextField
                  //variant="outlined"
                  margin="normal"
                  //required = {true}
                  //isRequired="true"
                  fullWidth
                  //name="Password"
                  label="Password"
                  type="password"
                  id="Password"
                  autoComplete="current-password"
                  value={Password}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  className={this.hasError("Password") ? "error" : ""}
                  name="Password"
                />
                <p
                  className={
                    this.hasError("Password")
                      ? "error-message__visible"
                      : "error-message"
                  }
                >
                  {this.displayError("Password")}
                </p>
              </div>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                //variant="contained"
                color="primary"
                disabled={this.isFormInvalid()}
              >
                Sign In
              </Button>

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
