import React, { Component } from 'react';
import axios from 'axios';

class AddInvoice extends Component {
  constructor(props){
      super(props);
      this.state = {description: "", price: "", status: "", paymentsMade: "", deposits: ""};
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    // const {title, description} = this.state;
    const client = this.props.theProject.client;
    const description = this.state.description;
    const price = this.state.price;
    const status = this.state.status;
    const paymentsMade = this.state.paymentsMade;
    const deposits = this.state.deposits;
   
    axios.post(process.env.REACT_APP_BASE_URL+`/invoices/${this.props.theProject._id}`, {client, description, price, status, paymentsMade, deposits}, {withCredentials: true})
    .then( () => {
        this.props.getData();
        this.setState({description: "",price: "", status: "", paymentsMade: "", deposits: ""});
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
        <p>
          <label>Description:</label>
          <input type="text" name="description" value={this.state.description} onChange={ e => this.handleChange(e)}/>
          </p>
          <p>
          <label>Price:</label>
          <input type="text" name="price" value={this.state.price} onChange={ e => this.handleChange(e)}/>
          </p>
          <p>
          <label>Status:</label>
          <input type="text" name="status" value={this.state.status} onChange={ e => this.handleChange(e)}/>
          </p>
          <p>
          <label>Payments Made:</label>
          <input type="text" name="paymentsMade" value={this.state.paymentsMade} onChange={ e => this.handleChange(e)}/>
          </p>
          <p>
          <label>Deposits:</label>
          <input type="text" name="deposits" value={this.state.deposits} onChange={ e => this.handleChange(e)}/>
          </p>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddInvoice;