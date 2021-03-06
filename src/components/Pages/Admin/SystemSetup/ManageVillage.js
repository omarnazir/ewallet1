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
import {SuccessAlert,DeleteAlert} from "../../../Common/AppAlerts";

class ManageVillage extends Component {
    state = {
        regionsList: [],
        modal: false,
        mode: true,
        loading:true,
        editedRegion: {
            id:0,
            name: ""
        },
        region: {
            word: ""
        }
    };

    initialState = {
        region: {
            id:0,
            word: ""
        }
    }


    componentDidMount() {
        this.getAllReservedWords();
    }

    getAllReservedWords() {
        axios.get("/villages")
            .then(res => {
                const regionsList = res.data;
                this.setState({loading:false})
                this.setState({ regionsList })

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
                return (record.ward.district.region.name);
            }
        },
        {
            key: "district",
            text: "DISTRICT",
            cell: (record, index) => {
                return (record.ward.district.name);
            }
        },
        {
            key: "ward",
            text: "WARD",
            cell: (record, index) => {
                return (record.ward.name);
            }
        },
        {
            key: "name",
            text: "Village"
        },
        {
            key: "id",
            text: "ACTION",
            cell: (record, index) => {
                return (
                    <Fragment>
                        <span className="btn badge-success mr-2 px-4" onClick={() => this.EditVillage(record.id)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
                        <span className="btn bg-danger-dark  px-4" onClick={() => this.AlertDeleteItem(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
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

    AddVillage=()=>{
        return this.props.history.push('/admin-add-village')
    }

    EditVillage=(id)=>{
        return this.props.history.push('/admin-edit-village/' + id, id)
      
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
            id:row.id,
            word: row.word
        }

        this.setState({ editedRestricted })
        this.setState({ mode: false })
        this.toggleModal();
    }

    DeleteVillage(id) {
        axios.delete("/villages/" + id)
            .then(res => {
                const response = res.data;
                const regionsList = this.state.regionsList.filter((item) => {
                    return item.id !== id;
                });
                this.setState({ regionsList })
                
            })
    }


    AlertDeleteItem(id){
        DeleteAlert().then((willDelete)=>{
          if(willDelete){
            this.DeleteVillage(id);
            SuccessAlert("Deleted Village Successfully")
          }
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
                        Villages
                        <small>Manage villages.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.AddVillage} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
                        <i className="fa fa-plus mr-2"></i>
                            Add Village</Button>

                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add New Region" : "Edit Region"}</ModalHeader>
                            <form onSubmit={this.handleSubmit}>
                                <ModalBody>
                                    <FormGroup>
                                        <label>Name :</label>
                                        <input className="form-control" name="name"
                                            value={this.state.mode ? this.state.region.name : this.state.editedRegion.name}
                                            onChange={this.handleChange} type="text" required></input>
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
                                records={this.state.regionsList}
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

export default ManageVillage;
