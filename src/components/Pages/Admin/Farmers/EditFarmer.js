import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
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
import $, { data } from "jquery";

import FormValidator from '../../../Common/FormValidator';
import axios from '../../../../services/axios'
import Moment from "moment";

class EditFarmer extends Component {

    state = {

        addFarmerForm: {
            id: 0,
            firstName: "",
            middleName: "",
            surname: "",
            dateOfBirth: "",
            idNumber: "",
            msisdn: "",
            memberID: "",
            hamlet: "",
            longitude: "",
            latitude: "",
            farmSize: 0,

        },
        //gender
        sex: "0",
        //Crops
        mainCropId: 0,
        secondaryCropId: 0,
        //location
        regionId: 0,
        districtId: 0,
        wardId: 0,
        villageId: 0,
        //amcos
        amcosId: 0,

        //farm
        farmingType: "",
        farmingMethod: "",

        //Arrays
        regions: [],
        districts: [],
        wards: [],
        villages: [],
        amcos: [],
        crops: [],
        mode: true,
        farmerId: 0,

    }


    componentDidMount() {
        const { state } = this.props.history.location;
        if (state == undefined) {
            console.log("Farmer Id: 0");
            this.setState({ mode: true })
            return this.props.history.push('/admin-farmers-list')
        }

        if (state != undefined) {
            console.log("Farmer Id:", state);
            this.setState({ mode: false })
            this.setState({ farmerId: state })

            this.getAllCrops();
            this.getAllAmcos();

            axios.get("/farmers/" + state)
                .then(res => {

                    this.setState({ addFarmerForm: { ...this.state.addFarmerForm, id: res.data.id } })
                    this.setState({ addFarmerForm: { ...this.state.addFarmerForm, firstName: res.data.firstName } })
                    this.setState({ addFarmerForm: { ...this.state.addFarmerForm, middleName: res.data.middleName } })
                    this.setState({ addFarmerForm: { ...this.state.addFarmerForm, surname: res.data.surname } })

                    this.setState({ addFarmerForm: { ...this.state.addFarmerForm, dateOfBirth: res.data.dateOfBirth } })
                    this.setState({ addFarmerForm: { ...this.state.addFarmerForm, idNumber: res.data.idNumber } })
                    this.setState({ addFarmerForm: { ...this.state.addFarmerForm, msisdn: res.data.msisdn } })
                    this.setState({ addFarmerForm: { ...this.state.addFarmerForm, memberID: res.data.memberID } })
                    this.setState({ addFarmerForm: { ...this.state.addFarmerForm, hamlet: res.data.hamlet } })
                    this.setState({ addFarmerForm: { ...this.state.addFarmerForm, longitude: res.data.longitude } })
                    this.setState({ addFarmerForm: { ...this.state.addFarmerForm, latitude: res.data.latitude } })
                    this.setState({ addFarmerForm: { ...this.state.addFarmerForm, farmSize: res.data.farmSize } })

                    this.setState({ sex: res.data.sex })
                    this.setState({ farmingMethod: res.data.farmingMethod })
                    this.setState({ farmingType: res.data.farmingType })

                    this.setState({ mainCropId: res.data.mainCrop.id })
                    this.setState({ secondaryCropId: res.data.secondaryCrop.id })

                    this.setState({ amcosId: res.data.amcos.id })

                    this.setState({ regionId: res.data.region.id })
                    this.setState({ districtId: res.data.district.id })
                    this.setState({ wardId: res.data.ward.id })
                    this.setState({ villageId: res.data.village.id })

                    this.getAllRegions();
                    this.getAllWardsByDistrict(res.data.district.id);
                    this.getAllDistrictsByRegion(res.data.region.id);
                    this.getAllVillagesByWard(res.data.ward.id);
                })

        };

        this.getAllCrops();
        this.getAllAmcos();

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

    getAllCrops() {
        axios.get("/crops").then(res => { this.setState({ crops: res.data }) })
    }

    getAllAmcos() {
        axios.get("/amcos").then(res => { this.setState({ amcos: res.data }) })
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

        console.log(hasError ? 'Form has errors. Check!' : 'Form Submitted!')

        if (!hasError) {

            const farmer = {
                "id": this.state.addFarmerForm.id,
                "firstName": this.state.addFarmerForm.firstName,
                "middleName": this.state.addFarmerForm.middleName,
                "surname": this.state.addFarmerForm.surname,
                "sex": this.state.sex,
                "dateOfBirth": this.state.addFarmerForm.dateOfBirth,
                "idNumber": this.state.addFarmerForm.idNumber,
                "msisdn": this.state.addFarmerForm.msisdn,
                "memberID": this.state.addFarmerForm.memberID,
                "mainCropId": this.state.mainCropId,
                "secondaryCropId": this.state.secondaryCropId,
                "region": this.state.regionId,
                "district": this.state.districtId,
                "ward": this.state.wardId,
                "village": this.state.villageId,
                "hamlet": this.state.addFarmerForm.hamlet,
                "amcos": this.state.amcosId
            }

            const farm = {
                "longitude": this.state.addFarmerForm.longitude,
                "latitude": this.state.addFarmerForm.latitude,
                "farmSize": this.state.addFarmerForm.farmSize,
                "farmingType": this.state.farmingType,
                "farmingMethod": this.state.farmingMethod
            }

            const data = { farmer, farm };
            console.log(data);

            axios.put("/farmers", data).then(res => {

                this.ViewAllFarmers();
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

    ViewAllFarmers = () => {
        return this.props.history.push('/admin-farmers-list')
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
                        {this.state.mode ? "Add New Farmer " : "Edit Farmer Details"}
                        <small> {this.state.mode ? "Adding a new farmer." : "Edit Farmer"}</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllFarmers} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Farmers</Button>
                    </div>
                </div>
                <Container fluid>
                    <form class="form-horizontal" onSubmit={this.onSubmit} name="addFarmerForm">
                        <Card className="pure-form card-default">
                            <CardBody>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <h5 className="text-uppercase font-weight-600">Personal Information</h5>
                                    </div>
                                </div>

                                <Row>
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>First Name <span className="red">*</span></label>

                                            <Input
                                                placeholder="Write a first name..."
                                                type="text"
                                                name="firstName"
                                                invalid={this.hasError('addFarmerForm', 'firstName', 'required')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required"]'
                                                value={this.state.addFarmerForm.firstName}
                                            />
                                            <span className="invalid-feedback">Full name is required</span>

                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>Middle name</label>

                                            <Input
                                                placeholder="Write middle name..."
                                                type="text"
                                                name="middleName"
                                                onChange={this.validateOnChange}
                                                data-validate='["required"]'
                                                value={this.state.addFarmerForm.middleName}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>Surname <span className="red">*</span></label>

                                            <Input
                                                placeholder="Write a surname..."
                                                type="text"
                                                name="surname"
                                                invalid={this.hasError('addFarmerForm', 'surname', 'required')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required"]'
                                                value={this.state.addFarmerForm.surname}
                                            />
                                            <span className="invalid-feedback">Last name is required</span>
                                        </div>
                                    </div>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Date of Birth <span className="red">*</span></Label>

                                            <Input
                                                type="date"
                                                name="dateOfBirth"
                                                invalid={this.hasError('addFarmerForm', 'dateOfBirth', 'required')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required"]'
                                                value={this.state.addFarmerForm.dateOfBirth}
                                            />
                                            <span className="invalid-feedback">DOB is required</span>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Gender <span className="red">*</span></Label>
                                            <select name="sex" className="form-control" value={this.state.sex} onChange={this.handleChange} >
                                                <option value="0">-- Select --</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>

                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Phone <span className="red">*</span></Label>
                                            <Input type="text"
                                                placeholder="Write phone number..."
                                                name="msisdn"
                                                invalid={this.hasError('addFarmerForm', 'msisdn', 'minlen')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required","minlen"]'
                                                value={this.state.addFarmerForm.msisdn}
                                                data-param="10" />
                                            <span className="invalid-feedback">Valid phone number is required</span>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>ID Type <span className="red">*</span></Label>
                                            <select name="idType" className="form-control" value={this.state.idType} onChange={this.handleChange} >
                                                <option value="">-- Select --</option>
                                                <option value="NIN">National ID</option>
                                                <option value="VIN">Voting ID</option>
                                            </select>

                                        </FormGroup>
                                    </Col>

                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>ID Number <span className="red">*</span></Label>

                                            <Input type="text"
                                                placeholder="Write Id number..."
                                                name="idNumber"
                                                invalid={this.hasError('addFarmerForm', 'idNumber', 'minlen')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required","minlen"]'
                                                value={this.state.addFarmerForm.idNumber}
                                                data-param="14" />
                                            <span className="invalid-feedback">Valid ID number is required</span>

                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="mt-3">
                                    <Col md={12}>
                                        <h5 className="text-uppercase font-weight-600">Farm Details</h5>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label>Region <span className="red">*</span></Label>
                                            <select name="regionId" className="form-control" value={this.state.regionId} onChange={this.handleComplexChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.regions.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>

                                        </FormGroup>
                                    </Col>

                                    <Col md={3}>
                                        <FormGroup>
                                            <Label>District <span className="red">*</span></Label>
                                            <select name="districtId" className="form-control" value={this.state.districtId} onChange={this.handleComplexChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.districts.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>

                                        </FormGroup>
                                    </Col>

                                    <Col md={3}>
                                        <FormGroup>
                                            <Label>Ward <span className="red">*</span></Label>
                                            <select name="wardId" className="form-control" value={this.state.wardId} onChange={this.handleComplexChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.wards.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>

                                        </FormGroup>
                                    </Col>

                                    <Col md={3}>
                                        <FormGroup>
                                            <Label>Village <span className="red">*</span></Label>
                                            <select name="villageId" className="form-control" value={this.state.villageId} onChange={this.handleComplexChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.villages.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>

                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label>Farm Size <span className="red">*</span></Label>

                                            <Input type="text"
                                                placeholder="Write farm size..."
                                                name="farmSize"
                                                invalid={this.hasError('addFarmerForm', 'farmSize', 'minlen')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required","minlen"]'
                                                value={this.state.addFarmerForm.farmSize}
                                                data-param="1" />
                                            <span className="invalid-feedback">Farm size is required</span>
                                        </FormGroup>
                                    </Col>

                                    <Col md={3}>
                                        <FormGroup>
                                            <Label>Type Of Farming <span className="red">*</span></Label>
                                            <select name="farmingType"
                                                className="form-control"
                                                value={this.state.farmingType}
                                                onChange={this.handleChange} >
                                                <option value="">-- Select --</option>
                                                <option value="Irrigation">Irrigation</option>
                                                <option value="Manual">Manual</option>
                                                <option value="None">None</option>
                                            </select>

                                        </FormGroup>
                                    </Col>

                                    <Col md={3}>
                                        <FormGroup>
                                            <Label>Equipment Used <span className="red">*</span></Label>
                                            <select name="farmingMethod"
                                                className="form-control"
                                                value={this.state.farmingMethod}
                                                onChange={this.handleChange} >
                                                <option value="">-- Select --</option>
                                                <option value="Tractor">Tractor</option>
                                                <option value="Manual">Manual</option>
                                            </select>

                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label>Latitude </Label>


                                            <Input
                                                placeholder="Write latitude..."
                                                type="text"
                                                name="latitude"
                                                onChange={this.validateOnChange}
                                                value={this.state.addFarmerForm.latitude}
                                            />
                                        </FormGroup>
                                    </Col>



                                    <Col md={3}>
                                        <FormGroup>
                                            <Label>Longitude </Label>
                                            <input className="form-control"
                                                name="longitude"
                                                type="text"
                                                placeholder="Write longitude..."
                                                value={this.state.longitude}
                                                onChange={this.handleOnChange} />
                                        </FormGroup>
                                    </Col>


                                </Row>

                                <Row className="mt-3">
                                    <Col md={12}>
                                        <h5 className="text-uppercase font-weight-600">Membership Information </h5>
                        
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Member ID <span className="red">*</span></Label>
                                            <input className="form-control"
                                                name="memberID"
                                                type="text"
                                                placeholder="Write Member ID..."
                                                value={this.state.memberID}
                                                onChange={this.handleOnChange} />

                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Amcos <span className="red">*</span></Label>
                                            <select name="amcosId" className="form-control" value={this.state.amcosId} onChange={this.handleChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.amcos.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>

                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Hamlet <span className="red">*</span></Label>
                                            <Input
                                                placeholder="Write Hamlet ..."
                                                type="text"
                                                name="hamlet"
                                                invalid={this.hasError('addFarmerForm', 'hamlet', 'required')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required"]'
                                                value={this.state.addFarmerForm.hamlet}
                                            />
                                            <span className="invalid-feedback">Hamlet is required</span>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="mt-3">
                                    <Col md={12}>
                                        <h5 className="text-uppercase font-weight-600">Crops Information</h5>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>Main Crop <span className="red">*</span></Label>
                                            <select name="mainCropId" className="form-control" value={this.state.mainCropId} onChange={this.handleChange}>
                                                <option value="0">-- Select --</option>
                                                {
                                                    this.state.crops.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>

                                        </FormGroup>
                                    </Col>

                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>Secondary Crops </Label>
                                            <select name="secondaryCropId" className="form-control" value={this.state.secondaryCropId} onChange={this.handleChange}>
                                                <option value="0">-- Select --</option>
                                                {
                                                    this.state.crops.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <div className="d-flex align-items-center">
                                    <div className="ml-auto">
                                        <button className="btn btn-danger px-5 mr-2" onClick={this.ViewAllFarmers}>Cancel</button>
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

export default EditFarmer;
