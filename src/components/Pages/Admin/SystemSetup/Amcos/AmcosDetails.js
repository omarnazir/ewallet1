import React, { Component, Fragment } from "react";
import ContentWrapper from "../../../../Layout/ContentWrapper";
import Moment from "moment";
import axios from "../../../../../services/axios";
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
import { CropsService, CropsTypeService } from "../../../../../services";
import { SuccessAlert, DeleteAlert } from "../../../../Common/AppAlerts";

class AmcosDetails extends Component {
    state = {
        activeTab: '1',
        amcosId: 0,
        amcos: {
            id: 0,
            name: "",
            registrarId: {},
            mcos: {},
            village: {},
            ward: {},
            district: {},
            region: {}
        },
        loading: true,
        cropsList: [],
        crops: [],
        pembejeoList:[],
        cropId:0,
    };

    initialState = {
        crop: {
            name: "",
            cropType: 0
        }
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    AddAmcosCropMode = () => {
        this.setState({ mode: true })
        this.toggleModal();
    }

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    getAllCropsByAmcos(id) {
        axios.get("/amcos-crops/" + id + "/crops").then(res => {
            this.setState({ loading: false })
            console.log("Amcos Crops" +res.data)
            this.setState({ cropsList: res.data })

        })
    }

    getAllPembejeoByAmcos(id){
        axios.get("/amcos-pembejeo/" + id + "/pembejeo").then(res => {
            this.setState({ loading: false })
            console.log("Pembejeo Crops" +res.data)
            this.setState({ pembejeoList: res.data })

        })
    }

    getAllCrops() {
        CropsService.getAllCrops().then(res => {
            const crops = res.data;
            this.setState({ crops })
        })
    }

    ViewAmcosList = () => {
        return this.props.history.push("/admin-manage-amcos")
    }

    AlertDeleteItem(id) {
        DeleteAlert().then((willDelete) => {
            console.log(willDelete)
            if (willDelete) {
                this.DeleteAmcos(id);
            }
        })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    DeleteAmcos(id) {
        axios.delete("/amcos/" + id)
            .then(res => {

                console.log(res)
                this.ViewAmcosList()

                SuccessAlert("Deleted Amcos Successfully")
            }).catch(err => {
                SuccessAlert("Please delete Amcos references first ", "info")
            })
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

        this.setState({ amcosId: state.id })
        axios.get("/amcos/" + state.id)
            .then(res => {
                this.setState({ amcos: { ...this.state.amcos, id: res.data.id } })
                this.setState({ amcos: { ...this.state.amcos, name: res.data.name } })
                this.setState({ amcos: { ...this.state.amcos, registrarId: res.data.registrarId } })
                this.setState({ amcos: { ...this.state.amcos, mcos: res.data.mcos } })
                this.setState({ amcos: { ...this.state.amcos, village: res.data.village } })

                this.setState({ amcos: { ...this.state.amcos, ward: res.data.village.ward } })
                this.setState({ amcos: { ...this.state.amcos, district: res.data.village.ward.district } })
                this.setState({ amcos: { ...this.state.amcos, region: res.data.village.ward.district.region } })
            })
        this.getAllCropsByAmcos(state.id);
        this.getAllPembejeoByAmcos(state.id)
        this.getAllCrops();

    }
    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }
    formatDate = (date) => {
        return Moment(date).format('lll')
    }

    EditAmcos = (id) => {
        return this.props.history.push('/admin-edit-amcos/' + id, id)
    }

    handleSubmit = event => {
        event.preventDefault();
        this.toggleModal();

        const data= {
            cropId: this.state.cropId,
            amcosId: Number(this.state.amcosId)
          }
          axios.post("/amcos-crops",data).then(res => {
            SuccessAlert("Added Amcos Crop Successfully");
            this.getAllCropsByAmcos(this.state.amcosId)
          })
        
    }


    AlertDeleteItemCrop(id){
        DeleteAlert().then((willDelete)=>{
          if(willDelete){
            this.DeleteAmcosCrop(id);
            SuccessAlert("Deleted Amcos Crop Successfully")
          }
        })
      }

    DeleteAmcosCrop(id) {  
        axios.delete("/amcos-crops/" + id)
          .then(res => {
            const response = res.data;
            const cropsList = this.state.cropsList.filter((item) => {
              return item.id !== id;
            });
            this.setState({ cropsList })

          })
      }

    columns = [
        {
            key: "id",
            text: "ID",
            cell: (record, index) => {
                return index + 1;
            }
        },
        {
            key: "name",
            text: "NAME",
            cell: (record, index) => {
                return record.crop.name;
            }
        },
        {
            key: "type",
            text: "TYPE",
            cell: (record, index) => {
                if (record.crop != null) {
                    return record.crop.cropType.name;
                }
                return "";
            }
        },
        {
            key: "id",
            text: "ACTION",
            cell: (record, index) => {
                return (
                    <Fragment>
                        <span className="btn bg-danger-dark  px-4" onClick={() => this.AlertDeleteItemCrop(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
                    </Fragment>
                )
            }
        }
    ]

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

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Amcos Details : {this.state.amcos.name}
                        <small>Showing all amcos details.</small>
                    </div>
                    <div className="flex-row d-block d-md-flex">
                        {this.state.activeTab == '1' && <div>
                            <span className="btn badge-success mr-2 px-4" onClick={() => this.EditAmcos(this.state.amcosId)}> <i className="icon-pencil mr-2"  ></i>Edit Amcos</span>
                            <span className="btn bg-danger-dark mr-2 px-4" onClick={() => this.AlertDeleteItem(this.state.amcosId)}> <i className="fa fa-trash mr-2"></i>Delete Amcos </span>
                        </div>
                        }

                        {this.state.activeTab == '2' && <div>
                            <span className="btn mr-2 px-4" style={this.AddActionButtonStyle} onClick={() => this.AddAmcosCropMode()}> <i className="fa fa-plus mr-2"  ></i>Add Crop</span>

                        </div>
                        }

                        {this.state.activeTab == '3' && <div>
                            <span className="btn mr-2 px-4" style={this.AddActionButtonStyle} onClick={() => this.AddAmcosCropMode()}> <i className="fa fa-plus mr-2"  ></i>Add Pembejeo</span>

                        </div>
                        }
                        <Button onClick={this.ViewAmcosList} style={this.AddActionButtonStyle} className="btn-pill-right">View All Amcos</Button>

                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add Crop" : "Edit Crop"}</ModalHeader>
                            <form onSubmit={this.handleSubmit}>
                                <ModalBody>

                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect1">Crop : </label>
                                        <select className="form-control" id="exampleFormControlSelect1" name="cropId"
                                            onChange={this.handleChange}
                                            value={this.state.cropId}
                                        >
                                            <option value="0">Select type</option>
                                            {this.state.crops.map(row => (
                                                <option key={row.id} value={row.id} >
                                                    {row.name}
                                                </option>
                                            ))}

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

                    </div>
                </div>
                <Container fluid>
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
                                    <div className="card card-default">
                                        <div className="card-body mt-2 mb-2">

                                            <Table className="table table-bordered">

                                                <tbody>
                                                    <tr>
                                                        <th colSpan={4} className="text-uppercase">  <span className="fa fa-users mr-2"></span> Amcos Information</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Name</th>
                                                        <td>{this.state.amcos.name}</td>


                                                    </tr>
                                                    <tr>
                                                        <th>MCU</th>
                                                        <td>{this.state.amcos.mcos.name}</td>
                                                    </tr>

                                                    <tr>

                                                        <th>Registrar Name</th>
                                                        <td>{this.state.amcos.registrarId.name}</td>
                                                    </tr>

                                                    <tr>

                                                        <th>Registrar Msisdn</th>
                                                        <td>{this.state.amcos.registrarId.msisdn}</td>
                                                    </tr>



                                                    <tr>
                                                        <th colSpan={4} className="text-uppercase"><span className="fa fa-map-marker-alt mr-2"></span> AMCOS LOCATION</th>
                                                    </tr>

                                                    <tr>
                                                        <th>Region </th>
                                                        <td>{this.state.amcos.region.name}</td>


                                                    </tr>
                                                    <tr>
                                                        <th>District</th>
                                                        <td>{this.state.amcos.district.name}</td>
                                                    </tr>

                                                    <tr>
                                                        <th>Ward </th>
                                                        <td>{this.state.amcos.ward.name}</td>
                                                    </tr>
                                                    <tr>


                                                        <th>Village</th>
                                                        <td>{this.state.amcos.village.name}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </Col>


                            </TabPane>
                            <TabPane tabId="2">

                                <Col xl="12">
                                    <Card>
                                        <CardBody>
                                            <ReactDatatable
                                                extraButtons={this.extraButtons}
                                                config={this.config}
                                                records={this.state.cropsList}
                                                columns={this.columns}
                                                loading={this.state.loading}
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </TabPane>


                            <TabPane tabId="3">

                            <Col xl="12">
                                    <Card>
                                        <CardBody>
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
                    </div>



                </Container>
            </ContentWrapper>
        );
    }
}

export default AmcosDetails;
