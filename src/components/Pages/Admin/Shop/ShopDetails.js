import React, { Component, Fragment } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Moment from "moment";
import {
    Container, Button, TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Col,
    Table,
    Card, CardHeader, CardBody,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter
} from "reactstrap";
import classnames from 'classnames';
import ReactDatatable from '@ashvin27/react-datatable';
import { SuccessAlert, DeleteAlert } from "../../../Common/AppAlerts";
import axios from "../../../../services/axios";
import { data } from "jquery";

class ManageShopDetails extends Component {
    state = {
        activeTab: '1',
        amcosId: 0,
        pembejeo: {
            name: "",
            type: "",
            price: ""
        },
        editedShop: {
            id: 0,
            name: "",
            msisdn: "",
            amcos: []
        },
        loading: true,
        shopList: [],
        shops: [],
        shopOrProvider: 0,
        shopDetails: [],
        pembejeoList: {}
    };

    // initialState = {
    //     shop: {
    //         name: "",
    //         cropType: 0
    //     }
    // };




    componentDidMount() {

        const state = this.props.history.location;
        if (state == undefined) {
            return this.props.history.push('/admin-manage-shops');
        }

        console.log(state.pathname.substring(20));

        this.setState({ shopOrProvider: +state.pathname.substring(20) });
        this.getAllPembejeoByShop(+state.pathname.substring(20));
        this.getShopDetails(+state.pathname.substring(20));
    }


    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    AddAgriInputMode = () => {
        this.setState({ mode: true });
        this.toggleModal();
    };

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };

    getAllshopsByAmcos(id) {
        axios.get("/amcos-shops/" + id + "/shops").then(res => {
            this.setState({ loading: false });
            console.log("Amcos shops" + res.data);
            this.setState({ shopsList: res.data });

        });
    }

    getAllPembejeoByShop(id) {
        axios.get("/pembejeo/shop/" + id).then(res => {
            this.setState({ loading: false });
            console.log(res.data[0]);
            this.setState({ pembejeoList: res.data });

            console.log(this.state.pembejeoList);
        });
    }

    getShopDetails(id) {
        axios.get("shop-or-provider/shop/" + id).then(res => {
            console.log(res.data)
            this.setState({ shopDetails: res.data });
        });
    }

    ViewAmcosList = () => {
        return this.props.history.push("/admin-manage-amcos");
    };

    AlertDeleteItem(id) {
        DeleteAlert().then((willDelete) => {
            console.log(willDelete);
            if (willDelete) {
                this.DeleteAmcos(id);
            }
        });
    }

    handleChange = event => {
        // this.setState({ [event.target.name]: event.target.value });
        this.setState({
            pembejeo: Object.assign({},
                this.state.pembejeo, { [event.target.name]: event.target.value })
        });
    };

    DeleteShop(id) {
        axios.delete("/amcos/" + id)
            .then(res => {

                console.log(res);
                this.ViewAmcosList();

                SuccessAlert("Deleted shop Successfully");
            }).catch(err => {
                SuccessAlert("Please delete shop references first ", "info");
            });
    }

    handleClickActiveTab = event => {
        const newActiveTab = event.target.tab;
        this.setState({
            activeTab: newActiveTab,
        });
    };


    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    };
    formatDate = (date) => {
        return Moment(date).format('lll');
    };

    EditShop = (id) => {
        return this.props.history.push('/admin-edit-amcos/' + id, id);
    };

    handleSubmit = event => {
        event.preventDefault();
        this.toggleModal();

        // const data = {
        //     cropId: this.state.cropId,
        //     amcosId: Number(this.state.shopId)
        // };
        // axios.post("/amcos-shops", data).then(res => {
        //     SuccessAlert("Added Amcos Crop Successfully");
        //     this.getAllshopsByAmcos(this.state.shopId);
        // });

    };

    AddPembejeo = () => {
        let data = {
            ...this.state.pembejeo,
            shopOrProviderId: this.state.shopOrProvider
        };
        axios.post("/pembejeo", data).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    };


    AlertDeletePembejeo(id) {
        DeleteAlert().then((willDelete) => {
            if (willDelete) {
                this.DeletePembejeo(id);
                SuccessAlert("Deleted Amcos Crop Successfully");
            }
        });
    }

    DeletePembejeo(id) {
        axios.delete("farmer-inputs/delete", {id: id})
            .then(res => {
                const pembejeoList = this.state.pembejeoList.filter((item) => {
                    return item.id !== id;
                });
                this.setState({ pembejeoList });
            });
    }

    columns = [
        {
            key: "id",
            text: "ID",
            cell: (record, index) => {
                console.log(record);
                return index + 1;
            }
        },
        {
            key: "name",
            text: "NAME",
        },
        {
            key: "price",
            text: "PRICE",
        },
        {
            key: "type",
            text: "TYPE",
        },
        // {
        //     key: "id",
        //     text: "ACTION",
        //     cell: (record, index) => {
        //         return (
        //             <Fragment>
        //                 <span className="btn bg-danger-dark  px-4" onClick={() => this.AlertDeletePembejeo(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
        //             </Fragment>
        //         );
        //     }
        // }
    ];

    config = {
        page_size: 10,
        length_menu: [10, 25, 50],
        show_filter: true,
        show_pagination: true,
        pagination: 'advance',
        filename: "Orodha ya pembejeo",
        button: {

        },
        language: {
            loading_text: "Please be patient while data loads..."
        }
    };

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Shop Details : {this.state.pembejeo.name}
                        <small>Showing all shop details.</small>
                    </div>
                    <div className="flex-row d-block d-md-flex">
                        {this.state.activeTab == '1' && <div>
                            {/* <span className="btn badge-success mr-2 px-4" onClick={() => this.EditShop(this.state.shopId)}> <i className="icon-pencil mr-2"  ></i>Edit Shop</span> */}
                            {/* <span className="btn bg-danger-dark mr-2 px-4" onClick={() => this.AlertDeleteItem(this.state.shopId)}> <i className="fa fa-trash mr-2"></i>Delete Shop </span> */}
                        </div>
                        }

                        {this.state.activeTab == '2' && <div>
                            <span className="btn mr-2 px-4" style={this.AddActionButtonStyle} onClick={() => this.AddAgriInputMode()}> <i className="fa fa-plus mr-2"  ></i>Ongeza Pembejeo</span>
                        </div>
                        }


                        <Button onClick={this.ViewShopsList} style={this.AddActionButtonStyle} className="btn-pill-right">View All Shops</Button>

                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add Agricultural Input" : "Edit Agricultural Input"}</ModalHeader>
                            <form onSubmit={this.handleSubmit}>
                                <ModalBody>
                                    <div className="form-group" >
                                        <label>Name :</label>
                                        <input className="form-control" name="name"
                                            // value={ this.state.pembejeo.name }
                                            onChange={this.handleChange} type="text" value={this.state.pembejeo.name} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect1">Type : </label>
                                        <select className="form-control" id="exampleFormControlSelect1" name="type"
                                            onChange={this.handleChange}
                                            value={this.state.mode ? this.state.pembejeo.name : this.state.editedShop.name}
                                        >
                                            <option value="-1">Select type</option>
                                            <option value="Service">Service</option>
                                            <option value="Product">Product</option>
                                        </select>
                                    </div>
                                    <FormGroup>
                                        <label>Price :</label>
                                        <input className="form-control" name="price"
                                            value={this.state.mode ? this.state.pembejeo.price : this.state.editedShop.name}
                                            onChange={this.handleChange} type="tel" required />
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <button onClick={this.AddPembejeo} className="btn btn-sm btn-success mr-3 px-5" type="submit">
                                        Save
                                    </button>
                                </ModalFooter>
                            </form>
                        </Modal>
                    </div>
                </div>
                <Container fluid>
                    <div role="tabpanel card card-body">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggleTab('1'); }}>
                                    <span className="fa fa-person-booth mr-2"></span>
                                    Shop Details
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggleTab('2'); }}>
                                    <span className="fa fa-leaf mr-2"></span>
                                    Pembejeo
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </Container>



                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Col xl="12">
                            <Card>
                                <CardBody>
                                    <table>
                                        <tr>
                                            <th>Shop Name</th> : {this.state.shopDetails.name}<td></td>
                                        </tr>
                                        <tr>
                                            <th>Phone Number</th> : {this.state.shopDetails.msisdn}<td></td>
                                        </tr>
                                        <tr>
                                            <th>AMCOS</th> : <td></td>
                                        </tr>
                                    </table>
                                </CardBody>
                            </Card>
                        </Col>
                    </TabPane>

                    <TabPane tabId="2">
                        <Col xl="12">
                            <Card>
                                <CardBody>
                                    <td></td>
                                    <ReactDatatable
                                        extraButtons={this.extraButtons}
                                        config={this.config}
                                        records={this.state.pembejeoList}
                                        columns={this.columns}
                                        loading={this.state.loading}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </TabPane>
                </TabContent>
            </ContentWrapper>
        );
    }
}

export default ManageShopDetails;
