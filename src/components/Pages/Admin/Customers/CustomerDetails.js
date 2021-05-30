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
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import classnames from 'classnames';
import $ from "jquery";



class CustomerDetails extends Component {
    state = {
        activeTab: '1',
        customerId: 0,
        customer: {},
        isApproved: 0,
        usersList: [],
        tarrifsList: [],
        paymentType:"",

        tariffId:22,
        monthlySmsLimit:0,
        smscUsername:"",
        smscPassword:""
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
        this.setState({ isApproved: state.isApproved })
        this.setState({ customerId: state.id })
        this.setState({paymentType:state.paymentType})

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



        axios.get("/tariff")
            .then(res => {
                const response = res.data;
                this.setState({ tarrifsList: response })
                console.log(response);
            })

    }
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

    handleSubmit = event => {
        event.preventDefault();
        this.hideToggelModal();


        const data=
        {
            "customerId":this.state.customerId,
            "tariffId":this.state.tariffId,
            "smscUsername":this.state.smscUsername,
            "smscPassword":this.state.smscPassword,
            "monthlySmsLimit":this.state.monthlySmsLimit
        }
    
        console.log(data)
        
        axios.put("/customers/approve",data).then(res=>{
            const response = res.data;

            this.ViewCustomerList();
        })
      }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value });
      }

    RejectCustomer(id) {

        axios.put("/customers/reject/" + id)
            .then(res => {
                const response = res.data;

                this.ViewCustomerList();
            })
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    hideToggelModal = () => {
        this.setState({
            modal: false,
        })
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
                        {this.state.isApproved == 1 &&
                            <Button onClick={() => this.ViewRequestedSenders} className="btn btn-pill mr-2 bg-danger">Disable Customer</Button>
                        }
                        {this.state.isApproved == 0 &&
                            <span>
                                <Button onClick={() => this.RejectCustomer(this.state.customerId)} className="btn btn-pill mr-2 bg-danger">Reject Customer</Button>
                                {/* <Button onClick={() => this.ApproveCustomer(this.state.customerId)} className="btn btn-pill mr-2 bg-success">Approve Customer</Button> */}
                                <Button onClick={() => this.toggleModal()} className="btn btn-pill mr-2 bg-success">Approve Customer</Button>
                            </span>
                        }
                        {
                            this.state.isApproved==2 &&
                            <span>
                                <Button onClick={() => this.toggleModal()} className="btn btn-pill mr-2 bg-success">Approve Customer</Button>
                            </span>
                        }
                        <Button onClick={this.ViewCustomerList} style={this.AddActionButtonStyle} className="btn-pill-right">View All Customers</Button>
                    </div>
                </div>
                <Container fluid>

                    <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Approve Customer</ModalHeader>
                        <form onSubmit={this.handleSubmit}>
                            <ModalBody>
                                <FormGroup>
                                    <label>Sms Username :</label>
                                    <input className="form-control" name="smscUsername" onChange={this.handleChange} type="text" required></input>
                                </FormGroup>
                                <FormGroup>
                                    <label>Smsc Password :</label>
                                    <input className="form-control" name="smscPassword" onChange={this.handleChange} type="text" required></input>
                                </FormGroup>

                                {this.state.paymentType=="Post-Paid" && 
                                <FormGroup>
                                    <label>Monthly sms limit :</label>
                                    <input className="form-control" name="monthlySmsLimit" onChange={this.handleChange} type="number" required></input>
                                </FormGroup>
    }
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Tariff : </label>
                                    <select className="form-control" id="exampleFormControlSelect1" name="tariffId" onChange={this.handleChange}>
                                        <option value="0">Select a tariff</option>
                                        {this.state.tarrifsList.map(row => (
                                            <option key={row.id} value={row.id} >
                                                {row.tariffName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <button className="btn btn-sm btn-success mr-3  px-5" type="submit">
                                    Approve
                    </button>
                                <button onClick={this.hideToggelModal} className="btn btn-sm btn-danger  px-5">
                                    Cancel
                   </button>
                            </ModalFooter>
                        </form>
                    </Modal>

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
                                                        <p className="mb-3 text-dark"><strong>Customer Type:</strong> &nbsp;
                                                        <span name="status"></span>{this.state.customer.customerType}
                                                        </p>
                                                        <p className="mb-3 text-dark"><strong>Payment Type:</strong> &nbsp;
                                                        <span name="status"></span>{this.state.customer.paymentType}
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
