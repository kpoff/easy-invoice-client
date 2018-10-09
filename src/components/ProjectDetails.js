// components/projects/ProjectDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import EditProject from './EditProject';


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
      axios.get(process.env.BASE_URL+`/projects/${params.id}`)
      .then( responseFromApi =>{
          const theProject = responseFromApi.data;
          this.setState(theProject);
      })
      .catch((err)=>{
          console.log(err)
      })
  }

  // renderEditForm = () => {
  //   if(!this.state.title){
  //       this.getSingleProject();
  //       } else {
  //       //                                                    {...props} => so we can have 'this.props.history' in Edit.js
  //       //                                                                                          ^
  //       //                                                                                          |
  //       return <EditProject theProject={this.state} getTheProject={this.getSingleProject} {...this.props} />
  //       }
  //   }

  // renderTaskList = () => {
  //   if(!this.state.title){
  //        this.getSingleProject();
  //       } else {
  //       //                                                    {...props} => so we can have 'this.props.history' in Edit.js
  //       //                                                                                          ^
  //       //                                                                                          |
  //       return    <TaskList tasks={this.state.tasks}/>
  //          }
  //       }


    // DELETE PROJECT:
  deleteProject = () => {
    const { params } = this.props.match;
    axios.delete(process.env.BASE_URL+`/projects/${params.id}`)
    .then( responseFromApi =>{
        this.props.history.push('/projects'); // !!!         
    })
    .catch((err)=>{
        console.log(err)
    })
  }
   


  render(){
    return(
      <div>
        <h1>Client: {this.state.client}</h1>
        <p>Location: {this.state.location}</p>
        <p>Description: {this.state.description}</p>
        <p>Estimate: {this.state.estimate}</p>
        <p>Client Requests: {this.state.clientRequests}</p>
        <p>Project Status: {this.state.status}</p>
        <p>Project Type: {this.state.type}</p>
        <h1>The Invoices</h1>
        {/* {this.renderTaskList()} */}

        <button onClick={() => this.deleteProject()}>Delete project</button>

        {/* {this.renderEditForm()}
        

        <AddTask projectID={this.state._id}/> */}

        
        <Link to={'/projects'}>Back to projects</Link>
      </div>
    )
  }
}

export default ProjectDetails;