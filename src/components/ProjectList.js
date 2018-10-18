// components/projects/ProjectList.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import AddProject from './AddProject';
import AddClient from './AddClient';

class ProjectList extends Component {
  constructor(){
      super();
      this.state = {projectHistory: [], addClientFormShowing: false, addProjectFormShowing: false};
  }

  getUserProjects = () =>{
    axios.get(process.env.REACT_APP_BASE_URL+"/projects", {withCredentials: true})
    .then(responseFromApi => {
      this.setState({
        projectHistory: responseFromApi.data.projectHistory
      })
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  componentDidMount() {
    this.getUserProjects();
  }

  toggleAddClientForm  = (index)=>{
    if(this.state.addClientFormShowing === index){
      this.setState({addClientFormShowing: false})
    }else{
      this.setState({addClientFormShowing: index})
    }
  }

  toggleAddProjectForm  = ()=>{
    this.setState({addProjectFormShowing: !this.state.addProjectFormShowing})
  }

  showForm(project, index){
    if(this.state.addClientFormShowing === index){
      return(
        <AddClient projectID={project._id} 
        getData={this.getUserProjects} 
        hideForm={this.toggleAddClientForm}/>
        )
    }
  }

  showAddClientButton(project, index) {
    if(!project.client){
      return(
        <div>
      <button onClick ={()=> this.toggleAddClientForm(index)}>
      {this.state.addClientFormShowing === index?
       'Hide the Form' : 'Add a New Client'}</button>
      </div>
      )
    } 
  }

  render(){
    if(this.props.userInSession){
      return(
        <div className="background">
          <div id="container">
            { this.state.projectHistory.map((project, index) => {
              return (
                <div className="projectlist" key={project._id}>
                  <Link to={`/projects/${project._id}`}>
                    <h3>Project Title: {project.title}</h3>
                  </Link>
                  <p>Description: {project.description} </p>
                  <p> Location: {project.location} </p>
                  {this.showAddClientButton(project, index)}
                  {this.showForm(project, index)}
                </div>
              )})
            }
          
          <div id="addproject">
            <button onClick ={()=> this.toggleAddProjectForm()}>{this.state.addProjectFormShowing? 'Hide the Form' : 'Add a New Project'}</button>
              {this.state.addProjectFormShowing && <AddProject getData={() => this.getUserProjects()}/>} 
          </div>
          </div>
        </div>
      )
    }else{
      return (<Redirect to="/login"/>)
    }
  }
}

export default ProjectList;