import React, { Component } from 'react';
import Landing from './Components/Landing/Landing';
import Login from './Components/Login';
import Signup from './Components/Signup';
import logo from './logo.svg';
import {Router, Route} from 'react-router';
import './App.css';

import { createBrowserHistory } from 'history'

const history =  createBrowserHistory({
  /* pass a configuration object here if needed */
})
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={Landing}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
        </div>
      </Router>
    );
  }
}

export default App;
