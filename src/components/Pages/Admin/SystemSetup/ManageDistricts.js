import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import {
    Container, Card, CardHeader, CardBody, CardTitle, Button, Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter
} from "reactstrap";
import ReactDatatable from '@ashvin27/react-datatable';
import { Fragment } from "react";

class ManageDistricts extends Component {
    state = {
        districtsList: [],
        regionsList: [],
        modal: false,
        mode: true,
        loading: true,
        editedDistrict: {
            id: 0,
            name: "",
            regionId: 0
        },
        district: {
            name: "",
            regionId: 0
        }
    };

    initialState = {
        district: {
            name: "",
            regionId: 0
        }
    }


    componentDidMount() {
        this.getAllDistricts();
        this.getAllRegions();
    }

    getAllDistricts() {
        axios.get("/districts")
            .then(res => {
                const districtsList = res.data;
                this.setState({ loading: false })
                this.setState({ districtsList })

            })
    }

    getAllRegions() {
        axios.get("/regions")
            .then(res => {
                this.setState({ regionsList: res.data })

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
            key: "region",
            text: "REGION",
            cell: (record, index) => {
                return (record.region.name);
            }
        },
        {
            key: "name",
            text: "DISTRICT"
        },
        {
            key: "id",
            text: "ACTION",
            cell: (record, index) => {
                return (
                    <Fragment>
                        <span className="btn badge-success mr-2 px-4" onClick={() => this.EditDistrict(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
                        <span className="btn bg-danger-dark  px-4" onClick={() => this.DeleteDistrict(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
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

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    AddWordMode = () => {
        this.setState({ mode: true })
        this.toggleModal();
    }
    handleChange = event => {
        if (this.state.mode) {
            this.setState({
                district: Object.assign({},
                    this.state.district, { [event.target.name]: event.target.value })
            })
        } else {
            this.setState({
                editedDistrict: Object.assign({}, this.state.editedDistrict,
                    { [event.target.name]: event.target.value })
            })
        }
    }

    EditDistrict(row) {
        console.log(row)

        const editedDistrict = {
            id: row.id,
            name: row.name,
            regionId: row.region.id
        }
        this.setState({ editedDistrict })
        this.setState({ mode: false })
        this.toggleModal();
    }

    DeleteDistrict(id) {
        axios.delete("/districts/" + id)
            .then(res => {
                const response = res.data;
                const districtsList = this.state.districtsList.filter((item) => {
                    return item.id !== id;
                });
                this.setState({ districtsList })
            })
    }


    handleSubmit = event => {
        event.preventDefault();
        this.toggleModal();
        if (this.state.mode) {
            console.log("Add mode")
            axios.post("/districts", this.state.district).then(res => {
                console.log(res.data);
                this.getAllDistricts();
                this.setState({ region: this.initialState.region })
            })
        } else {
            console.log("Edit mode")
            axios.put("/districts", this.state.editedDistrict).then(res => {
                console.log(res.data);
                this.getAllDistricts();

            })
        }
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Districts
                        <small>Manage districts.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.AddWordMode} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
                            <i className="fa fa-plus mr-2"></i>
                            Add District</Button>

                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add New Region" : "Edit Region"}</ModalHeader>
                            <form onSubmit={this.handleSubmit}>
                                <ModalBody>
                                    <FormGroup>
                                        <label>District Name :</label>
                                        <input className="form-control" name="name"
                                            value={this.state.mode ? this.state.district.name : this.state.editedDistrict.name}
                                            onChange={this.handleChange} type="text" required></input>
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="exampleFormControlSelect1">Region : </label>
                                        <select className="form-control" id="exampleFormControlSelect1" name="regionId"
                                            onChange={this.handleChange}
                                            value={this.state.mode ? this.state.district.regionId : this.state.editedDistrict.regionId}
                                        >
                                            <option value="0">Select type</option>
                                            {this.state.regionsList.map(row => (
                                                <option key={row.id} value={row.id} >
                                                    {row.name}
                                                </option>
                                            ))}

                                        </select>
                                    </FormGroup>
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
                    <Card>
                        <CardHeader>
                        </CardHeader>
                        <CardBody>
                            <ReactDatatable
                                extraButtons={this.extraButtons}
                                config={this.config}
                                records={this.state.districtsList}
                                columns={this.columns}
                                loading={this.state.loading}
                            />
                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
        );
    }
}

export default ManageDistricts;
