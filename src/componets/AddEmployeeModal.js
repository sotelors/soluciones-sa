import React, {Component} from 'react';
import {Modal,  Button, Row, Col, Form} from 'react-bootstrap';
//import { Department } from './Department';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'


export class AddEmployeeModal extends Component{

        constructor(props){

            super(props);
            //IconButton
            this.state = {deps:[], snackbaropen: false, snackbarmsg:'' };
            this.handlerSubmit = this.handlerSubmit.bind(this );
        }

        componentDidMount(){

            fetch('http://localhost:22692/api/department')
            .then(response => response.json())
            .then(data => {
                this.setState({deps:data});
            });

        }

        //funcion snackbarclose
        snackbarClose = (event) =>{
            this.setState({snackbaropen: false});
        };

        handlerSubmit(event){
                event.preventDefault();

                //alert(event.target.DepartmentName.value);

                fetch('http://localhost:22692/api/Employee',{
                    method: 'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        EmployeeID:null,
                        EmployeeName: event.target.EmployeeName.value,
                        Department: event.target.Department.value,
                        MailID: event.target.MailID.value,
                        DOJ: event.target.DOJ.value
                    })
                    
                })
                .then(res=> res.json())
                .then((result)=>
                {
                    //alert(result);
                    this.setState({snackbaropen:true, snackbarmsg:result})
                },
                (error)=>{
                    //alert('Failed')
                    this.setState({snackbaropen:true, snackbarmsg:'Failed'})
                }
                )

                
        }


        render(){
            return(


    
        <div className="container">

        {/* SnackBar - alerta con Material UI*/}
        
          <Snackbar 
           anchorOrigin={{vertical:'center', horizontal:'center'}}
           open = {this.state.snackbaropen}
           autoHideDuration = {3000}
           onClose = {this.snackbarClose}
           message = {<span id="message-id">{this.state.snackbarmsg}</span>}
           action = {[
               <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.snackbarClose}
               >
                   x
               </IconButton>
           ]}
           />

          


        {/* Ventana modal - ingresar departamento*/}

                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Datos del Empleado
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 
                   
        {/* Completar los campos de formulario para el Departamento */}

                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handlerSubmit} >

                            <Form.Group controlId="EmployeeName">
                                <Form.Label>Nombre </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="EmployeeName"
                                    required
                                    placeholder="Nombre"
                                />
                            </Form.Group>


                            <Form.Group controlId="Department">
                                <Form.Label>Departmento </Form.Label>
                                {/* <Form.Control
                                    type="text"
                                    name="Department"
                                    required
                                    placeholder="Nombre del Departamento"
                                /> */}

                                <Form.Control as ='select'>

                                    {this.state.deps.map( dep => 
                                        <option key={dep.DepartmentID}>{dep.DepartmentName}</option>
                                        )}

                                </Form.Control>

                            </Form.Group>

                            <Form.Group controlId="MailID">
                                <Form.Label>Correo Electronico </Form.Label>
                                <Form.Control
                                    type="email"
                                    name="MailID"
                                    required
                                    placeholder="name@example.com"
                                />
                            </Form.Group>

                            <Form.Group controlId="DOJ">
                                <Form.Label>Fecha Ingreso </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="DOJ"
                                    required
                                    placeholder="Fecha Ingreso"
                                />
                            </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit" onClick={this.props.onHide} >Agregar</Button>
                                     
                                </Form.Group>

                            </Form>
                        </Col>
                    </Row>

                  


                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
              </Modal>

    
        </div>

            )

        }

}