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
        customer: {},
        isActive: 0,
        usersList: []
    };

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    ViewCustomerList = () => {
        return this.props.history.push("/admin/customers-list")
    }


    handleClickActiveTab = event => {
        const newActiveTab = event.target.tab;
        this.setState({
            activeTab: newActiveTab,
        })
    }

    componentDidMount() {

        const { state } = this.props.history.location;
        // console.log(state.id)
        this.setState({ isActive: state.isActive })
        this.setState({ customerId: state.id })

        axios.get("/customers/" + state.id)
            .then(res => {
                const response = res.data;
                this.setState({ customer: response })
            })

        axios.get("/customers/users-list/" + state.id)
            .then(res => {
                const response = res.data;
                this.setState({ usersList: response })
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
    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

    TableActionButtonStyle = {
        color: 'white',
        background: "#33414e"
    }

    ApproveCustomer(id) {
        console.log(id)
        axios.put("/customers/approve/" + id)
            .then(res => {
                const response = res.data;

                this.ViewCustomerList();
            })

    }

    RejectCustomer(id) {

        axios.put("/customers/reject/" + id)
            .then(res => {
                const response = res.data;

                this.ViewCustomerList();
            })
    }

    DeleteTariff(id) {
        console.log("am here ")
        console.log(id)
        // axios.delete("/customers/approve/313" + id)
        // .then(res => {
        //   const response = res.data;
        //   const tarrifsList = this.state.tarrifsList.filter((tarrif) => {
        //     return tarrif.id !== id;
        //   });
        //   this.setState({ tarrifsList })
        // })
    }


    render() {
        const id = this.state.customer.id;
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Customer Details : {this.state.customer.fullname}
                        <small>Showing all customer details.</small>
                    </div>
                    <div className="flex-row d-block d-md-flex">
                        {this.state.isActive == 1 &&
                            <Button onClick={() => this.ViewRequestedSenders} className="btn btn-pill mr-2 bg-danger">Disable Customer</Button>
                        }
                        {this.state.isActive != 1 &&
                            <span>
                                <Button onClick={() => this.RejectCustomer(this.state.customerId)} className="btn btn-pill mr-2 bg-danger">Reject Customer</Button>
                                <Button onClick={() => this.ApproveCustomer(this.state.customerId)} className="btn btn-pill mr-2 bg-success">Approve Customer</Button>
                            </span>
                        }
                        <Button onClick={this.ViewCustomerList} style={this.AddActionButtonStyle} className="btn-pill-right">View All Customers</Button>
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
                                              Attachments
                                            </NavLink>
                            </NavItem>
                        
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '4' })}
                                    onClick={() => { this.toggleTab('3'); }}>
                                    <span className="fa fa-users mr-2"></span>
                                                 User Accounts
                                            </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">

                                <Col xl="12">
                                    <div>
                                        <div className="card">
                                            <div className="card-header px-0">
                                                <h4 className="text-center mt-2">Customer Details</h4>
                                            </div>
                                            <hr className="my-0" />
                                            <div className="card-body mt-2 py-1">
                                                <div className="px-md-3 px-2">
                                                    <div className="px-2">
                                                        <p className="mb-3 text-dark"><strong>Customer name:</strong> &nbsp; <span name="name">{this.state.customer.fullname}</span></p>
                                                        <p className="mb-3 text-dark"><strong>Email:</strong> &nbsp; <span name="email">{this.state.customer.email}</span></p>
                                                        <p className="mb-3 text-dark"><strong>Phone:</strong> &nbsp; <span name="phone">{this.state.customer.phonenumber}</span></p>
                                                        <p className="mb-3 text-dark"><strong>Address:</strong> &nbsp; <span name="address">{this.state.customer.location}</span></p>
                                                        <p className="mb-3 text-dark"><strong>Status:</strong> &nbsp;
                                                        <span name="status"></span>{this.state.customer.isActive == 1 ? "Active" : "Pending"}
                                                        </p>
                                                        <p className="mb-3 text-dark"><strong>Date registered:</strong> &nbsp; <span name="regdate">{this.state.customer.createdAt}</span></p>
                                                        <p className="mb-3 text-dark"><strong>ID number:</strong> &nbsp; <span name="nidaid">19900302-600123-456791</span></p>
                                                        {/* <p className="mb-3 text-dark"><strong>Attachment:</strong> &nbsp; <span name="attachment"><a href="#">View Attachment</a></span></p> */}
                                                        {/* <p className="mb-3 text-dark"><strong>SMSC ID:</strong> &nbsp; <span name="smsc">ID-01XXXX</span></p> */}
                                                        {/* <p className="mb-3 text-dark"><strong>Tariff:</strong> &nbsp; <span name="tariff">Dabo Bando</span></p> */}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Col>


                            </TabPane>
                            <TabPane tabId="2">

                                <Col xl="12">
                                    <div>
                                        <div className="card">
                                            <div className="card-header px-0">
                                                <h4 className="text-center mt-2">Customer Details</h4>
                                            </div>
                                            <hr className="my-0" />
                                            <div className="card-body mt-2 py-1">
                                                <div className="px-md-3 px-2">
                                                    <div className="px-2">
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
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Col>



                            </TabPane>

                        
                            <TabPane tabId="3">


                                <Col xl="12">
                                    <div>
                                        <div className="card">
                                            <div className="card-header px-0">
                                                <h4 className="text-center mt-2">User Accounts</h4>
                                            </div>
                                            <hr className="my-0" />
                                            <div className="card-body mt-2 py-1">
                                                <div className="px-md-3 px-2">
                                                    <div className="px-2">
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
                                                                {this.state.usersList.map(row =>
                                                                    <tr className="gradeA" key={row.id}>
                                                                        <td>{row.id}</td>
                                                                        <td>{row.name}</td>
                                                                        <td>{row.username}</td>
                                                                        <td>500</td>
                                                                        <td>
                                                                            {/* <span className="badge badge-warning">Pending</span>
                      <span className="badge badge-danger">Rejected</span> */}
                                                                            <span className="badge badge-success">Active</span>
                                                                        </td>
                                                                        <td>2020-04-01 13:18:51</td>

                                                                    </tr>
                                                                )}

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Col>


                            </TabPane>

                        </TabContent>
                    </div>



                </Container>
            </ContentWrapper>
        );
    }
}

export default CustomerDetails;
