import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Moment from "moment";
import axios from "../../../../services/axios";
import {
    Container, Button, TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Col,
    Table,
    Card, CardHeader, CardBody,
} from "reactstrap";
import classnames from 'classnames';
import { calculateAge } from '../../../../utils/AgeCalculator';
import NumberFormat from 'react-number-format'
import ReactDatatable from '@ashvin27/react-datatable';
import { HarvestsService } from '../../../../services';


class FarmerDetails extends Component {
    state = {
        activeTab: '1',
        farmerId: 0,
        loading: true,
        farmer: {
            id: 0,
            firstName: "",
            middleName: "",
            surname: "",
            sex: "",
            idNumber: "",
            dateOfBirth: "",
            msisdn: "",
            mainCrop: {},
            secondaryCrop: {},
            ward: {},
            village: {},
            amcos: {},
            farmSize: 0,
            farmingType: "",
            farmingMethod: "",
            registrationDate: Date.now(),
            hamlet: "",
            registrarName:"",

            district: {},
            region: {}
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

    EditFarmer = (id) => {
        return this.props.history.push('/admin-edit-farmer/' + id, id)
    }

    componentDidMount() {

        const { state } = this.props.history.location;
        if (state == undefined) {
            return this.props.history.push('/admin-farmers-list/')
        }

        this.setState({ farmerId: state.id })
        axios.get("/farmers/" + state.id)
            .then(res => {

                this.setState({ farmer: { ...this.state.farmer, id: res.data.id } })
                this.setState({ farmer: { ...this.state.farmer, firstName: res.data.firstName } })
                this.setState({ farmer: { ...this.state.farmer, middleName: res.data.middleName } })
                this.setState({ farmer: { ...this.state.farmer, surname: res.data.surname } })
                this.setState({ farmer: { ...this.state.farmer, sex: res.data.sex } })
                this.setState({ farmer: { ...this.state.farmer, idNumber: res.data.idNumber } })
                this.setState({ farmer: { ...this.state.farmer, dateOfBirth: res.data.dateOfBirth } })
                this.setState({ farmer: { ...this.state.farmer, msisdn: res.data.msisdn } })
                this.setState({ farmer: { ...this.state.farmer, mainCrop: res.data.mainCrop } })
                this.setState({ farmer: { ...this.state.farmer, secondaryCrop: res.data.secondaryCrop } })
                this.setState({ farmer: { ...this.state.farmer, ward: res.data.ward } })
                this.setState({ farmer: { ...this.state.farmer, district: res.data.ward.district } })
                this.setState({ farmer: { ...this.state.farmer, region: res.data.ward.district.region } })
                this.setState({ farmer: { ...this.state.farmer, village: res.data.village } })
                this.setState({ farmer: { ...this.state.farmer, amcos: res.data.amcos } })
                this.setState({ farmer: { ...this.state.farmer, hamlet: res.data.hamlet } })

                this.setState({ farmer: { ...this.state.farmer, farmSize: res.data.farmSize } })
                this.setState({ farmer: { ...this.state.farmer, farmingType: res.data.farmingType } })
                this.setState({ farmer: { ...this.state.farmer, farmingMethod: res.data.farmingMethod } })
                this.setState({ farmer: { ...this.state.farmer, registrationDate: res.data.registrationDate } })
                this.setState({farmer:{...this.state.farmer,registrarName:res.data.registrarName}})
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
                        <span className="btn badge-success mr-2 px-4" onClick={() => this.EditFarmer(this.state.farmerId)}> <i className="icon-pencil mr-2"  ></i>Edit Farmer</span>
                        <span className="btn bg-danger-dark mr-2 px-4" onClick={() => this.DeleteRole(record.id)}> <i className="fa fa-trash mr-2"></i>Delete Farmer </span>

                        <Button onClick={this.ViewFarmersList} style={this.AddActionButtonStyle} className="btn-pill-right">View All Farmers</Button>
                    </div>
                </div>
                <Container fluid>
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
                                    <span className="fa fa-snowflake mr-2"></span>
                                    Farmer Harvests
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggleTab('3'); }}>
                                    <span className="fa fa-leaf mr-2"></span>
                                    Agricultural Inputs
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '4' })}
                                    onClick={() => { this.toggleTab('4'); }}>
                                    <span className="icon-briefcase mr-2"></span>
                                    Transactions
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

                                                                    <th>AMCOS</th>
                                                                    <td>{this.state.farmer.amcos.name}</td>
                                                                </tr>

                                                                <tr>
                                                                    <th>Hamlet (Kitongoji)</th>
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
                                                                        {this.state.farmer.region.name}{", "}
                                                                        {this.state.farmer.district.name}{", "}
                                                                        {this.state.farmer.ward.name}{", "}
                                                                        {this.state.farmer.village.name}
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
                                                                    <td>{this.state.farmer.mainCrop.name}</td>

                                                                    <th>Secondary Crops</th>
                                                                    <td>{this.state.farmer.secondaryCrop.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th colSpan={4} className="text-uppercase"><span className="fa fa-user mr-2"></span> Registrar Information</th>
                                                                </tr>

                                                                <tr>
                                                                    <th colSpan={2}>Full Name</th>
                                                                    <td colSpan={2}>{this.state.farmer.registrarName}</td>


                                                                </tr>
                                                                {/* <tr>
                                                                    <th colSpan={2}>Role </th>
                                                                    <td colSpan={2}>{this.state.farmer.secondaryCrop.name}</td>
                                                                </tr> */}
                                                            </tbody>
                                                        </Table>
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
                            <TabPane tabId="2">
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

                            <TabPane tabId="4">

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
