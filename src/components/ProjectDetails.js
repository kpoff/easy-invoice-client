// components/projects/ProjectDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import EditProject from './EditProject';


class ProjectDetails extends Component {
  constructor(props){
      super(props);
      this.state = {};
  }

  componentDidMount(){
      this.getSingleProject();
  }

  getSingleProject = () => {
      const { params } = this.props.match;
      axios.get(process.env.REACT_APP_BASE_URL+`/projects/${params.id}`)
      .then( responseFromApi =>{
          const theProject = responseFromApi.data;
        this.setState(theProject)
      })
      .catch((err)=>{
          console.log(err)
      })
  }

  renderEditForm = () => {
    if(!this.state.location){
        this.getSingleProject();
        } else {
        return <EditProject theProject={this.state} getTheProject={this.getSingleProject} {...this.props} />
        }
    }


  deleteProject = () => {
    const { params } = this.props.match;
    axios.delete(process.env.REACT_APP_BASE_URL+`/projects/${params.id}`)
    .then( responseFromApi =>{
        this.props.history.push('/projects');          
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  showBusinessName(){
      if(this.state.client && this.state.client.businessName){
          return(
            <h1>Client Business Name: {this.state.client && this.state.client.businessName}</h1>
          )
      }
  }
   
  render(){
      if(this.props.userInSession){
        return(
            <div className="background">
            <div className="text">
              <h3>Client Contact Name: {this.state.client && this.state.client.firstName} {this.state.client && this.state.client.lastName}</h3>
              {this.showBusinessName()}
              <p>Title: {this.state.title}</p>
              <p>Description: {this.state.description}</p>
              <p>Location: {this.state.location}</p>
              <p>Estimate: ${this.state.estimate}</p>
              <p>Client Requests: {this.state.clientRequests}</p>
              <p>Project Status: {this.state.status}</p>
              <Link to={`/invoices/${this.state._id}`}> <h3>View/Add Invoices for this Project</h3></Link>
      
              <button onClick={() => this.deleteProject()}>Delete project</button>
      
              {this.renderEditForm()}
      
              <Link to={'/projects'}>Back to projects</Link>
            </div>
            </div>
          )
        }else{
            return <Redirect to ="/login"/>
        }  
      }
    
}

export default ProjectDetails;