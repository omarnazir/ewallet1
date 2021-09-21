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
import { CropsService,CropsTypeService } from "../../../../services";

class ManageAmcos extends Component {
    state = {
        crops: [],
        modal: false,
        mode: true,
        loading: true,
        editedCrop: {
            id: 0,
            name: "",
            cropType: 0
        },
        crop: {
            name: "",
            cropType: 0
        },
        cropTypeList: []
    };

    initialState = {
        crop: {
            name: "",
            cropType: 0
        }
    }

    componentDidMount() {
        this.getAllMCUS();
    }

    getAllMCUS() {
        axios.get("/amcos")
            .then(res => {
                this.setState({ loading: false })
                this.setState({ crops: res.data })

            })
    }

    getAllCrops() {
        CropsService.getAllCrops().then(res => {
            const crops = res.data;
            this.setState({ loading: false })
            this.setState({ crops })

        })
    }

    getAllCropTypes() {
        CropsTypeService.getAllCropTypes().then(res => {
            this.setState({ cropTypeList: res.data })
        })
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    AddAmcos=()=>{
        return this.props.history.push("/admin-add-amcos");
      }

    AddRoleMode = () => {
        this.setState({ mode: true })
        this.toggleModal();
    }

    EditRole(row) {
        console.log(row)
        const cropType = row.cropType == null ? 0 : Number(row.cropType.id);
        const editedCrop = {
            id: row.id,
            name: row.name,
            cropType
        }
        this.setState({ editedCrop })
        this.setState({ mode: false })
        this.toggleModal();
    }


    DeleteRole(id) {
        axios.delete("/crops/" + id)
            .then(res => {
                const response = res.data;
                const crops = this.state.crops.filter((item) => {
                    return item.id !== id;
                });
                this.setState({ crops })
            })
    }


    handleChange = event => {
        if (this.state.mode) {
            this.setState({
                crop: Object.assign({},
                    this.state.crop, { [event.target.name]: event.target.value })
            })
        } else {
            this.setState({
                editedCrop: Object.assign({}, this.state.editedCrop,
                    { [event.target.name]: event.target.value })
            })
        }
    }



    handleSubmit = event => {
        event.preventDefault();
        this.toggleModal();
        if (this.state.mode) {
            console.log("Add mode")
            axios.post("/crops", this.state.crop).then(res => {
                console.log(res.data);
                this.getAllCrops();
                this.setState({ crop: this.initialState.crop })
            })
        } else {
            console.log("Edit mode")
            console.log(this.state.editedCrop);
            axios.put("/crops", this.state.editedCrop).then(res => {
                console.log(res.data);
                this.getAllCrops();
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
            key: "mcu",
            text: "MCU",
            cell:(record,index)=>{
                return record.mcos.name
            }
        },
        {
            key: "registar",
            text: "REGISTRAR",
            cell:(record,index)=>{
                return record.registrarId.name
            }
        },
        {
            key: "location",
            text: "LOCATION",
            cell:(record,index)=>{
                return record.village.ward.district.region.name+","+ record.village.ward.district.name+","+record.village.ward.name+","+record.village.name;
            }
        },
        {
            key: "id",
            text: "ACTION",
            cell: (record, index) => {
                return (
                    <Button style={{
                        color: 'white',
                        background: "#003366"
                      }} className="btn btn-success"
                        onClick={() => {
                          this.ViewCustomerDetails(record);
                        }}
                      >
                        <i className="fa fa-eye"></i>
                      </Button>
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
                        AMCOS
                        <small>Manage Amcos.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.AddAmcos} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
                            <i className="fa fa-plus mr-2"></i>
                            Add New Amcos</Button>
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
                                records={this.state.crops}
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

export default ManageAmcos;
