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
import Moment from 'moment'
import { CropsService } from "../../../../services";
import {SuccessAlert,DeleteAlert} from "../../../Common/AppAlerts";

class ManageCropPrice extends Component {
    state = {
        cropPricesList: [],
        modal: false,
        mode: true,
        editedCropPrice: {
            id: 0,
            cropId: 0,
            gradeName: "",
            unitPrice: 0
        },
        cropPrice: {
            cropId: 0,
            gradeName: "",
            unitPrice: 0
        },
        loading: true,
        cropsList: []
    };

    initialState = {
        cropPrice: {
            id: 0,
            cropId: 0,
            gradeName: "",
            unitPrice: 0
        }
    }



    componentDidMount() {
        this.getAllCropPrices();
        this.getAllCrops();
    }

    getAllCropPrices() {
        axios.get("/crops-grade-price")
            .then(res => {
                const cropPricesList = res.data;
                this.setState({ loading: false })
                this.setState({ cropPricesList })

            })
    }

    AlertDeleteItem(id){
        DeleteAlert().then((willDelete)=>{
          if(willDelete){
            this.DeleteCropPrice(id);
            SuccessAlert("Deleted Crop Grade Price Successfully")
          }
        })
      }

    getAllCrops() {
        CropsService.getAllCrops().then(res => {
            this.setState({ cropsList: res.data })

        })
    }
    formatDate = (date) => {
        return Moment(date).format('lll')
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
            key: "crop",
            text: "CROP",
            cell: (record, index) => {
                return record.cropId.name;
            }
        },
        {
            key: "type",
            text: "TYPE",
            cell: (record, index) => {
                return record.cropId.type;
            }
        },
        {
            key: "gradeName",
            text: "GRADE"
        },
        {
            key: "unitPrice",
            text: "PRICE"
        },
        {
            key: "createdAt",
            text: "CREATED AT",
            sortable: true,
            cell: (record, index) => {
                return (this.formatDate(record.dateCreated))
            }
        },
        {
            key: "id",
            text: "ACTION",
            cell: (record, index) => {
                return (
                    <Fragment>
                        <span className="btn badge-success mr-2 px-4" onClick={() => this.EditCropPrice(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
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

    AddWordMode = () => {
        this.setState({ mode: true })
        this.toggleModal();
    }
    handleChange = event => {
        if (this.state.mode) {
            this.setState({
                cropPrice: Object.assign({},
                    this.state.cropPrice, { [event.target.name]: event.target.value })
            })
        } else {
            this.setState({
                editedCropPrice: Object.assign({}, this.state.editedCropPrice,
                    { [event.target.name]: event.target.value })
            })
        }
    }

    EditCropPrice(row) {
        console.log(row)
        const editedCropPrice = {
            id: row.id,
            cropId: row.cropId.id,
            gradeName: row.gradeName,
            unitPrice: row.unitPrice
        }

        this.setState({ editedCropPrice })
        this.setState({ mode: false })
        this.toggleModal();
    }

    DeleteCropPrice(id) {
        axios.delete("/crops-grade-price/" + id)
            .then(res => {
                const response = res.data;
                const cropPricesList = this.state.cropPricesList.filter((item) => {
                    return item.id !== id;
                });
                this.setState({ cropPricesList })
            })
    }


    handleSubmit = event => {
        event.preventDefault();
        this.toggleModal();
        if (this.state.mode) {
            console.log("Add mode")
            axios.post("/crops-grade-price", this.state.cropPrice).then(res => {
                console.log(res.data);
                this.getAllCropPrices();
                SuccessAlert("Added Crop Grade Price Successfully");
                this.setState({ cropPrice: this.initialState.cropPrice })
            })
        } else {
            console.log("Edit mode")
            axios.put("/crops-grade-price", this.state.editedCropPrice).then(res => {
                console.log(res.data);
                this.getAllCropPrices();
                SuccessAlert("Updated Crop Grade Price Successfully");
            })
        }
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Crop Prices
                        <small>Manage crop prices.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.AddWordMode} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
                            <i className="fa fa-plus mr-2"></i>
                            Add Crop Price</Button>

                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add Crop Price" : "Edit Crop Price"}</ModalHeader>
                            <form onSubmit={this.handleSubmit}>
                                <ModalBody>
                                <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect1">Crop : </label>
                                        <select className="form-control" id="exampleFormControlSelect1" name="cropId"
                                            onChange={this.handleChange}
                                            value={this.state.mode ? this.state.cropPrice.cropId : this.state.editedCropPrice.cropId}
                                        >
                                            <option value="0">Select type</option>
                                            {this.state.cropsList.map(row => (
                                                <option key={row.id} value={row.id} >
                                                    {row.name}
                                                </option>
                                            ))}

                                        </select>
                                    </div>
                                    <FormGroup>
                                        <label>Grade Name :</label>
                                        <input className="form-control" name="gradeName"
                                            value={this.state.mode ? this.state.cropPrice.gradeName : this.state.editedCropPrice.gradeName}
                                            onChange={this.handleChange} type="text" required></input>
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Price /Unit :</label>
                                        <input className="form-control" name="unitPrice"
                                            value={this.state.mode ? this.state.cropPrice.unitPrice : this.state.editedCropPrice.unitPrice}
                                            onChange={this.handleChange} type="number" required></input>
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
                                records={this.state.cropPricesList}
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

export default ManageCropPrice;
