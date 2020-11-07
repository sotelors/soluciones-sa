import React, { Component } from "react";
//import './App.css';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

import TextField from "@material-ui/core/TextField";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      Email: "",
      Password: "",
    };

    this.Password = this.Password.bind(this);
    this.Email = this.Email.bind(this);
    this.login = this.login.bind(this);
  }

  Email(event) {
    this.setState({ Email: event.target.value });
  }
  Password(event) {
    this.setState({ Password: event.target.value });
  }
  login(event) {
    debugger;
    fetch("http://localhost:22692/Api/login/Login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: this.state.Email,
        Password: this.state.Password,
      }),
    })
      .then((Response) => Response.json())
      .then((result) => {
        //console.log(result);
        if (result.Status == "Invalido") alert(result.Message);
        else if (result.Status == "Exitoso")
          this.props.history.push("/IniPrueba");
        else alert(result.Message);
      });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <CardGroup>
                <Card className="p-2">
                  <CardBody>
                    <Form>
                      <div class="row" className="mb-2 pageheading">
                        <div class="col-sm-12 btn btn-primary">Login</div>
                      </div>
                      <br></br>
                      <InputGroup className="mb-3">
                        {/* <Input type="text" 
                                                 onChange={this.Email} 
                                                 placeholder="Enter Email" /> */}

                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          //fullWidth
                          id="Email"
                          label="Email Address"
                          name="Email"
                          autoComplete="Email"
                          autoFocus
                          onChange={this.Email}
                        />
                      </InputGroup>
                      <br></br>
                      <InputGroup className="mb-4">
                        {/* <Input type="password" 
                                                onChange={this.Password} 
                                                placeholder="Enter Password" /> */}

                        <TextField
                          type="password"
                          variant="outlined"
                          margin="normal"
                          required
                          //fullWidth
                          id="password"
                          label="Enter Password"
                          name="password"
                          autoComplete="password"
                          autoFocus
                          onChange={this.Password}
                        />
                      </InputGroup>
                      <br></br>
                      <Button onClick={this.login} color="success" block>
                        Login
                      </Button>
                      <br></br>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
