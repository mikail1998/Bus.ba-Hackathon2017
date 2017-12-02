import React, { Component } from 'react';
import {Grid, Row, Col,Glyphicon} from 'react-bootstrap';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import FaTwitterSquare from 'react-icons/lib/fa/twitter-square';
import FaGooglePlusSquare from 'react-icons/lib/fa/google-plus-square';
import Input from '../Input';
import MdAdd from 'react-icons/lib/md/add';
import './Signup.css';

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = { 
     }
    }
    
      render() {
        return (
        <div className="container-fluid login">
             <div className="row">
                <div className="col-xs-10 col-xs-offset-1 col-md-4 col-md-offset-4 login-container">
                        <form>
                        <Input className="login-box" type="text" label="Ime Prezime" value={this.state.loginUsername}/>
                        <Input className="login-box" type="text" label="Email" value={this.state.loginUsername}/>
                        <Input className="login-box" type="password" label="Password" value={this.state.loginUsername}/>
                        <Input className="login-box" type="password" label="Re-type Password" value={this.state.loginUsername}/>
                        </form>
                </div>
            </div>
                    <div className="signup-button"><MdAdd className="signup-button-icon"/></div>
                    <div className="col-md-4 col-md-offset-4 prijavise-button-container">
                    PRIJAVI SE
                </div>
          </div>
        )
      }
}

export default SignUp;