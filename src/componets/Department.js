import React, {Component} from 'react'

import {Table} from  'react-bootstrap';
//import {Form} from  'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddDepModal}  from './AddDepModal';
import {EditDepModal} from './EditDepModal';
import { Navigation } from './Navigation';
//import { Navigation } from './Navigation';
//import {types} from './typeS';

import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ButtonM from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
  }));

export class Department extends Component{
    
    constructor(props){
        super(props);
        this.state = {deps:[], addModalShow : false, editDepModal : false}

        
    }
    

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){

        //fetch('http://localhost:22692/api/Department')
        fetch('https://webapi7.azurewebsites.net/api/Department')
        .then(response=> response.json())
        .then(data => {
            this.setState({deps:data});
         }
           );

        // this.setState({
        //     deps:[{"DepartmentID":1, "DepartmentName":"IT"},
        //           {"DepartmentID":2, "DepartmentName":"IT"}
        
        // ]
        // })
    }


    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        //const classes = useStyles();

        const {deps, depid, depname} = this.state;
        let addModalClose  =() => this.setState({addModalShow:false});
        let editModalClose =() => this.setState({editModalShow:false});

        return(

            

            <div>
                <Navigation></Navigation>

                <Table className="mt-4" striped bordered hover size="sm">

                
                
                <thead>
                    <tr>
                          <th>Codigo del Departamento</th>
                          <th>Nombre Departmento</th>
                          <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep=>
                        
                    <tr key = {dep.DepartmentID} > 
                        
                    <td>{dep.DepartmentID}</td>
                    <td>{dep.DepartmentName}</td>
                    <td>
                        <ButtonToolbar>
                            {/* <Button 
                            className="mr-2" 
                            //variant="info"
                            //color="primary"
                            color=""
                            
                            // OnClick={()=> this.setState({editModalShow:true, depid:dep.DepartmentID, depname:dep.DepartmentName}) }
                               onClick={()=> this.setState({editModalShow:true, depid:dep.DepartmentID, depname:dep.DepartmentName}) }
                            >
                                Editar
                            </Button> */}

                            {/* <ButtonM 
                                variant="contained" 
                                color="primary"
                                size="small"
                                onClick={()=> this.setState({editModalShow:true, depid:dep.DepartmentID, depname:dep.DepartmentName}) }
                            >
                                Editar
                            </ButtonM> */}
                            
                            
                            <Tooltip title="Agregar" aria-label="add"
                                onClick={()=> this.setState({editModalShow:true, depid:dep.DepartmentID, depname:dep.DepartmentName}) }
                            >
                                <Fab 
                                    size="small" 
                                    color="primary" 
                                    aria-label="add" >
                                    
                                    <EditIcon />
                                    
                                </Fab>
                            </Tooltip>


                            {/* <EditDepModal 
                              show ={this.setState.editModalShow}
                              onHide ={editModalClose}
                              depid={depid}
                              depname={depname}
                            /> */}

                        <EditDepModal
                        show={this.state.editModalShow}
                        onHide={editModalClose}
                        depid={depid}
                        depname={depname}
                        />

                        </ButtonToolbar>
                    </td>
                    </tr>

                    )}
                </tbody>
                
                </Table>

                <ButtonToolbar>
                    {/* <Button  
                    variant='primary'
                    onClick= {()=> this.setState({addModalShow: true}) } >
                        Agregar
                    </Button> */}


                <Tooltip title="Agregar" aria-label="add"
                     onClick= {()=> this.setState({addModalShow: true}) }
                >
                    <Fab color="primary" /*className={classes.fab}*/ >
                            <AddIcon />
                    </Fab>
                </Tooltip>

                <AddDepModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                        />

                </ButtonToolbar>


              


                </div>

            // <div className="mt-5 d-flex justify-content-left">
            //     <h3>Este es el departamento
            //     </h3>
            // </div>
        )
    }

}