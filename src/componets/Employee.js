import React, {Component} from 'react'
import {Table} from  'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddEmployeeModal}  from './AddEmployeeModal';
//import {EditDepModal} from './EditDepModal';
import {EditEmployeeModal} from './EditEmployeeModal';
import { Navigation } from './Navigation';

export class Employee extends Component{

    constructor(props){
        super(props);
        this.state = {deps:[], addModalShow : false, editEmployeeModal : false}
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){

        fetch('http://localhost:22692/api/employee')
        .then(response=> response.json())
        .then(data => {
            this.setState({deps:data});
         }
           );
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){

        const {deps, depid, depname, empdepart, empemail, empFecha } = this.state;
        let addModalClose  =() => this.setState({addModalShow:false});
        let editModalClose =() => this.setState({editModalShow:false});

        return(
            // <div className="mt-5 d-flex justify-content-left">
            //     <h3>Este es el Empliado v
            //     </h3>

            // </div>

            <div>

                <Navigation></Navigation>

            <Table className="mt-4" striped bordered hover size="sm">

                

            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Nombre del Empleado</th>
                    <th>Departmento</th>
                    <th>Correo Electronico</th>
                    <th>Fecha Ingreso</th>
                    <th>Option</th>
                </tr>
            </thead>
            <tbody>
                {deps.map(dep=>
                    
                <tr key = {dep.EmployeeID} > 
                    
                <td>{dep.EmployeeID}</td>
                <td>{dep.EmployeeName}</td>
                <td>{dep.Department}</td>
                <td>{dep.MailID}</td>
                <td>{dep.DOJ}</td>
                <td>
                    <ButtonToolbar>
                        <Button 
                        className="mr-2" 
                        variant="info"
                        // OnClick={()=> this.setState({editModalShow:true, depid:dep.DepartmentID, depname:dep.DepartmentName}) }
                        onClick={()=> this.setState({editModalShow:true, depid:dep.EmployeeID, depname:dep.EmployeeName,
                                                     empdepart:dep.Department, empemail:dep.MailID, empFecha:dep.DOJ
                                 }) }
                        >
                            Editar
                        </Button>

                        {/* <EditDepModal 
                        show ={this.setState.editModalShow}
                        onHide ={editModalClose}
                        depid={depid}
                        depname={depname}
                        /> */}

                    <EditEmployeeModal
                    show={this.state.editModalShow}
                    onHide={editModalClose}
                    depid={depid}
                    depname={depname}
                    empdepart={empdepart}
                    empemail={empemail}
                    empFecha={empFecha}
                    />

                    </ButtonToolbar>
                </td>
                </tr>

                )}
            </tbody>

            </Table>

            <ButtonToolbar>
                <Button  
                variant='primary'
                onClick= {()=> this.setState({addModalShow: true}) } >
                    Agregar
                </Button>


                    <AddEmployeeModal
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                    />

            </ButtonToolbar>


            </div>

            // <div className="mt-5 d-flex justify-content-left">
            // <h3>Este es el Empliado v
            // </h3>

            // </div>
        )
    }

}