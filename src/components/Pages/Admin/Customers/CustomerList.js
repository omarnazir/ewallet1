import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";

import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import $ from "jquery";
import Moment from 'moment'
import ReactDatatable from '@ashvin27/react-datatable';


import { AuthService } from '../../../../services';
import {Redirect} from 'react-router-dom';

class CustomerList extends Component {
  state = {
    customersList: []
  };

  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }
    axios.get("/customers")
      .then(res => {
        const response = res.data;
        this.setState({ customersList: response })
        console.log(response);
      })
  }

  formatDate = (date) => {
    return Moment(date).format('lll')
  }

  ViewCustomerDetails = (row) => {
    console.log(row.id)
    return this.props.history.push('/admin-customers-details/' + row.id, row)
  }
  


  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  }

  config = {
    page_size: 10,
    length_menu: [10, 25, 50],
    show_filter: true,
    show_pagination: true,
    pagination:'advance',
    filename: "Contact List",
    button: {
     
    },
    language: {
      loading_text: "Please be patient while data loads..."
  }
  }




  columns = [
    {
        key: "id",
        text: "#",
        sortable: true,
        cell: (record, index) => {
          return index+1;
        }
    },
    {
        key: "fullname",
        text: "CUSTOMER NAME",
    },
    {
        key: "email",
        text: "EMAIL",
    },
    {
        key: "phonenumber",
        text: "PHONE",
    },
    {
        key: "location",
        text: "ADDRESS",
    },

    {
        key: "isActive",
        text: "STATUS",
        sortable: true,
        cell: (record, index) => {
          if (record.isApproved == 0) {
            return (
              <span className="badge badge-warning">Pending</span>
            );
          }
           if(record.isApproved == 1){
            return  (<span className="badge badge-success">Approved</span>);
          }
    
           if(record.isApproved==2) {
            return (
              <span className="badge badge-danger">Rejected</span>
            );
          }
        }
    },
    {
        key: "createdAt",
        text: "DATE REGISTERED",
        sortable: true,
        cell: (record, index) => {
          return (this.formatDate(record.createdAt))
        }
    }, {
      key: "paymentType",
      text: "PAYMENT TYPE",
      sortable: true
  },
{
  key: "id",
  text: "ACTION",
  cell: (record, index) => {
    return (
      <Button  style={{color: 'white',
      background: "#003366"  }} className="btn btn-success"
        onClick={() => {
          this.ViewCustomerDetails(record);
        }}
      >
        <i className="fa fa-eye"></i>
      </Button>
    );
  }
}

];


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}/>
  }
    let index=0

    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Customers List
            <small>Showing all customers.</small>
          </div>
          <div className="flex-row">
            {/* <button className="btn  ml-2" style={this.AddActionButtonStyle}>
              <i className="icon-info mr-2"></i>
                              Customers pending approval</button> */}
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardHeader>
            </CardHeader>
            <CardBody>

            <ReactDatatable 
              extraButtons={this.extraButtons}
                config={this.config}
                records={this.state.customersList}
                columns={this.columns}
                
                />
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default CustomerList;
