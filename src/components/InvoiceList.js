// components/projects/ProjectList.js

import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AddInvoice from './AddInvoice';
import EditInvoice from './EditInvoice';
import Moment from 'react-moment';
import 'moment-timezone';

class InvoiceList extends Component {
  constructor(){
      super();
      this.state = {invoiceHistory: [], addInvoiceFormShowing: false, editInvoiceFormShowing: false};
  }

  getProjectInvoices = () =>{
    const { params } = this.props.match;
    axios.get(process.env.REACT_APP_BASE_URL+`/invoices/${params.projectid}`, {withCredentials: true})
    .then(responseFromApi => {
      this.setState({
        theProject: responseFromApi.data,
        invoiceHistory: responseFromApi.data.invoiceHistory,
      })
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  componentDidMount() {
    this.getProjectInvoices();
  }

  toggleAddInvoiceForm  = ()=>{
    this.setState({addInvoiceFormShowing: !this.state.addInvoiceFormShowing})
  }

  toggleEditInvoiceForm  = (index)=>{
    if(this.state.editInvoiceFormShowing === index){
      this.setState({editInvoiceFormShowing: false})
    }else{
      this.setState({editInvoiceFormShowing: index})
    }
  }

  showEditForm(invoice, index){
    if(this.state.editInvoiceFormShowing === index){
      return(
        <EditInvoice invoice={invoice} project={this.state.theProject} getData={this.getProjectInvoices} hideForm={this.toggleEditInvoiceForm}/>
        )
    }
  }

  showEditInvoiceButton(index) {
      return(
        <div>
      <button onClick ={()=> this.toggleEditInvoiceForm(index)}>{this.state.editInvoiceFormShowing === index? 'Hide the Form' : 'Edit this Invoice'}</button>
      </div>
      )
  }


  deleteInvoice = (invoice) => {
    axios.delete(process.env.REACT_APP_BASE_URL+`/invoices/${invoice._id}`)
    .then( responseFromApi =>{
        this.getProjectInvoices();         
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  render(){
    if(this.props.userInSession){
      return(
        <div className="background">
        <div id="flex">
          <div className="text">
            { this.state.invoiceHistory.map((invoice, index) => {
              return (
                <div id="invoicelist" key={invoice._id}>
                  <h3>Invoice Date: <Moment format="DD-MM-YYYY HH:mm">{invoice.created_at}</Moment></h3>
                  <p style={{maxWidth: '400px'}} >Description: {invoice.description} </p>
                  <p style={{maxWidth: '400px'}} >Price: ${invoice.price} </p>
                  <p style={{maxWidth: '400px'}} >Status: {invoice.status} </p>
                  <p style={{maxWidth: '400px'}} >Payments Made: ${invoice.paymentsMade} </p>
                  <p style={{maxWidth: '400px'}} >Deposits: ${invoice.deposits} </p>
                  {this.showEditInvoiceButton(index)}
                  {this.showEditForm(invoice, index)}
                  <button onClick={() => this.deleteInvoice(invoice)}>Delete this Invoice</button>
                </div>
              )})
            }
          </div>
          <div className="addinvoice">
            <button onClick ={()=> this.toggleAddInvoiceForm()}>{this.state.addInvoiceFormShowing? 'Hide the Form' : 'Create a New Invoice'}</button>
              {this.state.addInvoiceFormShowing && <AddInvoice theProject={this.state.theProject} getData={() => this.getProjectInvoices()}/>} 
          </div>
          </div>
        </div>
      )
    }else{
      return (<Redirect to="/login"/>)
    }
  }
}

export default InvoiceList;