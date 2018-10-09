import React, { Component } from 'react';
import AuthService from './auth/auth-service';
import {Link, Redirect} from 'react-router-dom';


class Login extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: ''};
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.email;
    const password = this.state.password;

  
    this.service.login(username, password)
    .then( response => {
        this.setState({
            email: "", 
            password: "",
        });
          this.props.setTheUserInTheAppComponent(response)       
    })
    .catch( error => console.log(error) )
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  showLoginForm(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <input type="email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Login" />
        </form>
  
        <p>Don't have an account? 
            <Link to={"/signup"}> Signup</Link>
        </p>
  
      </div>
    )
  }
      
  
  render(){
    if(this.props.userInSession){
      return <Redirect to='/'/>
    }
    
    return(
      <div>
        {this.showLoginForm()}
    
      </div>
    )
  }
}

export default Login;