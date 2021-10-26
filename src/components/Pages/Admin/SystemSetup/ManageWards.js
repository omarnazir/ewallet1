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
            id:0,
            name: "",
            districtId: 0,
            regionId:0
        },
        ward: {
            name: "",
            districtId: 0,
            regionId:0
        }
    };

    initialState = {
        ward: {
            name: "",
            districtId: 0,
            regionId:0
        }

    }

    componentDidMount() {
        this.getAllWards();
       this.getAllRegions()
    
    }
    getAllRegions() {
        axios.get("/regions")
            .then(res => {
                this.setState({ regionsList: res.data })

            })
    }

    getAllWards() {
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
                        <span className="btn badge-success mr-2 px-4" onClick={() => this.EditWard(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
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

    handleComplexChange = event => {

        console.log("Field Name: " + [event.target.name] + " Field Value: " + [event.target.value])

        if (this.state.mode) {

        if ([event.target.name] == "regionId") {
            this.getAllDistrictsByRegion([event.target.value]);
            this.setState({
                ward: Object.assign({},
                    this.state.ward, { districtId: 0 })
            })
        }
            this.setState({
                ward: Object.assign({},
                    this.state.ward, { [event.target.name]: event.target.value })
            })
        } else {

            if ([event.target.name] == "regionId") {
                this.getAllDistrictsByRegion([event.target.value]);
                this.setState({
                    ward: Object.assign({},
                        this.state.ward, { districtId: 0 })
                })
            }
            this.setState({
                editedWard: Object.assign({}, this.state.editedWard,
                    { [event.target.name]: event.target.value })
            })
        }
     
    }


    getAllRegions() {
        axios.get("/regions").then(res => { this.setState({ regionsList: res.data }) })
    }

    getAllDistrictsByRegion(id) {
        axios.get("/regions/" + id + "/districts").then(res => { this.setState({ districtsList: res.data }) })
    }

    EditWard(row) {
        console.log(row)

       const editedWard={
            id:row.id,
            name: row.name,
            districtId: row.district.id,
            regionId:row.district.region.id
        }
        this.getAllDistrictsByRegion(row.district.region.id)
        this.setState({ editedWard })
        this.setState({ mode: false })
        this.toggleModal();
    }


    AlertDeleteItem(id){
        DeleteAlert().then((willDelete)=>{
          if(willDelete){
            this.DeleteRegion(id);
            SuccessAlert("Deleted Ward Successfully")
          }
        })
      }

    DeleteRegion(id) {
        axios.delete("/wards/" + id)
            .then(res => {
                const response = res.data;
                const wardsList = this.state.wardsList.filter((item) => {
                    return item.id !== id;
                });
                this.setState({ wardsList })
            })
    }


    handleSubmit = event => {
        event.preventDefault();
        this.toggleModal();
        if (this.state.mode) {
            console.log("Add mode")
            const ward={
                name:this.state.ward.name,
                districtId:this.state.ward.districtId
            }
            axios.post("/wards", ward).then(res => {
                console.log(res.data);
                this.getAllWards();
                this.setState({ ward: this.initialState.ward })
                SuccessAlert("Added Ward Successfully");
            })
        } else {
            console.log("Edit mode")
            const ward={
                id:this.state.editedWard.id,
                name:this.state.editedWard.name,
                districtId:this.state.editedWard.districtId
            }
            axios.put("/wards", ward).then(res => {
                console.log(res.data);
                this.getAllWards();
                SuccessAlert("Updated Ward Successfully");

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
                            <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add New Ward" : "Edit Ward"}</ModalHeader>
                            <form onSubmit={this.handleSubmit}>
                                <ModalBody>
                                    <FormGroup>
                                        <label htmlFor="exampleFormControlSelect1">Region : </label>
                                        <select className="form-control" id="exampleFormControlSelect1" name="regionId"
                                            onChange={this.handleComplexChange}
                                            value={this.state.mode ? this.state.ward.regionId : this.state.editedWard.regionId}
                                        >
                                            <option value="0">Select Region</option>
                                            {this.state.regionsList.map(row => (
                                                <option key={row.id} value={row.id} >
                                                    {row.name}
                                                </option>
                                            ))}

                                        </select>
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="exampleFormControlSelect1">District : </label>
                                        <select className="form-control" id="exampleFormControlSelect1" name="districtId"
                                            onChange={this.handleComplexChange}
                                            value={this.state.mode ? this.state.ward.districtId : this.state.editedWard.districtId}
                                        >
                                            <option value="0">Select District</option>
                                            {this.state.districtsList.map(row => (
                                                <option key={row.id} value={row.id} >
                                                    {row.name}
                                                </option>
                                            ))}

                                        </select>
                                    </FormGroup>

                                    <FormGroup>
                                        <label>Ward Name :</label>
                                        <input className="form-control" name="name"
                                            value={this.state.mode ? this.state.ward.name : this.state.editedWard.name}
                                            onChange={this.handleComplexChange} type="text" required></input>
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
