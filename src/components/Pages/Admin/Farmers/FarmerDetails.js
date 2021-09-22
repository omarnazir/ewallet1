import React, { Component, Fragment } from "react";
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
    Table,
    Card, CardHeader, CardBody,
} from "reactstrap";
import classnames from 'classnames';
import { calculateAge } from '../../../../utils/AgeCalculator';
import NumberFormat from 'react-number-format'
import ReactDatatable from '@ashvin27/react-datatable';
import { AuthService, HarvestsService } from '../../../../services';


class FarmerDetails extends Component {
    state = {
        activeTab: '1',
        farmerId: 0,
        farmer: {},
        isApproved: 0,
        usersList: [],
        tarrifsList: [],

        smscList: [],
        smscId: 0,
        showSmscDetails: false,
        smscType: -1,
        paymentType: "",

        tariffId: 22,
        monthlySmsLimit: 0,

        customerModal: false,
        editedCustomer: {
            tariffFk: 0,
            monthlyLimit: 0,
            autoRenewal: ""
        },
        imgURl: "",
        img: {},
        previewURl: {},
        attachmentUrl: "",


        //Above to delete
        loading: true,
        farmer: {
            id: 0,
            firstName: "",
            surname: "",
            sex: "",
            idNumber: "",
            dateOfBirth: "",
            msisdn: "",
            mainCrop:{},
            secondaryCrop:{},
            ward:{},
            village:{},
            amcos:{},
            farmSize:0,
            farmingType:"",
            farmingMethod:"",
            registrationDate:Date.now()
        }

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
            return this.props.history.push('/admin-farmers-list/')
        }

        this.setState({ farmerId: state.id })
        axios.get("/farmers/" + state.id)
            .then(res => {
                const farmer = res.data;
                this.setState({ farmer })
            })
        HarvestsService.getAllHarvetByFarmer(state.id).then(res => {
            this.setState({ loading: false })
            this.setState({ harvestsList: res.data })
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
            "smscId": this.state.smscId,
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
            this.setState({ smscId: 0 })
            this.setState({ smscType: 0 })
        } else {
            this.setState({ showSmscDetails: true })
            this.setState({ smscType: 1 })

        }
    }

    RejectCustomer(id) {
        axios.put("/customers/reject/" + id)
            .then(res => {
                const response = res.data;
                this.ViewFarmersList();
            })
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

    previewAttachment = () => {
        window.open(this.state.attachmentUrl, "_blank")
    }

    ucFirst = (str) => {
        if (!str) return str;
        if (str.trim() == "undefined") return "";
        return str[0].toUpperCase() + str.slice(1);
    }


    getFarmerFullName = () => {
        const firstName = this.ucFirst(this.state.farmer.firstName);
        const middleName = this.state.farmer.middleName == undefined ? " " : this.ucFirst(this.state.farmer.middleName);
        const lastName = this.ucFirst(this.state.farmer.surname);
        return firstName + " " + middleName + " " + lastName;
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
            key: "crop",
            text: "CROP",
            cell: (record, index) => {
                return record.crop.name;
            }
        },
        {
            key: "weight",
            text: "WEIGHT",
            cell: (record, index) => {
                return (<NumberFormat value={record.weight} displayType={'text'} thousandSeparator={true} prefix={''} />)
            }
        },
        {
            key: "cropUnitPrice",
            text: "UNIT PRICE",
            cell: (record, index) => {
                return (<NumberFormat value={record.cropUnitPrice} displayType={'text'} thousandSeparator={true} prefix={''} />)
            }
        },
        {
            key: "cropsValue",
            text: "CROP VALUE",
            cell: (record, index) => {
                return (<NumberFormat value={record.cropsValue} displayType={'text'} thousandSeparator={true} prefix={''} />)
            }
        },
        {
            key: "collectionCenter",
            text: "COLLECTION CENTER",
            cell: (record, index) => {
                return record.collectionCenter.name;
            }
        },
        {
            key: "status",
            text: "STATUS",
            cell: (record, index) => {

                return (
                    <span className="badge badge-success">Received</span>
                );
            }
        },
        {
            key: "date",
            text: "RECEIVED AT",
            sortable: true,
            cell: (record, index) => {
                return (this.formatDate(record.date))
            }
        }

    ];


    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Farmer Details : {this.getFarmerFullName()}
                        <small>Showing all farmer details.</small>
                    </div>
                    <div className="flex-row d-block d-md-flex">
                        <span className="btn badge-success mr-2 px-4" onClick={() => this.EditRole(record)}> <i className="icon-pencil mr-2"  ></i>Edit Farmer</span>
                        <span className="btn bg-danger-dark mr-2 px-4" onClick={() => this.DeleteRole(record.id)}> <i className="fa fa-trash mr-2"></i>Delete Farmer </span>

                        <Button onClick={this.ViewFarmersList} style={this.AddActionButtonStyle} className="btn-pill-right">View All Farmers</Button>
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


                                {this.state.showSmscDetails &&
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
                                    <span className="icon-people mr-2"></span>
                                    Farmer Details
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggleTab('2'); }}>
                                    <span className="fa fa-leaf mr-2"></span>
                                    Agricultural Inputs
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggleTab('3'); }}>
                                    <span className="fa fa-snowflake mr-2"></span>
                                    Farmer Harvests
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">

                                <Col xl="12">
                                    <div>
                                        <div className="card card-default">

                                            <hr className="my-0" />
                                            <div className="card-body mt-2 mb-2">
                                                <div className="">
                                                    <div className="px-2">
                                                        <Table className="table table-bordered">

                                                            <tbody>
                                                                <tr>
                                                                    <th colSpan={4} className="text-uppercase">  <span className="fa fa-user mr-2"></span> Personal Information</th>
                                                                </tr>
                                                                <tr>
                                                                    <th>Full Name</th>
                                                                    {/* <td>{this.state.firstName + " " + this.state.surname}</td> */}
                                                                    <td>{this.getFarmerFullName()}</td>

                                                                    <th>Sex</th>
                                                                    <td>{this.state.farmer.sex}</td>
                                                                </tr>

                                                                <tr>

                                                                    <th>Date of Birth (Age)</th>
                                                                    <td>{this.state.farmer.dateOfBirth}</td>


                                                                    <th>Age (Years)</th>
                                                                    <td>{calculateAge(this.state.farmer.dateOfBirth)}</td>
                                                                </tr>

                                                                <tr>
                                                                    <th>Phone</th>
                                                                    <td>{this.state.farmer.msisdn}</td>
                                                                </tr>

                                                                <tr>
                                                                    <th colSpan={4} className="text-uppercase"><span className="fa fa-id-card mr-2"></span> Membership Information</th>
                                                                </tr>

                                                                <tr>
                                                                    <th>MemberID</th>
                                                                    <td>{this.state.farmer.memberID}</td>

                                                                    <th>Amcos</th>
                                                                    {/* <td>{this.state.farmer.amcos.name}</td> */}
                                                                </tr>

                                                                <tr>
                                                                    <th>Hamlet</th>
                                                                    <td>{this.state.farmer.hamlet}</td>

                                                                    <th></th>
                                                                    <td></td>
                                                                </tr>

                                                                <tr>
                                                                    <th colSpan={4} className="text-uppercase"><span className="fa fa-leaf mr-2"></span> Farm Information</th>
                                                                </tr>

                                                                <tr>
                                                                    <th>Location</th>
                                                                    <td colSpan={3}>
                                                                        {this.state.region}{", "}
                                                                        {this.state.district}{", "}
                                                                        {this.state.ward}{", "}
                                                                        {this.state.village}
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <th>Farm Size</th>
                                                                    <td>{this.state.farmer.farmSize}</td>

                                                                    <th>Type of Farming</th>
                                                                    <td>{this.state.farmer.farmingType}</td>
                                                                </tr>

                                                                <tr>
                                                                    <th>Equipment used</th>
                                                                    <td>{this.state.farmer.farmingMethod}</td>

                                                                    <th>Planting season</th>
                                                                    <td>{this.state.farmer.season}</td>
                                                                </tr>

                                                                <tr>
                                                                    <th>Latitude</th>
                                                                    <td>{this.state.latitude}</td>

                                                                    <th>Longitude</th>
                                                                    <td>{this.state.longitude}</td>
                                                                </tr>



                                                                <tr>
                                                                    <th colSpan={4} className="text-uppercase"><span className="fa fa-snowflake mr-2"></span> Crops Information</th>
                                                                </tr>

                                                                <tr>
                                                                    <th>Main Crop</th>
                                                                    {/* <td>{this.state.farmer.mainCrop.name}</td> */}

                                                                    <th>Secondary Crops</th>
                                                                    {/* <td>{this.state.farmer.secondaryCrop.name}</td> */}
                                                                </tr>
                                                            </tbody>
                                                        </Table>
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
                                                <h4 className="text-center mt-2">Agricultural  Input</h4>
                                            </div>
                                            <hr className="my-0" />
                                            <div className="card-body mt-2 py-1">
                                                <div className="px-md-3 px-2">
                                                    <div className="px-2 text-center">




                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Col>



                            </TabPane>


                            <TabPane tabId="3">


                                <Col xl="12">
                                    <Card>
                                        <CardHeader>
                                        </CardHeader>
                                        <CardBody>

                                            <ReactDatatable
                                                extraButtons={this.extraButtons}
                                                config={this.config}
                                                records={this.state.harvestsList}
                                                columns={this.columns}
                                                loading={this.state.loading}
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>


                            </TabPane>

                        </TabContent>
                    </div>



                </Container>
            </ContentWrapper>
        );
    }
}

export default FarmerDetails;
