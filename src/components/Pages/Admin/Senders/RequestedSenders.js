import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import {SenderIdService} from "../../../../services"
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from "reactstrap";
import $ from "jquery";
import Moment from 'moment';

import ReactDatatable from '@ashvin27/react-datatable';
import NumberFormat from 'react-number-format';


class SendersRequested extends Component {
    state = {
       
        senderIdList: []
    };


    componentDidMount() {
        SenderIdService.GetAllPendingSenderIds().then(res => {
            const response = res.data;
            this.setState({ senderIdList: response })
            console.log(response);
        })
    }

   

    ViewSenders = () => {
        return this.props.history.push('/admin-senders')
    }


    ViewRequestedSenders = () => {
        return this.props.history.push('/admin-senders-requested')
    }
    AddSenderId = () => {
        return this.props.history.push('/admin-add-senderid')
    }
    formatDate = (date) => {
        return Moment(date).format('DD-MM-YYYY')
    }
    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

    ApproveSenderId = (id) => {
        SenderIdService.ApproveSenderId(id).then(
            res => {
                const response = res.data;
                const senderIdList = this.state.senderIdList.filter((sender) => {
                    return sender.id !== id;
                });
                this.setState({ senderIdList })
            }
        )
    }

    RejectSenderId = (id) => {
        SenderIdService.RejectSenderId(id).then(
            res => {
                const response = res.data;
                const senderIdList = this.state.senderIdList.filter((sender) => {
                    return sender.id !== id;
                });
                this.setState({ senderIdList })
            }
        )
    }

    columns = [
        {
          key: "id",
          text: "ID",
          sortable: true
        },
        {
          key: "customerEntity",
          text: "Customer/Organization",
          sortable: true,
          cell: (record, index) => {
            return (record.customerEntity.fullname)
          }
        },
        {
          key: "senderId",
          text: "SENDER",
          sortable: true
        },
        {
          key: "dateCreated",
          text: "DATE REGISTERED",
          cell: (record, index) => {
            return (this.formatDate(record.startDate))
          }
        },
        {
          key: "is_approved",
          text: "STATUS",
          sortable: true,
          cell: (record, index) => {
            if (record.is_approved == 1) {
              return (
                <span className="badge badge-success">Approved</span>
              );
            } else if (record.is_approved == 0) {
              return (<span className="badge badge-warning">Pending</span>)
            } else if (record.is_approved == 2) {
              return (<span className="badge badge-danger">Rejected</span>)
            }
            else {
              return (
                <span className="badge badge-danger">Disabled</span>
              );
            }
          }
        },
        {
          key: "id",
          text: "ACTION",
          cell: (record, index) => {
            if (record.is_approved == 1) {
              return (
                <span className="btn badge-danger" onClick={() => {
                  this.DisableSenderId(record);
                }}>Disable</span>
              );
            }
          }
        },
    
    
    
      ]
    
    render() {
        let index=0;
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Manage Requested Sender id's
            <small>Showing all requested sender id's.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewSenders} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Sender Id's</Button>
                        <Button onClick={this.AddSenderId} style={this.AddActionButtonStyle} className="btn-pill-right">
                            <i className="fa fa-plus mr-2"></i>
                            Add New Default SenderId</Button>
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
                           
                            <table className="table table-striped my-4 w-100">
                                <thead>
                                    <tr>
                                        <th data-priority="1">ID</th>
                                        <th>Customer/Organization</th>

                                        <th className="" data-priority="2">
                                            Sender
                      </th>
                                        <th>DATE REGISTERED</th>
                                        <th>STATUS</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.senderIdList.map(row => (
                                        <tr key={row.id}>
                                            <td>{index+=1}</td>
                                            <td>{row.customerEntity.fullname}</td>
                                            <td>{row.senderId}</td>
                                            <td>{this.formatDate(row.dateCreated)}</td>
                                            <td>
                                                {row.is_approved == 1 &&
                                                    <span className="badge badge-success">Approved</span>
                                                }
                                                {row.is_approved == 0 &&
                                                    <span className="badge badge-warning">Pending</span>
                                                }
                                                {
                                                    row.is_approved == 2 &&
                                                    <span className="badge badge-danger">Rejected</span>
                                                }

                                            </td>
                                            <td>
                                                <span className="btn badge-success mr-1" style={this.AddActionButtonStyle} onClick={() => this.ApproveSenderId(row.id)}>Approve</span>
                                                <span className="btn badge-danger" onClick={() => this.RejectSenderId(row.id)}>Reject</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                           
                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
        );
    }
}

export default SendersRequested;
