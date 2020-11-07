import React, {Component} from 'react';
import { Department } from './Department';
import SignIn from './SignIn';
import { Navigation } from './Navigation';
import {Table} from  'react-bootstrap';


export class Home extends Component{


    render(){
        return(

            
            <div className="mt-5 d-flex justify-content-left">
               

                <Table className="mt-4" striped bordered hover size="sm">
                <h3>Bienvenido al portal.
                    Esta es la pagina principal
                </h3>
                </Table>

              

               {/* <SignIn></SignIn> */}
            </div>

          
        )
    }

}