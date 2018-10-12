// components/projects/AddProject.js
import React, { Component } from 'react';
import axios from 'axios';


class AddClient extends Component {
  constructor(props){
      super(props);
      this.state = {email: "", password: "", role: "", firstName: "", lastName: "",businessName: "", address: "", phone: ""};
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    // const {title, description} = this.state;
    const email = this.state.email;
    const password = this.state.password;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const businessName = this.state.businessName;
    const address = this.state.address;
    const phone = this.state.phone;
    const projectID = this.props.projectID
   
   
    axios.post(process.env.REACT_APP_BASE_URL+"/addclient", {email, password, firstName, lastName, businessName, address, phone, projectID}, {withCredentials: true })
    .then( () => {
        this.props.hideForm();
        this.props.getData();
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){
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
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddClient;