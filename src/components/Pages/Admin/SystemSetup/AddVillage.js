import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import { Link, Redirect } from 'react-router-dom';
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    Button,
    FormGroup,
    Row,
    Col,
    Input, CardFooter,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label
} from "reactstrap";
import $ from "jquery";

import FormValidator from '../../../Common/FormValidator';
import Moment from "moment";

class AddVillage extends Component {

    state = {
       
        //location
        regionId: 0,
        districtId: 0,
        wardId: 0,
        villageName: "",
        villageId:0,

        regions: [],
        districts: [],
        wards: [],
        villages: [],
        amcos: [],
        crops: [],
        registrars: [],
        mcos: []

    }

    componentDidMount() {

        const { state } = this.props.history.location;
        if (state == undefined) {
            console.log("Village Id: 0");
            this.setState({ mode: true })
        }

        if (state != undefined) {
            console.log("Villge Id:", state);
            this.setState({ mode: false })

            axios.get("/villages/"+state).then(res => {
                // regionId: 0,
                // districtId: 0,
                // wardId: 0,
                // villageName: "", 
                this.setState({wardId:res.ward.id})
                this.setState({villageId:res.id})
                this.setState({villageName:res.name})

             })
        };
        this.getAllRegions();
    }



    getAllRegions() {
        axios.get("/regions").then(res => { this.setState({ regions: res.data }) })
    }

    getAllDistrictsByRegion(id) {
        axios.get("/regions/" + id + "/districts").then(res => { this.setState({ districts: res.data }) })
    }
    getAllWardsByDistrict(id) {
        axios.get("/wards/byDistrict/" + id).then(res => { this.setState({ wards: res.data }) })
    }
    getAllVillagesByWard(id) {
        axios.get("/villages/byWard/" + id).then(res => this.setState({ villages: res.data }))
    }



    handleComplexChange = event => {

        console.log("Field Name: " + [event.target.name] + " Field Value: " + [event.target.value])
        if ([event.target.name] == "regionId") {
            this.getAllDistrictsByRegion([event.target.value]);
            this.setState({ districtId: 0 });
            this.setState({ wardId: 0 });
            this.setState({ villageId: 0 });

            this.setState({ regionId: event.target.value });

        }
        if ([event.target.name] == "districtId") {
            this.getAllWardsByDistrict([event.target.value]);
            this.setState({ wardId: 0 })
            this.setState({ villageId: 0 })

            this.setState({ districtId: event.target.value })
        }
        if ([event.target.name] == "wardId") {
            this.getAllVillagesByWard([event.target.value]);
            this.setState({ villageId: 0 })

            this.setState({ wardId: event.target.value })
        }

        if (event.target.name == "villageId") {
            this.setState({ villageId: event.target.value })
            this.getAllAmcos(event.target.value)
        }
    }

    validateOnChange = event => {
        const input = event.target;
        const form = input.form
        const value = input.type === 'checkbox' ? input.checked : input.value;

        const result = FormValidator.validate(input);

        if (result != null) {
            this.setState({
                [form.name]: {
                    ...this.state[form.name],
                    [input.name]: value,
                    errors: {
                        ...this.state[form.name].errors,
                        [input.name]: result
                    }
                }
            });
        }
    }




    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    formatDate = (date) => {
        //07/19/2021 10:49:10
        // YYYY-MM-DD HH:mm:ss
        return Moment(date).format('MM/DD/YYYY HH:mm:ss')
    }


    onSubmit = e => {
        e.preventDefault()
        const form = e.target;
        const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT'].includes(i.nodeName))

        const { errors, hasError } = FormValidator.bulkValidate(inputs)

        this.setState({
            [form.name]: {
                ...this.state[form.name],
                errors
            }
        });

        console.log(hasError ? 'Form has errors. Check!' : 'Form Submitted!');

        if (!hasError) {

            const village = {
                "name": this.state.villageName,
                "wardId": this.state.wardId
            }
            axios.post("/villages", village).then(res => {
                this.ViewAllVillage();
            })
        }
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }


    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method]
    }

    // admin-edit-village
    ViewAllVillage = () => {
        return this.props.history.push('/admin-manage-villages')
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
                        Add New Village
                        <small>Adding a new village.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllVillage} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Villages</Button>
                    </div>
                </div>
                <Container fluid>

                    <form className="mb-3" onSubmit={this.onSubmit}>
                        <Card className="pure-form card-default">

                            <CardBody>

                                <Row>
                                    <Col md={4}>
                                        <div className="form-group">
                                            <label>Region <span className="red">*</span> </label>
                                            <select name="regionId" className="form-control" value={this.state.regionId} onChange={this.handleComplexChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.regions.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                            <span className="text-danger">{this.state.regionIdError}</span>
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <div className="form-group">
                                            <label>District <span className="red">*</span> </label>
                                            <select name="districtId" className="form-control" value={this.state.districtId} onChange={this.handleComplexChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.districts.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                            <span className="text-danger">{this.state.districtIdError}</span>
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <div className="form-group">
                                            <label>Ward <span className="red">*</span> </label>
                                            <select name="wardId" className="form-control" value={this.state.wardId} onChange={this.handleComplexChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.wards.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                            <span className="text-danger">{this.state.wardIdError}</span>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="form-group">
                                            <label>Village Name <span className="red">*</span></label>
                                            <input placeholder="Write village name ..."
                                                required
                                                name="villageName"
                                                className="form-control"
                                                onChange={this.handleChange}
                                                value={this.state.villageName} />

                                        </div>
                                    </Col>
                                </Row>


                            </CardBody>
                            <CardFooter>
                                <div className="d-flex align-items-center">
                                    <div className="ml-auto">
                                        <button className="btn btn-danger px-5 mr-2" onClick={this.ViewAllVillage}>Cancel</button>
                                        <button type="submit" style={this.AddActionButtonStyle} className="btn btn-primary px-5">Save</button>
                                    </div>
                                </div>
                            </CardFooter>

                        </Card>
                    </form>


                </Container>
            </ContentWrapper>
        );
    }
}

export default AddVillage;
