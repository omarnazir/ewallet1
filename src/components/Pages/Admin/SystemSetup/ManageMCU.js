import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import {
    Container, Card, CardHeader, CardBody, CardTitle, Button, Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";
import ReactDatatable from '@ashvin27/react-datatable';
import { Fragment } from "react";


class ManageMCU extends Component {
    state = {
        modal: false,
        mode: true,
        loading: true,
        editedMco: {
            id: 0,
            name: "",
            regionId: 0
        },
        mco: {
            name: "",
            regionId: 0
        },
        mcosList: [],
        regionsList:[]
    };

    initialState = {
        mco: {
            name: "",
            regionId: 0
        }
    }

    componentDidMount() {
        this.getAllMCOS();
        this.getAllRegions();
    }

    getAllMCOS() {
        axios.get("/mcos")
            .then(res => {
                this.setState({ loading: false })
                this.setState({ mcosList: res.data })

            })
    }

    getAllRegions() {
        axios.get("/regions")
            .then(res => {
                this.setState({ loading: false })
                this.setState({ regionsList: res.data })
            })
    }

   

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    AddRoleMode = () => {
        this.setState({ mode: true })
        this.toggleModal();
    }

    EditRole(row) {
        console.log(row)
        const editedMco = {
            id: row.id,
            name:row.name,
            regionId: row.region.id
        }
        this.setState({ editedMco })
        this.setState({ mode: false })
        this.toggleModal();
    }


    DeleteRole(id) {
        axios.delete("/mcos/" + id)
            .then(res => {
                const mcosList = this.state.mcosList.filter((item) => {
                    return item.id !== id;
                });
                this.setState({ mcosList })
            })
    }


    handleChange = event => {
        if (this.state.mode) {
            this.setState({
                mco: Object.assign({},
                    this.state.mco, { [event.target.name]: event.target.value })
            })
        } else {
            this.setState({
                editedMco: Object.assign({}, this.state.editedMco,
                    { [event.target.name]: event.target.value })
            })
        }
    }



    handleSubmit = event => {
        event.preventDefault();
        this.toggleModal();
        if (this.state.mode) {
            console.log("Add mode")
            axios.post("/mcos", this.state.mco).then(res => {
                console.log(res.data);
                this.getAllMCOS();
                this.setState({ mco: this.initialState.mco })
            })
        } else {
            console.log("Edit mode")
            console.log(this.state.editedMco);
            axios.put("/mcos", this.state.editedMco).then(res => {
                console.log(res.data);
                this.getAllMCOS();
            })
        }
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
            text: "NAME"
        },
        {
            key: "region",
            text: "REGION",
            cell: (record, index) => {
                if (record.region != null) {
                    return record.region.name;
                }
                return "";
            }
        },
        {
            key: "status",
            text: "STATUS",
            cell: (record, index) => {
                return (<span className="badge badge-success">{record.status}</span>)

            }

        },
        {
            key: "id",
            text: "ACTION",
            cell: (record, index) => {
                return (
                    <Fragment>
                        <span className="btn badge-success mr-2 px-4" onClick={() => this.EditRole(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
                        <span className="btn bg-danger-dark  px-4" onClick={() => this.DeleteRole(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
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

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        MCU
                        <small>Manage MCU's (Marketing Corporative Union).</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.AddRoleMode} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
                            <i className="fa fa-plus mr-2"></i>
                            Add New MCU</Button>

                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add MCU" : "Edit MCU"}</ModalHeader>
                            <form onSubmit={this.handleSubmit}>
                                <ModalBody>
                                    <FormGroup>
                                        <label>Name :</label>
                                        <input className="form-control" name="name"
                                            value={this.state.mode ? this.state.mco.name : this.state.editedMco.name}
                                            onChange={this.handleChange} type="text" required></input>
                                    </FormGroup>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect1">Region : </label>
                                        <select className="form-control" id="exampleFormControlSelect1" name="regionId"
                                            onChange={this.handleChange}
                                            value={this.state.mode ? this.state.mco.regionId : this.state.editedMco.regionId}
                                        >
                                            <option value="0">Select type</option>
                                            {this.state.regionsList.map(row => (
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
                    <Card>
                        <CardHeader>
                        </CardHeader>
                        <CardBody>
                            <ReactDatatable
                                extraButtons={this.extraButtons}
                                config={this.config}
                                records={this.state.mcosList}
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

export default ManageMCU;
