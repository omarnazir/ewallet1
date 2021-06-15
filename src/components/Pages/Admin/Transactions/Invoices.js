import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import Datatable from "../../../Common/Datatable";
import { Container, Card, CardHeader, CardBody, CardTitle, Row, Col, Button } from "reactstrap";
import $ from "jquery";
import Moment from "moment"
import NumberFormat from 'react-number-format'

class Invoices extends Component {
  state = {
    bill: {},
    invoiceId: 0,
    paidStatus: "0",
    customer: {}
  };

  componentDidMount() {


    const { state } = this.props.history.location;
    // console.log(state.id)
    if (state == undefined) {
      return this.props.history.push('/admin-transactions/')
    }
    this.setState({ invoiceId: state.id })
    this.setState({ paidStatus: state.status })



    axios.get("/bills/" + state.id)
      .then(res => {
        const response = res.data;
        this.setState({ bill: response })

      })

    axios.get("/customers/"+state.customerId)
      .then(res => {
        const response = res.data;
        this.setState({ customer: response })

      })



  }




  formatDate = (date) => {
    return Moment(date).format('DD-MM-YYYY')
  }


  ViewAllInvoices = () => {
    return this.props.history.push("/admin-transactions");
  };

  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
}


  render() {
    return (

      <ContentWrapper>
        <div className="content-heading">


          <div className="mr-auto flex-row">
            Invoice Details
                     <small>Details of an invoice</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.ViewAllInvoices} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">Back to Invoices</Button>
          </div>
        </div>
        <Row>
          <Col xl="12">
            <div className="card mx-md-3">
              <div className="card-header px-md-4 py-lg-4 py-md-3 d-flex">
                <h3 className="mt-2">Invoice <span>#{this.state.bill.billNumber}</span></h3>
                {/* <Button color="success" className="btn-pill ml-auto px-md-5">
                                    <span className="fa fa-print"></span> &nbsp; Print
                                </Button> */}
              </div>
              <hr className="my-0" />
              <div className="card-body my-2 py-1 px-lg-5 px-3">
                <div className="row pt-3 px-lg-3">
                  <div className="col-lg-5 px-lg-3">
                    <h4>From:</h4>
                    <p style={this.InvoiceHeader}>Vodacom Tanzania Public Limited Company,</p>
                    <p style={this.InvoiceHeader}>7th Floor, Vodacom Tower,</p>
                    <p style={this.InvoiceHeader}>Ursino Estate, Plot 23, Old Bagamoyo Road,</p>
                    <p style={this.InvoiceHeader}>P.O. Box 2369,</p>
                    <p style={this.InvoiceHeader}>Dar es Salaam.</p>
                    <p style={this.InvoiceHeader}>Helpdesk: +255 754 100100 / +255 754 705000</p>
                  </div>
                  <div className="col-lg-4 px-lg-3">
                    <h4>To:</h4>
                    <p style={this.InvoiceHeader}>{this.state.customer.fullname}</p>
                  </div>
                  <div className="col-lg-3 px-lg-3">
                    <h4>Invoice:</h4>
                    <p style={this.InvoiceHeader}>Invoice Number: &nbsp; <span>{this.state.bill.billNumber}</span></p>
                    {/* Mar 24, 2021 */}
                    <p style={this.InvoiceHeader}>Invoice Date: &nbsp; <span>{this.formatDate(this.state.bill.createdAt)}</span></p>
                    <p style={this.InvoiceHeader}>Invoice Status: &nbsp;
                    {this.state.bill.status != "1" &&
                        <span className="alert alert-danger px-3 py-1">Unpaid</span>
                      }
                      {this.state.bill.status == "1" &&
                        <span className="alert alert-danger px-3 py-1">Paid</span>
                      }

                    </p>
                    <p style={this.InvoiceHeader}><strong>Invoice Total: &nbsp; <span>{this.state.bill.paidAmount}</span> Tsh.</strong></p>
                  </div>
                </div>
                <table className="table table-striped table-bordered my-4">
                  <thead>
                    <tr>
                      <th scope="col" className="text-dark">Item Description</th>
                      <th scope="col" className="text-dark">Unit Price (Tsh)</th>
                      <th scope="col" className="text-dark">Quantity</th>
                      <th scope="col" className="text-dark">Amount (Tsh.)</th>
                      <th scope="col" className="text-dark">VAT (18%)</th>
                      <th scope="col" className="text-dark">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>SMS Subscription Payment.</td>
                      <td>N/A</td>
                      <td>{this.state.bill.smsQuantity}</td>
                      <td>{this.state.bill.billAmount}</td>
                      <td>{this.state.bill.paidAmount - this.state.bill.billAmount}</td>
                      <td>{this.state.bill.paidAmount}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-light">
                      <th>Sub Total (Tsh.)</th>
                      <th>{this.state.bill.paidAmount}</th>
                    </tr>
                    <tr className="bg-dark text-white">
                      <th>Total Amount (Tsh.)</th>
                      <th>{this.state.bill.paidAmount}</th>
                    </tr>
                  </tfoot>
                </table>
                <h4 className="mt-3 mt-lg-4">How to pay via Vodacom M-Pesa in your phone.</h4>
                <ol style={this.InvoiceHeader}>
                  <li className="mb-1">Dial *150*00#</li>
                  <li className="mb-1">Select <strong>'Pay bill'</strong></li>
                  <li className="mb-1">Select <strong>'Enter Business Number'</strong></li>
                  <li className="mb-1">Enter <strong>'{this.state.bill.billNumber}'</strong></li>
                  <li className="mb-1">Enter Reference Number <strong>'221088'</strong></li>
                  <li className="mb-2">Enter Amount <strong>'{this.state.bill.paidAmount}'</strong></li>
                </ol>
              </div>
            </div>
          </Col>
        </Row>
      </ContentWrapper>

    );
  }
}

export default Invoices;
