import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Breadcrumb
} from "reactstrap";
import $ from "jquery";
import Moment from 'moment';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

class Senders extends Component {
  state = {
    senderIdList: [],
    field: null,
    order: null
  };


  componentDidMount() {
    axios.get("/sender-ids")
      .then(res => {
        const response = res.data;
        this.setState({ senderIdList: response })
        console.log(response);
      })
  }

  columns = [{
    dataField: 'id',
    text: 'ID',
    sort: true,
    onSort: this.handleSort
  }, {
    dataField: 'senderId',
    text: 'Customer/Organization'
  }, {
    dataField: 'senderId',
    text: 'SENDER'
  },
  {
    dataField: 'dateCreated',
    text: 'DATE REGISTERED',
    isDummyField: true,
    formatter:(cellContent,row)=>{
      return (this.formatDate(row.dateCreated))
    }
  },
  {
    dataField: 'is_approved',
    text: 'STATUS',
    isDummyField: true,
    formatter: (cellContent, row) => {
      if (row.is_approved == 1) {
        return (
          <span className="badge badge-success">Approved</span>
        );
      } else if (row.is_approved == 0) {
        return (<span className="badge badge-warning">Pending</span>)
      } else {
        return (
          <span className="badge badge-danger">Rejected</span>
        );
      }
    }
  }
  ];

  ViewRequestedSenders = () => {
    return this.props.history.push('/admin/senders-requested')
  }
  AddSenderId = () => {
    return this.props.history.push('/admin/add-senderid')
  }
  formatDate = (date) => {
    return Moment(date).format('DD-MM-YYYY')
  }
  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  }
  handleSort = (field, order) => {
    this.setState({
      field,
      order
    });
  }


  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
           <h3 style={{ fontWeight:500 }}>Manage Customers Sender id's</h3>
            <small>Showing all customers sender id's.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.ViewRequestedSenders} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View Requested SenderId's</Button>
            <Button onClick={this.AddSenderId} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
              Add New SenderId</Button>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardHeader>
              <div className="row">
                <Card className="col-sm-12">
                  <CardBody>
                    <form onSubmit={this.onSubmit}>
                      <div className="form-row align-items-center">
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label>From :</label>
                            <input className="form-control" type="date" />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label>To: </label>
                            <input className="form-control" type="date" />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">No of records: </label>
                            <select className="form-control" id="exampleFormControlSelect1">
                              <option>All</option>
                              <option>100</option>
                              <option>200</option>
                              <option>500</option>
                              <option>1000</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <button type="submit" className="btn btn-info mt-2">
                            Search
                          </button>
                        </div>

                      </div>
                    </form>
                  </CardBody>
                </Card>
              </div>
            </CardHeader>
            <CardBody>
              <BootstrapTable bootstrap4 striped keyField='id' 
              data={this.state.senderIdList} columns={this.columns}
               pagination={paginationFactory()} 
               sort={ {
                dataField: this.state.field,
                order: this.state.order
              } }
              noDataIndication="No senders added"
               />
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default Senders;
