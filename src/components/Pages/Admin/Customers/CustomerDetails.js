import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import {
    Container, Card, CardHeader, CardBody, CardTitle, Button, FormGroup,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Col
} from "reactstrap";
import classnames from 'classnames';
import $ from "jquery";



class CustomerDetails extends Component {
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
        activeTab: '1',
        customerId: 0,
        customer: {}
    };

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    handleClickActiveTab = event => {
        const newActiveTab = event.target.tab;
        this.setState({
            activeTab: newActiveTab,
        })
    }

    componentDidMount() {

        const { state } = this.props.history.location;
        // this.setState({customer:state})
        console.log("from page 2 ")
        console.log(state.id)

        axios.get("/customers/" + state.id)
            .then(res => {
                const response = res.data;
                this.setState({ customer: response })
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
    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

    TableActionButtonStyle = {
        color: 'white',
        background: "#33414e"
    }



    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Customer Details : {this.state.customer.fullname}
                        <small>Showing all customer details.</small>
                    </div>
                    <div className="flex-row d-block d-md-flex">
                        <Button onClick={this.ViewRequestedSenders} className="btn btn-pill mr-2 bg-danger">Disable Customer</Button>
                        <Button onClick={this.AddSenderId} style={this.AddActionButtonStyle} className="btn-pill-right">View All Customers</Button>
                    </div>
                </div>
                <Container fluid>


                    <div role="tabpanel card card-body">
                        {/* Nav tabs */}
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggleTab('1'); }}>
                                    <span className="icon-people mr-2"></span>
                                             Customer Details
                                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggleTab('2'); }}>
                                    <span className="icon-wallet mr-2"></span>
                                              Transactions
                                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggleTab('3'); }}>
                                    <span className="fa fa-users mr-2"></span>
                                                 User Accounts
                                            </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">

                                <Col xl="12">
                                    <div className="col-md-8 offset-md-2">
                                        <div className="card">
                                            <div className="card-header px-0">
                                                <h4 className="text-center mt-2">Customer Details</h4>
                                            </div>
                                            <hr className="my-0" />
                                            <div className="card-body mt-2 py-1">
                                                <div className="px-md-3 px-2">
                                                    <div className="px-2">
                                                        <p className="mb-3 text-dark"><strong>Customer name:</strong> &nbsp; <span name="name">{this.state.customer.fullname }</span></p>
                                                        <p className="mb-3 text-dark"><strong>Email:</strong> &nbsp; <span name="email">{this.state.customer.email }</span></p>
                                                        <p className="mb-3 text-dark"><strong>Phone:</strong> &nbsp; <span name="phone">{this.state.customer.phonenumber }</span></p>
                                                        <p className="mb-3 text-dark"><strong>Address:</strong> &nbsp; <span name="address">{this.state.customer.location }</span></p>
                                                        <p className="mb-3 text-dark"><strong>Status:</strong> &nbsp; <span name="status"></span>Pending</p>
                                                        <p className="mb-3 text-dark"><strong>Date registered:</strong> &nbsp; <span name="regdate">12/01/2021</span></p>
                                                        <p className="mb-3 text-dark"><strong>ID number:</strong> &nbsp; <span name="nidaid">19900302-600123-456791</span></p>
                                                        <p className="mb-3 text-dark"><strong>Attachment:</strong> &nbsp; <span name="attachment"><a href="#">View Attachment</a></span></p>
                                                        <p className="mb-3 text-dark"><strong>SMSC ID:</strong> &nbsp; <span name="smsc">ID-01XXXX</span></p>
                                                        <p className="mb-3 text-dark"><strong>Tariff:</strong> &nbsp; <span name="tariff">Dabo Bando</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer bg-white py-3">
                                                <Button color="success" className="btn-pill mr-3">Approve Customer</Button>
                                                <Button color="danger" className="btn-pill mr-3">Reject Customer</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>


                            </TabPane>
                            <TabPane tabId="2">
                                <table className="table table-striped my-4 w-100">
                                    <thead>
                                        <tr>
                                            <th data-priority="1">#</th>
                                            <th>DATE</th>
                                            <th>TXN ID</th>
                                            <th>TYPE</th>
                                            <th>SMS</th>
                                            <th>RECEIPT</th>
                                            <th>MSISDN</th>
                                            <th>AMOUNT</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                    </tbody>
                                </table>

                            </TabPane>
                            <TabPane tabId="3">

                                <table className="table table-striped my-4 w-100">
                                    <thead>
                                        <tr>
                                            <th data-priority="1">#</th>
                                            <th>FULL NAME</th>
                                            <th>USERNAME</th>
                                            <th className="sort-numeric">SMS MONTHLY LIMIT</th>

                                            <th>STATUS</th>
                                            <th>LAST LOGIN</th>

                                        </tr>
                                    </thead>
                                    <tbody>


                                    </tbody>
                                </table>
                            </TabPane>

                        </TabContent>
                    </div>



                </Container>
            </ContentWrapper>
        );
    }
}

export default CustomerDetails;
