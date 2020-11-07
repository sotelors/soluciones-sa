import React, {Component} from 'react';
import {Modal,  Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton'; 


export class EditEmployeeModal extends Component{

    constructor(props){

        super(props);
        this.state = {snackbaropen: false, snackbarmsg:'' };
        this.handlerSubmit = this.handlerSubmit.bind(this );
    }

    //funcion snackbarclose
    snackbarClose = (event) =>{
    this.setState({snackbaropen: false});
    };
    
    handlerSubmit(event){
                event.preventDefault();

                //alert(event.target.DepartmentName.value);

                fetch('http://localhost:22692/api/employee',{
                    method: 'PUT',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        EmployeeID:event.target.EmployeeID.value,
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
           // color="inherit"
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

                        <Form.Group controlId="EmployeeID">
                            <Form.Label>Codigo</Form.Label>
                            <Form.Control
                                type="text"
                                name="EmployeeID"
                                required
                                disabled
                                defaultValue = {this.props.depid}
                                placeholder="EmployeeID"
                            />
                        </Form.Group>





                        <Form.Group controlId="EmployeeName">
                            <Form.Label>Nombre del Empleado</Form.Label>
                            <Form.Control
                                type="text"
                                name="EmployeeName"
                                required
                                defaultValue = {this.props.depname}
                                placeholder="Nombre del Empleado"
                            />
                        </Form.Group>


                        <Form.Group controlId="Department">
                            <Form.Label>Nombre del Departamento</Form.Label>
                            <Form.Control
                                type="text"
                                name="Department"
                                required
                                defaultValue = {this.props.empdepart}
                                placeholder="Nombre del Departamento"
                            />
                        </Form.Group>

                        





                        <Form.Group controlId="MailID">
                            <Form.Label>Correo Electronico </Form.Label>
                            <Form.Control
                                type="text"
                                name="MailID"
                                required
                                defaultValue = {this.props.empemail}
                                placeholder="Correo Electronico"
                            />
                        </Form.Group>


                        
                        <Form.Group controlId="DOJ">
                            <Form.Label>Fecha Ingreso</Form.Label>
                            <Form.Control
                                type="text"
                                name="DOJ"
                                required
                                defaultValue = {this.props.empFecha}
                                placeholder="Fecha Ingreso"
                            />
                        </Form.Group>

                            <Form.Group>
                                <Button variant="primary" type="submit"  onClick={this.props.onHide} >
                                    Actualizar
                                </Button>
                                 
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