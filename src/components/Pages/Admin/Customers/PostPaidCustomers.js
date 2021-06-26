import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import $ from "jquery";
import Moment from "moment"
import { AuthService } from '../../../../services';
import {Redirect} from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';
import NumberFormat from 'react-number-format'
class PostPaidCustomers extends Component {
  state = {
   customersPostPaidList: []
  };


  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }
    axios.get("/customers/post-paid")
      .then(res => {
        const response = res.data;
        this.setState({ customersPostPaidList: response })
        console.log(response);
      })
  }

  ViewCustomerDetails = (row) => {
    console.log(row.id)
    return this.props.history.push('/admin-customers-details/' + row.id, row)
  }

  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  }

  formatDate = (date) => {
    return Moment(date).format('lll')
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
          return index+=1;
        }
    },
    {
        key: "fullname",
        text: "CUSTOMER NAME"
    },
    {
        key: "email",
        text: "EMAIL"
    },
    {
        key: "phonenumber",
        text: "PHONE"
    },
    {
        key: "location",
        text: "ADDRESS"
    },
    {
      key: "vaccount",
      text: "V_ACCOUNT"
  },
  {
    key: "monthlyLimit",
    text: "MONTHLY SMS LIMIT",
    sortable: true,
    cell: (record, index) => {
      if (record.monthlyLimit == null) {
        return (
          'N/A'
        );
      }
       else{
        return  (
          <NumberFormat value={ record.monthlyLimit} displayType={'text'} thousandSeparator={true} prefix={''} />
          );
      }
    }
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
    },
{
  key: "id",
  text: "ACTION",
  sort:false,
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
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Post Paid Customers
            <small>Showing all post paid customers.</small>
          </div>
          <div className="flex-row">
            
            {/* <Button className="btn-pill-right" style={this.AddActionButtonStyle}>
              <i className="fa fa-plus mr-2"></i>
              Add Post Paid Customer</Button> */}
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardHeader>
            </CardHeader>
            <CardBody>
              
            <ReactDatatable
                config={this.config}
                records={this.state.customersPostPaidList}
                columns={this.columns}
                />
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default PostPaidCustomers;
