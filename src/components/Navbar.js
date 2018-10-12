import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth/auth-service';


class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();


  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ loggedInUser: nextProps["userInSession"]})
  }


  logout = () =>{
    this.service.logout()
    .then(()=>{
      this.props.setTheUserInTheAppComponent(null)
    })
  }
  render(){
    if(this.state.loggedInUser){
      return(
        <nav className="navbar-loggedin">
          <ul>
            <li id="welcome">Welcome, {this.state.loggedInUser.firstName} {this.state.loggedInUser.lastName}</li>
            <li>
              <Link to='/projects' style={{ textDecoration: 'none' }}>Projects</Link>
            </li>
            <li>
              <button onClick={()=>this.logout()}>Log Out</button>
            </li>
          </ul>
        </nav>
      )
    } else {
      return (
        <div>
        <nav className="navbar-loggedout">
          <ul>
            <li id="login">
            <Link to='/login'></Link></li>
            <li id="signup">
            <Link to='/signup'></Link></li>
          </ul>
        </nav>
        </div>
      )
    }
    }
  }
  export default Navbar;