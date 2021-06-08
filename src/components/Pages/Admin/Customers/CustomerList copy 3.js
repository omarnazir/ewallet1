import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import $ from "jquery";
import Moment from 'moment'


import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { AuthService } from '../../../../services';
import {Redirect} from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';

class CustomerList extends Component {
  state = {
    customersList: [],
    field: null,
    order: null,
    index:0
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
    return Moment(date).format('DD-MM-YYYY')
  }

  columns = [
    {
        key: "id",
        text: "Name",
        sortable: true
    },
    {
        key: "email",
        text: "Address",
        sortable: true
    },
    {
        key: "postcode",
        text: "Postcode",
        sortable: true
    },
    {
        key: "rating",
        text: "Rating",
        sortable: true
    },
    {
        key: "type_of_food",
        text: "Type of Food"
    }
];


config = {
  page_size: 10,
  length_menu: [10, 20, 50],
  show_filter: true,
  show_pagination: true,
  pagination: 'advance',
  button: {
      excel: false,
      print: false
  }
}




  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}/>
  }

    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Customers List
            <small>Showing all customers.</small>
          </div>
          <div className="flex-row">
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardHeader>
            </CardHeader>
            <CardBody>
            <ReactDatatable 
                config={this.config}
                records={this.state.customersList}
                columns={this.columns}/>


            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default CustomerList;
