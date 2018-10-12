import React, { Component } from 'react';
import axios from 'axios';

class EditInvoice extends Component {
  constructor(props){
    super(props);
    this.state = {
          description: this.props.invoice.description,
          price: this.props.invoice.price,
          status: this.props.invoice.status,
          paymentsMade: this.props.invoice.paymentsMade,
          deposits: this.props.invoice.deposits
    }
  }

  handleFormSubmit = (event) => {
      const description = this.state.description;
      const price = this.state.price;
      const status = this.state.status;
      const paymentsMade = this.state.paymentsMade;
      const deposits = this.state.deposits;

    event.preventDefault();

    axios.put(process.env.REACT_APP_BASE_URL+`/invoices/${this.props.invoice._id}`, {description, price, status, paymentsMade, deposits})
    .then( () => {
        this.props.hideForm();
        this.props.getData();
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
        <h3>Edit Invoice Form</h3>
        <div className="editinvoice">
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
   
     </div>
    )
  }
}

export default EditInvoice;