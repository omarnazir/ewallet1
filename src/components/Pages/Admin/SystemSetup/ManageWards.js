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

class ManageWards extends Component {
    state = {
        wardsList:[],
        regionsList: [],
        districtsList: [],
        regionId: 0,
        districtId:0,
        wardId:0,
        modal: false,
        mode: true,
        loading: true,
        editedWard: {
            name: "",
            districtId: 0
        },
        ward: {
            name: "",
            districtId: 0
        }
    };

    initialState = {
        ward: {
            name: "",
            districtId: 0
        }

    }


    componentDidMount() {
        this.getAllReservedWords();
        this.getAllRegions();
        this.getAllDistricts();
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

    getAllReservedWords() {
        axios.get("/wards")
            .then(res => {
                const wardsList = res.data;
                this.setState({ loading: false })
                this.setState({ wardsList })

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
            key: "district",
            text: "REGION",
            cell: (record, index) => {
                return (record.district.region.name);
            }
        },
        {
            key: "district",
            text: "DISTRICT",
            cell: (record, index) => {
                return (record.district.name);
            }
        },
        {
            key: "name",
            text: "WARD"
        },
        {
            key: "id",
            text: "ACTION",
            cell: (record, index) => {
                return (
                    <Fragment>
                        <span className="btn badge-success mr-2 px-4" onClick={() => this.EditRegion(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
                        <span className="btn bg-danger-dark  px-4" onClick={() => this.DeleteRegion(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
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
                region: Object.assign({},
                    this.state.region, { [event.target.name]: event.target.value })
            })
        } else {
            this.setState({
                editedRegion: Object.assign({}, this.state.editedRegion,
                    { [event.target.name]: event.target.value })
            })
        }
    }

    EditRegion(row) {
        console.log(row)
        const editedRestricted = {
            id: row.id,
            word: row.word
        }

        this.setState({ editedRestricted })
        this.setState({ mode: false })
        this.toggleModal();
    }

    DeleteRegion(id) {
        axios.delete("/reserved-words/" + id)
            .then(res => {
                const response = res.data;
                const regionsList = this.state.regionsList.filter((item) => {
                    return item.id !== id;
                });
                this.setState({ regionsList })
            })
    }


    handleSubmit = event => {
        event.preventDefault();
        this.toggleModal();
        if (this.state.mode) {
            console.log("Add mode")
            axios.post("/regions", this.state.region).then(res => {
                console.log(res.data);
                this.getAllReservedWords();
                this.setState({ region: this.initialState.region })
            })
        } else {
            console.log("Edit mode")
            axios.put("/regions", this.state.editedRegion).then(res => {
                console.log(res.data);
                this.getAllReservedWords();

            })
        }
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Wards
                        <small>Manage wards.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.AddWordMode} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
                            <i className="fa fa-plus mr-2"></i>
                            Add Ward</Button>


                            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add New District" : "Edit District"}</ModalHeader>
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
                                records={this.state.wardsList}
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

export default ManageWards;
