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

class SendersRequested extends Component {
    state = {
        dtOptions: {
            paging: true, // Table pagination
            ordering: true, // Column ordering
            info: true, // Bottom left status text
            responsive: true,
            oLanguage: {
                sSearch: '<em class="fa fa-search"></em>',
                sLengthMenu: "_MENU_ records per page",
                info: "Showing page _PAGE_ of _PAGES_",
                zeroRecords: "Nothing found - sorry",
                infoEmpty: "No records available",
                infoFiltered: "(filtered from _MAX_ total records)",
                oPaginate: {
                    sNext: '<em class="fa fa-caret-right"></em>',
                    sPrevious: '<em class="fa fa-caret-left"></em>',
                },
            },
            // Datatable Buttons setup
            dom: "Bfrtip",
            buttons: [
                { extend: "csv", className: "btn-info" },
                { extend: "excel", className: "btn-info", title: "XLS-File" },
                { extend: "pdf", className: "btn-info", title: $("title").text() },
                { extend: "print", className: "btn-info" },
            ],
        },
        senderIdList: []
    };


    componentDidMount() {
        SenderIdService.GetAllPendingSenderIds().then(res => {
            const response = res.data;
            this.setState({ senderIdList: response })
            console.log(response);
        })
    }

    // Access to internal datatable instance for customizations
    dtInstance = (dtInstance) => {
        const inputSearchClass = "datatable_input_col_search";
        const columnInputs = $("tfoot ." + inputSearchClass);
        // On input keyup trigger filtering
        columnInputs.keyup(function () {
            dtInstance.fnFilter(this.value, columnInputs.index(this));
        });
    };

    ViewSenders = () => {
        return this.props.history.push('/admin/senders')
    }


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

    render() {
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
                            {/* <Datatable options={this.state.dtOptions}> */}
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
                                            <td>{row.id}</td>
                                            <td>{row.senderId}</td>
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
                                                <span className="btn badge-success mr-1" style={this.AddActionButtonStyle} onClick={() => this.ApproveSenderId(row.id)}>Approved</span>
                                                <span className="btn badge-danger" onClick={() => this.RejectSenderId(row.id)}>Rejected</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* </Datatable> */}
                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
        );
    }
}

export default SendersRequested;
