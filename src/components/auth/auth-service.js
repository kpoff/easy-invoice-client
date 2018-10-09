// auth/auth-service.js

import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.BASE_URL,
      withCredentials: true
    });
    this.service = service;
  }


signup = (email, password, role, firstName, lastName) => {
    return this.service.post('/signup', {email, password, role, firstName, lastName})
    .then(response => response.data)
  }

login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }

loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data)
  }

  logout = () => {
    return this.service.post('/logout', {})
    .then(response => response.data)
  }
  
}

export default AuthService;