import React, {Component} from 'react';
import {Modal,     Row, Col, Form} from 'react-bootstrap';
//import { Department } from './Department';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlinedIcon';
                            // '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
//import SignIn from './SignIn';

import { Card} from 'react-bootstrap';
import {  InputGroup} from 'react';

import {  Input, CardBody, CardGroup} from 'reactstrap';



export default class PaginaInicio extends Component{

        constructor(props){
            super(props);

            this.state = {
                Email: '',
                Password: ''
            }
     
            this.Password = this.Password.bind(this);
            this.Email = this.Email.bind(this);
            this.login = this.login.bind(this);


        }

        Email(event) {
            this.setState({ Email: event.target.value })
        }
        Password(event) {
            this.setState({ Password: event.target.value })
        }
        login(event) {
            debugger;
            fetch('http://localhost:22692/api/login/Login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: this.state.Email,
                    Password: this.state.Password
                })
            }).then((Response) => Response.json())
                .then((result) => {
                    console.log(result);
                    if (result.Status == 'Invalid')
                        alert('Invalid User');
                        
                    else
                        this.props.history.push("/Dashboard");
                        //alert('Si');
                })
        }

        render(){
            return(

                    <div className="container">


                        <Container>
                            <Row className="justify-content-center">
                                <Col md="9" lg="7" xl="6">
                                    <CardGroup>
                                        <Card className="p-2">
                                            <CardBody>
                                                <Form>
                                                    <div class="row" 
                                                    className="mb-2 pageheading">
                                                        <div class="col-sm-12 btn btn-primary">
                                                            Login
                                    </div>
                                                    </div>
                                                    <InputGroup className="mb-3">
                                                        <Input type="text" 
                                                        onChange={this.Email} 
                                                        placeholder="Enter Email" />
                                                    </InputGroup>
                                                    <InputGroup className="mb-4">
                                                        <Input type="password" 
                                                        onChange={this.Password} 
                                                        placeholder="Enter Password" />
                                                    </InputGroup>
                                                    <Button onClick={this.login} 
                                                    color="success" block>Login</Button>
                                                </Form>
                                            </CardBody>
                                        </Card>
                                    </CardGroup>
                                </Col>
                            </Row>
                        </Container>

            
                    </div>

            )

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