import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";

import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import Moment from 'moment';
import ReactDatatable from '@ashvin27/react-datatable';
import { AuthService, FarmersService } from '../../../../services';
import { Redirect } from 'react-router-dom';
import axios from "../../../../services/axios";

class AdminWallet extends Component {
  state = {
    transactionList: []
  };

  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" });
    }

    axios.post("/transactions", {}).then(res => {
      this.setState({ transactionList: res.data.results });
    });
  }

  formatDate = (date) => {
    return Moment(date).format('lll');
  };

  ViewMakePaymentPage = () => {
    return this.props.history.push('/admin-make-payment');
  };

  ViewApprovePaymentPage = () => {
    return this.props.history.push('/admin-approve-payments');
  }


  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  };

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
  };




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
      key: "amount",
      text: "AMOUNT"
    },
    {
      key: "crop",
      text: "CROP",
      cell: (record, i) => {
        return record.farmerOutput.crop.name;
      }
    },
    {
      key: "createdAt",
      text: "TRANSACTION DATE"
    },
    {
      key: "sex",
      text: "CREATED BY",
    },
    {
      key: "approvedBy",
      text: "APPROVED BY",
      cell: (record, i) => {
        return record.paymentBatch.approvedBy;
      }
    },
    {
      key: "msisdn",
      text: "PHONE NUMBER",
    },
    {
      key: "paymentBatch",
      text: "PAYMENT BATCH",
      cell: (record, i) => {
        return record.paymentBatch.name;
      }
    },
    // {
    //   key: "id",
    //   text: "ACTION",
    //   cell: (record, index) => {
    //     return (
    //       <Button style={{
    //         color: 'white',
    //         background: "#003366"
    //       }} className="btn btn-success"
    //         onClick={() => {
    //           this.ViewTransactionDetails(record);
    //         }}
    //       >
    //         <i className="fa fa-eye"></i>
    //       </Button>
    //     );
    //   }
    // }

  ];


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let index = 0;

    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            MPESA Wallet
            <small>Manage payments.</small>
          </div>
          <div className="flex-row d-block d-md-flex">
            <span className="btn badge-success mr-2 px-4" onClick={this.ViewMakePaymentPage} >Make Payment</span>
            <span className="btn badge-success mr-2 px-4" onClick={this.ViewApprovePaymentPage} >Approve Payment</span>
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
                records={this.state.transactionList}
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
