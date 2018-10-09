// components/projects/AddProject.js

import React, { Component } from 'react';
import axios from 'axios';



class AddProject extends Component {
  constructor(props){
      super(props);
      this.state = {location: "", description: "", estimate: "", clientRequests: "", status: "", type: "", invoiceHistory: [] };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    // const {title, description} = this.state;
   // const client = this.state.client;
    const location = this.state.location;
    const description = this.state.description;
    const estimate = this.state.estimate;
    const clientRequests = this.state.clientRequests;
    const status = this.state.status;
    const type = this.state.type;
   
    axios.post("http://localhost:5000/api/projects", {location, description, estimate, clientRequests, status, type}, {withCredentials: true })
    .then( () => {
      console.log("this.props", this.props)
      console.log("this.props", this.state)
        this.props.getData();
        this.setState({location: "", description: "", estimate: "", clientRequests: "", status: "", type: "", invoiceHistory: [] });
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
    //   ^ this is just fancy syntax for the 2 lines below
    //   const name = event.target.name;
    //   const value = event.target.value;

      this.setState({[name]: value});
  }

  toggleForm  = ()=>{
    this.setState({formShowing: !this.state.formShowing})
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Location:</label>
          <input type="text" name="location" value={this.state.location} onChange={ e => this.handleChange(e)}/>
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
          <label>Estimate:</label>
          <input type="text" name="estimate" value={this.state.estimate} onChange={ e => this.handleChange(e)}/>
          <label>Client Requests:</label>
          <textarea name="clientRequests" value={this.state.clientRequests} onChange={ e => this.handleChange(e)}/>
          <label>Status:</label>
          <input type="text" name="status" value={this.state.status} onChange={ e => this.handleChange(e)}/>
          <label>Type:</label>
          <input type="text" name="type" value={this.state.type} onChange={ e => this.handleChange(e)}/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddProject;