// auth/Signup.js

import React, { Component } from 'react';
import AuthService from './auth/auth-service';
import {Link, Redirect} from 'react-router-dom' 

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: '', role: '', firstName: '', lastName: '', businessName: '', address: '', phone: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    const role = this.state.role;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const businessName = this.state.businessName;
    const address = this.state.address;
    const phone = this.state.phone;
  
    this.service.signup(email, password, role, firstName, lastName, businessName, address, phone)
    .then(response => {
      if(response.error){
        console.log("Signup error:", response.error);
      }
        this.setState({
            email: "", 
            password: "",
            role: "",
            firstName: "",
            lastName: "",
            businessName: "",
            address: "",
            phone: ""
        });
        if(response.email) {
          this.props.setTheUserInTheAppComponent(response)
        } 
    })
    .catch( error => {
      console.log(error) 
  })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
      
  
  render(){
    if(this.props.userInSession){
      return <Redirect to='/'/>
    }
    return(
      <div>
      <form onSubmit={this.handleFormSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
        
        <label>Password:</label>
        <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />

        <label>First Name:</label>
        <input type="text" name="firstName" value={this.state.firstName} onChange={ e => this.handleChange(e)}/>

        <label>Last Name:</label>
        <input type="text" name="lastName" value={this.state.lastName} onChange={ e => this.handleChange(e)}/>

        <label>Business Name:</label>
        <input type="text" name="businessName" value={this.state.businessName} onChange={ e => this.handleChange(e)}/>

        <label>Address:</label>
        <input type="text" name="address" value={this.state.address} onChange={ e => this.handleChange(e)}/>

        <label>Phone:</label>
        <input type="text" name="phone" value={this.state.phone} onChange={ e => this.handleChange(e)}/>
        
        <input type="submit" value="Signup" />
      </form>

      <p>Already have account? 
          <Link to={"/login"}> Login</Link>
      </p>

    </div>
    )
  }


}

export default Signup;