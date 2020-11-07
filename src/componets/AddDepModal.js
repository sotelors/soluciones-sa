import React, {Component} from 'react';
import {Modal,  Button, Row, Col, Form} from 'react-bootstrap';
//import { Department } from './Department';


import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import SignIn from './SignIn';

export class AddDepModal extends Component{

        constructor(props){

            super(props);
            //IconButton
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

                fetch('http://localhost:22692/api/Department',{
                    method: 'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        DepartmentID:null,
                        DepartmentName: event.target.DepartmentName.value
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
                    Datos del Departamento
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 
                   
        {/* Completar los campos de formulario para el Departamento */}

                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handlerSubmit} >
                            <Form.Group controlId="DepartmentName">
                                <Form.Label>Nombre del Departamento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="DepartmentName"
                                    required
                                    placeholder="Nombre del Departamento"
                                />
                            </Form.Group>

                            {/* <Form.Group>
                                    
                                    <SignIn className="mt-5 d-flex justify-content-left"></SignIn>
                                     
                            </Form.Group> */}

                                <Form.Group>
                                    <Button variant="primary" type="submit" >Agregar</Button>
                                     
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