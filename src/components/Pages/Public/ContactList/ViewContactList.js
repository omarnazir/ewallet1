import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import $ from "jquery";
import Moment from 'moment'
import { AuthService } from '../../../../services';
import {Redirect} from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';

class ViewContactList extends Component {
  state = {
    customersList: [],
    field: null,
    order: null,
    index:0,
    id:0
  };

  componentDidMount() {

    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }

    const { state } = this.props.history.location;
    
   
    if (state == undefined) {
        return this.props.history.push('/admin/customers-list/')
    }
    this.setState({id:state.id})
    console.log(state)
    console.log("from id" +state.id)
    console.log(this.state.id)
    
  
    axios.get("/contact-lists/numbers/"+state.id)
      .then(res => {
        const response = res.data;
        this.setState({ customersList: response })
        console.log(response);
      })
  }



  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
}

  formatDate = (date) => {
    return Moment(date).format('DD-MM-YYYY')
  }

  ViewAddContactList = () => {
    return this.props.history.push("/admin/customers-list/");
  };

  columns = [
    {
        key: "id",
        text: "Id",
        sortable: true
    },
    {
        key: "phoneNumber",
        text: "Phone Number",
        sortable: true
    },
    {
        key: "column1",
        text: "Column 1",
        sortable: true
    },
    {
        key: "column2",
        text: "Column 2",
        sortable: true
    },
    {
        key: "column3",
        text: "Column 3",
        sortable: true
    },

    {
        key: "column4",
        text: "Column 4",
        sortable: true
    },
    {
        key: "column5",
        text: "Column 5",
        sortable: true
    }
];


config = {
  page_size: 10,
  length_menu: [10, 25, 50],
  show_filter: true,
  show_pagination: true,
  pagination:'advance',
  filename: "Contact List",
  button: {
      
    
  }
}
// csv: true
// excel: true,
//       print: true,
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}/>
  }

    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Contact list details
            <small>Showing all contact lists.</small>
          </div>
          <div className="flex-row">
          <Button onClick={this.ViewAddContactList} style={this.AddActionButtonStyle} className="btn-pill-right">
              View all Contact lists
            </Button>
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

export default ViewContactList;
