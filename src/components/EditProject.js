import React, { Component } from 'react';
import axios from 'axios';

class EditProject extends Component {
  constructor(props){
    super(props);
    this.state = {
        title: this.props.theProject.title,
        description: this.props.theProject.description,
        location: this.props.theProject.location,
        estimate: this.props.theProject.estimate,
        clientRequests: this.props.theProject.clientRequests,
        status: this.props.theProject.status
    }
  }

  handleFormSubmit = (event) => {
    const title = this.state.title;
    const description = this.state.description;
    const location = this.state.location;
    const estimate = this.state.estimate;
    const clientRequests = this.state.clientRequests;
    const status = this.state.status;

    event.preventDefault();

    axios.put(process.env.REACT_APP_BASE_URL+`/projects/${this.props.theProject._id}`, {title, description, location, estimate, clientRequests, status})
    .then( () => {
       this.props.history.push('/projects');   
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
}


  render(){
    return (
      <div>
        <hr />
        <h3>Edit Project</h3>
        <form id="editform" onSubmit={this.handleFormSubmit}>
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

export default EditProject;