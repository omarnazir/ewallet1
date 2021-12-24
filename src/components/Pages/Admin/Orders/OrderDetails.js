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
import NumberFormat from 'react-number-format';
import ReactDatatable from '@ashvin27/react-datatable';
import { HarvestsService } from '../../../../services';


class OrderDetails extends Component {
    state = {
        activeTab: '1',
        farmerId: 0,
        loading: true,
        order: {
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
            registrarName: "",

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
    };
    ViewOrderList = () => {
        return this.props.history.push("/admin-manage-orders");
    };

    EditFarmer = (id) => {
        return this.props.history.push('/admin-edit-farmer/' + id, id);
    };

    componentDidMount() {

        const state = this.props.history.location;
        console.log(state);
        console.log(state);

        if (state == undefined) {
            return this.props.history.push('/admin-manage-orders/');
        }

        this.setState({ farmerId: state.orderName });
        axios.get("/farmer-input-order/order-details/2021122221")
            .then(res => {

                this.setState({ order: { ...this.state.order, id: res.data.id } });
                this.setState({ order: { ...this.state.order, firstName: res.data.firstName } });
                this.setState({ order: { ...this.state.order, middleName: res.data.middleName } });
                this.setState({ order: { ...this.state.order, surname: res.data.surname } });
                this.setState({ order: { ...this.state.order, sex: res.data.sex } });
                this.setState({ order: { ...this.state.order, idNumber: res.data.idNumber } });
                this.setState({ order: { ...this.state.order, dateOfBirth: res.data.dateOfBirth } });
                this.setState({ order: { ...this.state.order, msisdn: res.data.msisdn } });
                this.setState({ order: { ...this.state.order, mainCrop: res.data.mainCrop } });
                this.setState({ order: { ...this.state.order, secondaryCrop: res.data.secondaryCrop } });
                this.setState({ order: { ...this.state.order, ward: res.data.ward } });
                this.setState({ order: { ...this.state.order, district: res.data.ward.district } });
                this.setState({ order: { ...this.state.order, region: res.data.ward.district.region } });
                this.setState({ order: { ...this.state.order, village: res.data.village } });
                this.setState({ order: { ...this.state.order, amcos: res.data.amcos } });
                this.setState({ order: { ...this.state.order, hamlet: res.data.hamlet } });

                this.setState({ order: { ...this.state.order, farmSize: res.data.farmSize } });
                this.setState({ order: { ...this.state.order, farmingType: res.data.farmingType } });
                this.setState({ order: { ...this.state.order, farmingMethod: res.data.farmingMethod } });
                this.setState({ order: { ...this.state.order, registrationDate: res.data.registrationDate } });
                this.setState({ order: { ...this.state.order, registrarName: res.data.registrarName } });
            }).catch(err => {
                console.log(err);
            });
        // HarvestsService.getAllHarvetByFarmer(state.id).then(res => {
        //     this.setState({ loading: false })
        //     this.setState({ harvestsList: res.data })
        // })

    }

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    };

    TableActionButtonStyle = {
        color: 'white',
        background: "#33414e"
    };

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    hideToggelModal = () => {
        this.setState({
            modal: false,
        });
    };

    formatDate = (date) => {
        return Moment(date).format('lll');
    };

    ucFirst = (str) => {
        if (!str) return str;
        if (str.trim() == "undefined") return "";
        return str[0].toUpperCase() + str.slice(1);
    };


    getFarmerFullName = () => {
        const firstName = this.ucFirst(this.state.order.firstName);
        const middleName = this.state.order.middleName == undefined ? " " : this.ucFirst(this.state.order.middleName);
        const lastName = this.ucFirst(this.state.order.surname);
        return firstName + " " + middleName + " " + lastName;
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
                return (<NumberFormat value={record.weight} displayType={'text'} thousandSeparator={true} prefix={''} />);
            }
        },
        {
            key: "cropUnitPrice",
            text: "UNIT PRICE",
            cell: (record, index) => {
                return (<NumberFormat value={record.cropUnitPrice} displayType={'text'} thousandSeparator={true} prefix={''} />);
            }
        },
        {
            key: "cropsValue",
            text: "CROP VALUE",
            cell: (record, index) => {
                return (<NumberFormat value={record.cropsValue} displayType={'text'} thousandSeparator={true} prefix={''} />);
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
                return (this.formatDate(record.date));
            }
        }

    ];


    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Order Details : {this.getFarmerFullName()}
                        <small>Showing all order details.</small>
                    </div>
                    <div className="flex-row d-block d-md-flex">
                        <span className="btn badge-success mr-2 px-4" onClick={() => this.EditFarmer(this.state.orderId)}>Approve</span>
                        <span className="btn bg-danger-dark mr-2 px-4" onClick={() => this.DeleteRole(record.id)}>Reject </span>

                        <Button onClick={this.ViewOrderList} style={this.AddActionButtonStyle} className="btn-pill-right">Go Back</Button>
                    </div>
                </div>
                <Container fluid>
                    <div role="tabpanel card card-body">
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
                                                            <th colSpan={4} className="text-uppercase">  <span className="fa fa-user mr-2"></span>Farmer's Information</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Full Name</th>
                                                            {/* <td>{this.state.firstName + " " + this.state.surname}</td> */}
                                                            <td>{this.getFarmerFullName()}</td>

                                                            <th>Sex</th>
                                                            <td>{this.state.order.sex}</td>
                                                        </tr>

                                                        <tr>

                                                            <th>Date of Birth (Age)</th>
                                                            <td>{this.state.order.dateOfBirth}</td>


                                                            <th>Age (Years)</th>
                                                            <td>{calculateAge(this.state.order.dateOfBirth)}</td>
                                                        </tr>

                                                        <tr>
                                                            <th>Phone</th>
                                                            <td>{this.state.order.msisdn}</td>
                                                        </tr>

                                                        <tr>
                                                            <th colSpan={4} className="text-uppercase"><span className="fa fa-id-card mr-2"></span> Membership Information</th>
                                                        </tr>

                                                        <tr>
                                                            <th>MemberID</th>
                                                            <td>{this.state.order.memberID}</td>

                                                            <th>AMCOS</th>
                                                            <td>{this.state.order.amcos.name}</td>
                                                        </tr>

                                                        <tr>
                                                            <th>Hamlet (Kitongoji)</th>
                                                            <td>{this.state.order.hamlet}</td>

                                                            <th></th>
                                                            <td></td>
                                                        </tr>

                                                        <tr>
                                                            <th colSpan={4} className="text-uppercase"><span className="fa fa-leaf mr-2"></span> Farm Information</th>
                                                        </tr>

                                                        <tr>
                                                            <th>Location</th>
                                                            <td colSpan={3}>
                                                                {this.state.order.region.name}{", "}
                                                                {this.state.order.district.name}{", "}
                                                                {this.state.order.ward.name}{", "}
                                                                {this.state.order.village.name}
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <th>Farm Size</th>
                                                            <td>{this.state.order.farmSize}</td>

                                                            <th>Type of Farming</th>
                                                            <td>{this.state.order.farmingType}</td>
                                                        </tr>

                                                        <tr>
                                                            <th>Equipment used</th>
                                                            <td>{this.state.order.farmingMethod}</td>

                                                            <th>Planting season</th>
                                                            <td>{this.state.order.season}</td>
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
                                                            <td>{this.state.order.mainCrop.name}</td>

                                                            <th>Secondary Crops</th>
                                                            <td>{this.state.order.secondaryCrop.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan={4} className="text-uppercase"><span className="fa fa-user mr-2"></span> Registrar Information</th>
                                                        </tr>

                                                        <tr>
                                                            <th colSpan={2}>Full Name</th>
                                                            <td colSpan={2}>{this.state.order.registrarName}</td>


                                                        </tr>
                                                        {/* <tr>
                                                                    <th colSpan={2}>Role </th>
                                                                    <td colSpan={2}>{this.state.order.secondaryCrop.name}</td>
                                                                </tr> */}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Col>
                    </div>
                </Container>
            </ContentWrapper>
        );
    }
}

export default OrderDetails;
