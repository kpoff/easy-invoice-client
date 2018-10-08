import React, { Component } from 'react';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ProjectList from './components/ProjectList';
import AuthService from './components/auth/auth-service';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  setTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  fetchUser(){
    if(this.state.loggedInUser === null){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }



  render() {
    this.fetchUser();
    return (
      <div className="App">
      <Navbar setTheUserInTheAppComponent={this.setTheUser} userInSession={this.state.loggedInUser} />
        <Switch>
          <Route exact path="/login" render={() => <Login setTheUserInTheAppComponent={this.setTheUser} userInSession={this.state.loggedInUser} />}/>
          <Route exact path="/signup" render={() => <Signup setTheUserInTheAppComponent={this.setTheUser} userInSession={this.state.loggedInUser}/>}/>
          <Route exact path="/projects" render={() => <ProjectList setTheUserInTheAppComponent={this.setTheUser} userInSession={this.state.loggedInUser}/>}/>
        
        </Switch>
 
      </div>
    );
  }
}

export default App;