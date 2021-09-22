import React, { Component,Fragment } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Moment from "moment";
import axios from "../../../../services/axios";
import {
    Container, Button, FormGroup,
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

class AmcosDetails extends Component {
    state = {
        activeTab: '1',
        customerId: 0,
        customer: {},
        isApproved: 0,
        usersList: [],
        tarrifsList: [],

        smscList:[],
        smscId:0,
        showSmscDetails:false,
        smscType:-1,
        paymentType: "",

        tariffId: 22,
        monthlySmsLimit: 0,
        
        customerModal: false,
        editedCustomer: {
            tariffFk: 0,
            monthlyLimit: 0,
            autoRenewal: ""
        },
        imgURl:"",
        img:{},
        previewURl:{},
        attachmentUrl:""

    };

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    ViewFarmersList = () => {
        return this.props.history.push("/admin-farmers-list")
    }


    handleClickActiveTab = event => {
        const newActiveTab = event.target.tab;
        this.setState({
            activeTab: newActiveTab,
        })
    }

    componentDidMount() {

        const { state } = this.props.history.location;
        if (state == undefined) {
            return this.props.history.push('/admin-customers-list/')
        }

        this.setState({ isApproved: state.isApproved })
        this.setState({ customerId: state.id })
        this.setState({ paymentType: state.paymentType })

        axios.get("/customers/" + state.id)
            .then(res => {
                const customer = res.data;
                this.setState({ customer})
            })
        const attachmentUrl="https://sms.vodacom.co.tz/api/v1/img/customer-attachment/"+state.id;
        this.setState({attachmentUrl})

        axios.get("/customers/users-list/" + state.id)
            .then(res => {
                const response = res.data;
                this.setState({ usersList: response })
                console.log(response);
            })
            axios.get("/img/customer-attachment/" + state.id)
            .then(res => {
                const img = res.data;
                console.log(res)
                this.setState({ previewURl:img })
                
            })
        


        axios.get("/tariff")
            .then(res => {
                const response = res.data;
                this.setState({ tarrifsList: response })
                console.log(response);
            })

            axios.get("/smsc/dedicated-pending")
            .then(res => {
                const response = res.data;
                this.setState({ smscList: response })
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
                this.ViewFarmersList();
            })

    }

    handleSubmit = event => {
        event.preventDefault();
        this.hideToggelModal();
        const data =
        {
            "customerId": this.state.customerId,
            "tariffId": this.state.tariffId,
             "smscId":this.state.smscId,
            "monthlySmsLimit": this.state.monthlySmsLimit
        }

        console.log(data)

        axios.put("/customers/approve", data).then(res => {
            const response = res.data;
            this.ViewFarmersList();
        })
    }

    handleCustomerUpdateFomSubmission = event => {

        event.preventDefault();
        this.toggleModalCustomer();


        const data = {
            customerId: this.state.customer.id,
            tariffId: this.state.editedCustomer.tariffFk,
            monthlySmsLimit: this.state.editedCustomer.monthlyLimit,
            autoRenew: this.state.editedCustomer.autoRenewal,

        }
        console.log("data", data)
        axios.put("/customers/auto-renew", data)
            .then(res => {
                const response = res.data;
                this.ViewFarmersList();
            })

    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChangeDetails = event => {
        this.setState({
            editedCustomer: Object.assign({},
                this.state.editedCustomer, { [event.target.name]: event.target.value })
        })
    }

    handleSmsTypeChange = event => {
        console.log("Am here")
        if ([event.target.value] == "0") {
            this.setState({ showSmscDetails: false })
            this.setState({smscId:0})
            this.setState({smscType:0})
        } else {
            this.setState({ showSmscDetails: true })
            this.setState({smscType:1})
           
        }
    }

    RejectCustomer(id) {
        axios.put("/customers/reject/" + id)
            .then(res => {
                const response = res.data;
                this.ViewFarmersList();
            })
    }

    EditCustomer() {
        console.log("edit")
        console.log(this.state.customer)
        console.log("TariffFk", this.state.customer.tariffFk)
        console.log(this.state.customer.autoRenewal)
        console.log(this.state.customer.monthlyLimit)


        this.setState({
            editedCustomer: Object.assign({},
                this.state.editedCustomer, { tariffFk: this.state.customer.tariffFk })
        })

        console.log(this.state.editedCustomer);
        this.setState({ editedCustomer: { ...this.state.editedCustomer, tariffFk: this.state.customer.tariffFk } })

        this.setState({
            editedCustomer: Object.assign({},
                this.state.editedCustomer, { tariffFk: this.state.customer.tariffFk })
        })

        //     this.setState({editedCustomer:Object.assign({},
        //         this.state.editedCustomer,{[event.target.name]:event.target.value})})


        this.setState({
            editedCustomer: Object.assign({},
                this.state.editedCustomer, { autoRenewal: this.state.customer.autoRenewal })
        })

        this.setState({
            editedCustomer: Object.assign({},
                this.state.editedCustomer, { monthlyLimit: this.state.customer.monthlyLimit })
        })
        console.log(this.state.editedCustomer);
        this.toggleModalCustomer();

    }
    toggleModalCustomer = () => {
        this.setState({
            customerModal: !this.state.customerModal
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

    formatDate = (date) => {
        return Moment(date).format('lll')
    }

    previewAttachment=()=>{
        window.open(this.state.attachmentUrl, "_blank")
    }


    render() {
        const id = this.state.customer.id;
        let userIndex = 0;
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Amcos Details : {this.state.customer.fullname}
                        <small>Showing all amcos details.</small>
                    </div>
                    <div className="flex-row d-block d-md-flex">
                        {this.state.isApproved == 1 &&
                            this.state.paymentType == "Post-Paid" &&
                            <Button onClick={() => this.EditCustomer()} className="btn btn-pill mr-2 bg-success">Edit Customer</Button>
                        }
                        {this.state.isApproved == 1 &&
                            <Button onClick={() => this.RejectCustomer(this.state.customerId)} className="btn btn-pill mr-2 bg-danger">Disable Customer</Button>
                        }
                        {this.state.isApproved == 0 &&
                            <span>

                                <Button onClick={() => this.RejectCustomer(this.state.customerId)} className="btn btn-pill mr-2 bg-danger">Reject Customer</Button>
                                <Button onClick={() => this.toggleModal()} className="btn btn-pill mr-2 bg-success">Approve Customer</Button>
                            </span>
                        }
                        {
                            this.state.isApproved == 2 &&
                            <span>
                                <Button onClick={() => this.toggleModal()} className="btn btn-pill mr-2 bg-success">Approve Customer</Button>
                            </span>
                        }
                        
            <span className="btn badge-success mr-2 px-4" onClick={() => this.EditRole(record)}> <i className="icon-pencil mr-2"  ></i>Edit Amcos</span>
            <span className="btn bg-danger-dark mr-2 px-4" onClick={() => this.DeleteRole(record.id)}> <i className="fa fa-trash mr-2"></i>Delete Amcos </span>
          
                        <Button onClick={this.ViewFarmersList} style={this.AddActionButtonStyle} className="btn-pill-right">View All Amcos</Button>
                    </div>
                </div>
                <Container fluid>
                    <Modal isOpen={this.state.customerModal} toggle={this.toggleModalCustomer}>
                        <ModalHeader toggle={this.toggleModalCustomer}>Edit Customer</ModalHeader>
                        <form onSubmit={this.handleCustomerUpdateFomSubmission}>
                            <ModalBody>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Tariff : </label>
                                    <select className="form-control" id="exampleFormControlSelect1" name="tariffFk" onChange={this.handleChangeDetails}
                                        value={this.state.editedCustomer.tariffFk}
                                    >
                                        <option value="0">Select a tariff</option>
                                        {this.state.tarrifsList.map(row => (
                                            <option key={row.id} value={row.id} >
                                                {row.tariffName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <FormGroup>
                                    <label>Monthly sms limit :</label>
                                    <input className="form-control" name="monthlyLimit"
                                        value={this.state.editedCustomer.monthlyLimit}
                                        onChange={this.handleChangeDetails} type="number" required></input>
                                </FormGroup>


                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Auto Renew : </label>
                                    <select className="form-control" id="exampleFormControlSelect1" name="autoRenewal"
                                        onChange={this.handleChangeDetails}
                                        value={this.state.editedCustomer.autoRenewal}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="1">ACTIVE</option>
                                        <option value="0">DISABLED</option>
                                    </select>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <button className="btn btn-sm btn-success mr-3  px-5" type="submit">
                                    Save
                                </button>
                            </ModalFooter>
                        </form>
                    </Modal>

                    <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Approve Customer</ModalHeader>
                        <form onSubmit={this.handleSubmit}>
                            <ModalBody>


                            {this.state.paymentType == "Post-Paid" &&
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Smsc Type : </label>
                                    <select className="form-control" id="exampleFormControlSelect1" name="smscType"
                                        onChange={this.handleSmsTypeChange}
                                        value={this.state.smscType}
                                    >
                                        <option value="-1">Select type</option>
                                        <option value="0">Shared SMSC</option>
                                        <option value="1">Dedicate SMSC</option>
                                    </select>
                                </div>

                             }


                            {this.state.showSmscDetails  &&
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Smsc Account : </label>
                                    <select className="form-control" id="exampleFormControlSelect1" name="smscId"
                                        onChange={this.handleChange}
                                        value={this.state.smscId}
                                    >
                                        <option value="-1">Select account</option>
                                        {this.state.smscList.map(row => (
                                            <option key={row.id} value={row.id} >
                                                {row.smscUsername}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                             }
                                {this.state.paymentType == "Post-Paid" &&
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
                                {/* <button onClick={this.hideToggelModal} className="btn btn-sm btn-danger  px-5">
                                    Cancel
                   </button> */}
                            </ModalFooter>
                        </form>
                    </Modal>

                    <div role="tabpanel card card-body">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggleTab('1'); }}>
                                    <span className="fa fa-map-marker-alt mr-2"></span>
                                    Amcos Details
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggleTab('2'); }}>
                                    <span className="fa fa-leaf mr-2"></span>
                                    Crops
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggleTab('3'); }}>
                                    <span className="fa fa-snowflake mr-2"></span>
                                    Pembejeo
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">

                                <Col xl="12">
                                    <div>
                                        <div className="card">
                                            <div className="card-header px-0">
                                                <h4 className="text-center mt-2">Amcos Details</h4>
                                            </div>
                                            <hr className="my-0" />
                                            

                                        </div>
                                    </div>
                                </Col>


                            </TabPane>
                            <TabPane tabId="2">

                                <Col xl="12">
                                    <div>
                                        <div className="card">
                                            <div className="card-header px-0">
                                                <h4 className="text-center mt-2">Crops</h4>
                                            </div>
                                            <hr className="my-0" />
                                            <div className="card-body mt-2 py-1">
                                             
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
                                                <h4 className="text-center mt-2">Pembejeo</h4>
                                            </div>
                                            <hr className="my-0" />
                                            

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

export default AmcosDetails;
