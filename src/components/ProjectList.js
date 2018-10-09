// components/projects/ProjectList.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddProject from './AddProject';
import AddClient from './AddClient';

class ProjectList extends Component {
  constructor(){
      super();
      this.state = {projectHistory: [], addClientFormShowing: false, addProjectFormShowing: false};
  }

  getUserProjects = () =>{
    axios.get(process.env.BASE_URL+"/projects", {withCredentials: true})
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
        <AddClient projectID={project._id} getData={this.getUserProjects} hideForm={this.toggleAddClientForm}/>
        )
    }
  }

  showAddClientButton(project, index) {
    if(!project.client){
      return(
        <div>
      <button onClick ={()=> this.toggleAddClientForm(index)}>{this.state.addClientFormShowing === index? 'Hide the Form' : 'Add a New Client'}</button>
      </div>
      )
    } 
  }

  render(){
    return(
      <div>
        <div style={{width: '60%', float:"left"}}>
          { this.state.projectHistory.map((project, index) => {
            return (
              <div key={project._id}>
                <Link to={`/projects/${project._id}`}>
                  <h3>Project ID: {project._id}</h3>
                </Link>
                <p style={{maxWidth: '400px'}} >{project.description} </p>
                {this.showAddClientButton(project, index)}
                {this.showForm(project, index)}
              </div>
            )})
          }
        </div>
        <div style={{width: '40%', float:"right"}}>
          <button onClick ={()=> this.toggleAddProjectForm()}>{this.state.addProjectFormShowing? 'Hide the Form' : 'Add a New Project'}</button>
            {this.state.addProjectFormShowing && <AddProject getData={() => this.getUserProjects()}/>}
            
        </div>
      </div>
    )
  }
}

export default ProjectList;