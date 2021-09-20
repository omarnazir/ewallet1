import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";

import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import Moment from 'moment'
import ReactDatatable from '@ashvin27/react-datatable';
import { AuthService, FarmersService } from '../../../../services';
import { Redirect } from 'react-router-dom';

class AdminWallet extends Component {
  state = {
    farmersList: []
  };

  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }

    // FarmersService.getAllFarmers().then(res => {
    //   this.setState({ farmersList: res.data })
    // })
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
      key: "firstName",
      text: "AMOUNT"
    },
    {
      key: "middleName",
      text: "TYPE"
    },
    {
      key: "surname",
      text: "TRANSACTION DATE"
    },
    {
      key: "sex",
      text: "CREATED BY",
    },
    {
      key: "approved",
      text: "APPROVED BY",
    },
    {
      key: "msisdn",
      text: "AMCOS",
    }, 
    // {
    //   key: "createdAt",
    //   text: "DATE PAID",
    //   sortable: true,
    //   cell: (record, index) => {
    //     return (this.formatDate(record.createdAt))
    //   }
    // },
    {
      key: "id",
      text: "ACTION",
      cell: (record, index) => {
        return (
          <Button style={{
            color: 'white',
            background: "#003366"
          }} className="btn btn-success"
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
      return <Redirect to={this.state.redirect} />
    }
    let index = 0

    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            MPESA Wallet
            <small>Manage payments.</small>
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
                extraButtons={this.extraButtons}
                config={this.config}
                records={this.state.farmersList}
                columns={this.columns}

              />
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default AdminWallet;
