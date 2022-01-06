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
import { SuccessAlert, DeleteAlert } from "../../../Common/AppAlerts";


class OrderDetails extends Component {
    state = {
        activeTab: '1',
        farmerId: 0,
        loading: true,
        order: {
            id: 0,
            firstname: "",
            lastname: "",
            shop: "",
            quantity: "",
            orderNumber: "",
            description: "",
            unitPrice: "",
            unitPrice: 0,
            farmingType: "",
            farmingMethod: "",
            input: "",
            district: "",
            region: "",
            amcos: "",
            idNumber: "",
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
        let on = state.pathname.substring(20);

        if (state == undefined) {
            return this.props.history.push('/admin-manage-orders');
        }

        this.setState({ farmerId: state.orderName });

        this.GetOrderDetails(on);

        // HarvestsService.getAllHarvetByFarmer(state.id).then(res => {
        //     this.setState({ loading: false })
        //     this.setState({ harvestsList: res.data })
        // })

    }

    GetOrderDetails = (order) => {
        axios.get("/farmer-input-order/order-details/" + order)
            .then(res => {
                res.data.map(orders => {
                    console.log(orders);
                    this.setState({ order: { ...this.state.order, id: orders.id } });
                    this.setState({ order: { ...this.state.order, quantity: orders.quantity } });
                    this.setState({ order: { ...this.state.order, description: orders.description } });
                    this.setState({ order: { ...this.state.order, status: orders.status } });
                    this.setState({ order: { ...this.state.order, shop: orders.input.shopOrProvider.name } });
                    this.setState({ order: { ...this.state.order, unitPrice: orders.input.price } });
                    this.setState({ order: { ...this.state.order, firstname: orders.farmerInputOrder.farmer.firstName } });
                    this.setState({ order: { ...this.state.order, middlename: orders.farmerInputOrder.farmer.middleName } });
                    this.setState({ order: { ...this.state.order, orderNumber: orders.farmerInputOrder.orderNumber } });
                    this.setState({ order: { ...this.state.order, lastname: orders.farmerInputOrder.farmer.surname } });
                    this.setState({ order: { ...this.state.order, msisdn: orders.farmerInputOrder.farmer.msisdn } });
                    this.setState({ order: { ...this.state.order, region: orders.farmerInputOrder.regionName } });
                    // this.setState({ order: { ...this.state.order, district: orders.farmerInputOrder.district.name } });
                    this.setState({ order: { ...this.state.order, ward: orders.ward } });
                    this.setState({ order: { ...this.state.order, amcos: orders.farmerInputOrder.farmer.amcos.name } });
                    this.setState({ order: { ...this.state.order, input: orders.input.name } });
                    this.setState({ order: { ...this.state.order, idNumber: orders.farmerInputOrder.idNumber } });
                });
                

            }).catch(err => {
                console.log(err);
            });
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
        const firstName = this.ucFirst(this.state.order.firstname);
        const middleName = this.state.order.middlename == undefined ? " " : this.ucFirst(this.state.order.middlename);
        const lastName = this.ucFirst(this.state.order.lastname);
        return firstName + " " + middleName + " " + lastName;
    };


    ApproveOrder = (id) => {
        let body = {
            id: String(id)
        };
        axios.put("/farmer-input-order/approve", body).then(res => {
            // alert(res.data.message)
            SuccessAlert(res.data.message, "info");
            this.GetOrderDetails(this.state.order.orderNumber)
        });
    };

    DeclineOrder = (id) => {
        let body = {
            id: String(id)
        };
        axios.put("/farmer-input-order/decline", body).then(res => {
            console.log(res.data);
            this.GetOrderDetails(this.state.order.orderNumber)
        });
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
                        Order Details : {this.state.order.status}
                        <small>Showing all order details.</small>
                    </div>
                    <div className="flex-row d-block d-md-flex">
                        {
                            this.state.order.status == "NOT_APPROVED" ? <span className="btn badge-success mr-2 px-4" onClick={() => this.ApproveOrder(this.state.order.id)}>Approve</span>  : ""
                            
                        }{
                            this.state.order.status == "NOT_APPROVED" ? 
                            <span className="btn bg-danger-dark mr-2 px-4" onClick={() => this.DeclineOrder(this.state.order.id)}>Decline</span>  :""
                        }

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

                                                            <th>Address</th>
                                                            <td>{ }</td>
                                                        </tr>

                                                        <tr>

                                                            <th>ID Number</th>
                                                            <td>{this.state.order.idNumber}</td>


                                                            <th>AMCOS</th>
                                                            <td>{this.state.order.amcos}</td>
                                                        </tr>

                                                        <tr>
                                                            <th>Phone</th>
                                                            <td>{this.state.order.msisdn}</td>
                                                        </tr>

                                                        <tr>
                                                            <th colSpan={4} className="text-uppercase"><span className="fa fa-id-card mr-2"></span> Order Information</th>
                                                        </tr>

                                                        <tr>
                                                            <th>Order Number</th>
                                                            <td>{this.state.order.orderNumber}</td>

                                                            <th>Inputs</th>
                                                            <td>{this.state.order.input}</td>

                                                            <th>Quantity</th>
                                                            <td>{this.state.order.quantity}</td>
                                                        </tr>

                                                        <tr>
                                                            <th>Unit Price</th>
                                                            <td>{this.state.order.unitPrice}</td>

                                                            <th>Shop</th>
                                                            <td>{this.state.order.shop}</td>
                                                        </tr>


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
