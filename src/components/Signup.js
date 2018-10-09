// auth/Signup.js

import React, { Component } from 'react';
import AuthService from './auth/auth-service';
import {Link, Redirect} from 'react-router-dom' 

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: '', role: '', firstName: '', lastName: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    const role = this.state.role;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
  
    this.service.signup(email, password, role, firstName, lastName)
    .then(response => {
      if(response.error){
        console.log("Signup error:", response.error);
      }
        this.setState({
            email: "", 
            password: "",
            role: "",
            firstName: "",
            lastName: ""
        });
        if(response.email) {
          this.props.setTheUserInTheAppComponent(response)
        } 
    })
    .catch( error => {
      console.log(error) 
  })
  }
  
//   this.service.signup(username, password)
//   .then(response => {
//       this.setState({
//           username: "", 
//           password: "",
//       });
//       if('username' in response){
//         this.props.setTheUserInTheAppComponent(response)
//         console.log("the good response", response)
//       }else{
//         this.setState({error: response})
//         console.log("the bad response", response)
//       } 
//   })
//   .catch( error => console.log(error) )
// }


  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  showSignUpForm(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <input type="email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />

          <label>Contractor or Client:</label>
          <input type="text" name="role" value={this.state.role} onChange={ e => this.handleChange(e)} />

          <label>First Name:</label>
          <input type="text" name="firstName" value={this.state.firstName} onChange={ e => this.handleChange(e)}/>

          <label>Last Name:</label>
          <input type="text" name="lastName" value={this.state.lastName} onChange={ e => this.handleChange(e)}/>
          
          <input type="submit" value="Signup" />
        </form>
  
        <p>Already have account? 
            <Link to={"/login"}> Login</Link>
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
      {this.showSignUpForm()}
    </div>
    )
  }


}

export default Signup;