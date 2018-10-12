// components/projects/AddProject.js

import React, { Component } from 'react';
import axios from 'axios';



class AddProject extends Component {
  constructor(props){
      super(props);
      this.state = {title: "", description: "", location: "", estimate: "", clientRequests: "", status: "", invoiceHistory: [] };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    // const {title, description} = this.state;
    const title = this.state.title;
    const description = this.state.description;
    const location = this.state.location;
    const estimate = this.state.estimate;
    const clientRequests = this.state.clientRequests;
    const status = this.state.status;
 
    axios.post(process.env.REACT_APP_BASE_URL+"/projects", {title, description, location, estimate, clientRequests, status}, {withCredentials: true })
    .then( () => {
        this.props.getData();
        this.setState({title: "", description: "", location: "", estimate: "", clientRequests: "", status: "", invoiceHistory: [] });
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  toggleForm  = ()=>{
    this.setState({formShowing: !this.state.formShowing})
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
        <p>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
          </p>
          <p>
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
          </p>
          <p>
          <label>Location:</label>
          <input type="text" name="location" value={this.state.location} onChange={ e => this.handleChange(e)}/>
          </p>
          <p>
          <label>Estimate:</label>
          <input type="text" name="estimate" value={this.state.estimate} onChange={ e => this.handleChange(e)}/>
          </p>
          <p>
          <label>Client Requests:</label>
          <textarea name="clientRequests" value={this.state.clientRequests} onChange={ e => this.handleChange(e)}/>
          </p>
          <p>
          <label>Status:</label>
          <input type="text" name="status" value={this.state.status} onChange={ e => this.handleChange(e)}/>
          </p>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddProject;