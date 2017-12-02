import React, { Component } from 'react';
import {Grid, Row, Col,Glyphicon} from 'react-bootstrap';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import FaTwitterSquare from 'react-icons/lib/fa/twitter-square';
import FaGooglePlusSquare from 'react-icons/lib/fa/google-plus-square';
import Input from '../Input';
import MdDone from 'react-icons/lib/md/done';
import './Login.css';

class Login extends Component {
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
                        <Input className="login-box" type="text" label="Username/E-Mail" value={this.state.loginUsername}/>
                        <Input className="login-box" type="password" label="Password" value={this.state.loginUsername}/>
                        </form>
                        <div className="col-md-12 login-button-big">LOGIN</div>
                </div>
                <div className="login-button"><MdDone className="login-button-icon"/></div>
            </div>
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1 col-md-4 col-md-offset-4 prijavise-button-container">
                    PRIJAVI SE
                </div>
            </div>
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1 col-md-4 col-md-offset-4 social-icons-container">
                    <FaFacebookOfficial className="social-icon fb"/>
                    <FaTwitterSquare className="social-icon tw"/>
                    <FaGooglePlusSquare className="social-icon g"/>
                </div>
            </div>
          </div>
        )
      }
}

export default Login;
