import React, { Component,Fragment } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";

import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import Moment from 'moment'
import ReactDatatable from '@ashvin27/react-datatable';
import { AuthService, UssdMenuService } from '../../../../services';
import { Redirect } from 'react-router-dom';

class UssdMenu extends Component {
  state = {
    ussdMenuList: []
  };

  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }

    UssdMenuService.getAllUssdMenu().then(res => {
      this.setState({ ussdMenuList: res.data })
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
    pagination: 'advance',
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
        return index + 1;
      }
    },
    {
      key: "title",
      text: "TITLE"
    },
    {
      key: "type",
      text: "TYPE"
    },
    {
      key: "dataSource",
      text: "DATA SOURCE"
    },
    {
      key: "priority",
      text: "PRIORITY",
    },
    {
      key: "itemDataUrl",
      text: "DATA URL",
    },
    {
      key: "itemDataMethod",
      text: "DATA METHOD",
    },
    {
      key: "id",
      text: "ACTION",
      cell: (record, index) => {
        return (
          <Fragment>
            <span className="btn badge-success mr-2 px-4" onClick={() => this.EditAlertMail(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
            <span className="btn bg-danger-dark  px-4 mt-1" onClick={() => this.DeleteAlertMail(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
          </Fragment>
        )
      }
    }

  ];


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    let index = 0

    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Ussd Menu
            <small>Manage USSD Menu.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.AddSenderId} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
              Add Menu </Button>
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
                records={this.state.ussdMenuList}
                columns={this.columns}

              />
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default UssdMenu;