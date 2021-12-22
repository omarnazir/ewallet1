import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import { Link, Redirect } from 'react-router-dom';
import {
    Container,
    Card,
    CardBody,
    Button,
    Input, CardFooter,
    Modal,
    Row,
    Col
} from "reactstrap";
import $ from "jquery";

import FormValidator from '../../../Common/FormValidator';
import axios from '../../../../services/axios'

class AddRegistar extends Component {

    state = {
        formAddRegistrar: {
            id: 0,
            name: "",
            address: "",
            msisdn: "",
            type: "Registar"
        },
        regions: [],
        districts: [],
        wards: [],
        villages: [],

        regionId: 0,
        districtId: 0,
        wardId: 0,
        villageId: 0
    }

    componentDidMount() {
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

    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method]
    }


    validateOnChange = event => {
        const input = event.target;
        const form = input.form
        const value = input.type === 'checkbox' ? input.checked : input.value;

        const result = FormValidator.validate(input);

        this.setState({
            formAddRegistrar: {
                ...this.state.formAddRegistrar,
                [input.name]: value,
                errors: {
                    ...this.state.formAddRegistrar.errors,
                    [input.name]: result
                }
            }
        });

    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = e => {
        e.preventDefault()
        console.log("clicked");
        const form = e.target;
        const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT'].includes(i.nodeName))

        const { errors, hasError } = FormValidator.bulkValidate(inputs)

        this.setState({
            formAddRegistrar: {
                ...this.state.formAddRegistrar,
                errors
            }
        });

        console.log(hasError ? 'Form has errors. Check!' : 'Form Submitted!')
        if (!hasError) {
            const registar={
                name: this.state.formAddRegistrar.name,
                address:this.state.formAddRegistrar.address,
                msisdn: this.state.formAddRegistrar.msisdn,
                type: this.state.formAddRegistrar.type,
                regionId: this.state.regionId,
                districtId: this.state.districtId,
                wardId: this.state.wardId,
                villageId: this.state.villageId

            }
            console.log(registar);
            axios.post("/registars", registar).then(res => {
                console.log(res);
                this.ViewAllRegistars();
            })
        }
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleComplexChange = event => {

        console.log("Field Name: " + [event.target.name] + " Field Value: " + [event.target.value])
        if ([event.target.name] == "regionId") {
            this.getAllDistrictsByRegion([event.target.value]);
            this.setState({ districtId: 0  });
            this.setState({ wardId: 0 });
            this.setState({ villageId: 0 });

            this.setState({  regionId: event.target.value  });

        }
        if ([event.target.name] == "districtId") {
            this.getAllWardsByDistrict([event.target.value]);
            this.setState({  wardId: 0  })
            this.setState({ villageId: 0 } )

            this.setState({ districtId: event.target.value  })
        }
        if ([event.target.name] == "wardId") {
            this.getAllVillagesByWard([event.target.value]);
            this.setState({ villageId: 0  })

            this.setState({wardId: event.target.value  })
        }

        if (event.target.name == "villageId") {
            this.setState({ villageId: event.target.value  })
        }
    }

    handleSmsTemplateChange = event => {
        const templateId = event.target.value
        const template = this.state.rolesList.find(item => item.id == templateId);
        this.setState({ role: template.name })
        this.setState({ description: template.description })
        this.setState({ roleId: template.id })
    }

    ViewAllRegistars = () => {
        return this.props.history.push('/admin-manage-registars')
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
                        Create New Registar
                        <small>Adding a new registar.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllRegistars} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Registars</Button>
                    </div>
                </div>
                <Container fluid>

                    <form className="mb-3" onSubmit={this.onSubmit} name="formAddRegistrar">
                        <Card className="card-default">
                            <CardBody>

                                <Row>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label>Full Name <span className="red">*</span></label>
                                            <Input
                                                type="text"
                                                name="name"
                                                invalid={this.hasError('formAddRegistrar', 'name', 'required')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required"]'
                                                value={this.state.formAddRegistrar.name}
                                            />
                                            <span className="invalid-feedback">Full name is required</span>
                                        </div>
                                    </Col>

                                    <Col md={6}>
                                        <div className="form-group">
                                            <label>Phone <span className="red">*</span> </label>

                                            <Input type="tel"
                                                placeholder="Write phone ..."
                                                name="msisdn"
                                                invalid={this.hasError('formAddRegistrar', 'msisdn', 'minlen')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required","minlen"]'
                                                value={this.state.formAddRegistrar.msisdn}
                                                data-param="10" />
                                            <span className="invalid-feedback">Valid phone number is required</span>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={3}>
                                        <div className="form-group">
                                            <label>Region <span className="red">*</span> </label>
                                            <select name="regionId" className="form-control" value={this.state.regionId} onChange={this.handleComplexChange}>
                                                <option value="0">-- Select --</option>
                                                {
                                                    this.state.regions.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                            <span className="invalid-feedback">Region is required</span>
                                        </div>
                                    </Col>

                                    <Col md={3}>
                                        <div className="form-group">
                                            <label>District <span className="red">*</span> </label>
                                            <select name="districtId" className="form-control" value={this.state.districtId} onChange={this.handleComplexChange}>
                                                <option value="0">-- Select --</option>
                                                {
                                                    this.state.districts.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                            <span className="invalid-feedback">District is required</span>
                                        </div>
                                    </Col>

                                    <Col md={3}>
                                        <div className="form-group">
                                            <label>Ward <span className="red">*</span> </label>
                                            <select name="wardId" className="form-control" value={this.state.wardId} onChange={this.handleComplexChange}>
                                                <option value="0">-- Select --</option>
                                                {
                                                    this.state.wards.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                            <span className="invalid-feedback">Ward is required</span>
                                        </div>
                                    </Col>

                                    <Col md={3}>
                                        <div className="form-group">
                                            <label>Village <span className="red">*</span> </label>
                                            <select name="villageId" className="form-control" value={this.state.villageId} onChange={this.handleComplexChange}>
                                                <option value="0">-- Select --</option>
                                                {
                                                    this.state.villages.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                            <span className="invalid-feedback">Village is required</span>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={12}>
                                        <div className="form-group">
                                            <label>Address </label>

                                            <Input
                                                placeholder="Write address..."
                                                type="text"
                                                name="address"
                                                invalid={this.hasError('formAddRegistrar', 'address', 'required')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required"]'
                                                value={this.state.formAddRegistrar.address}
                                            />
                                            <span className="invalid-feedback">Address is required</span>
                                        </div>
                                    </Col>
                                </Row>

                            </CardBody>
                            <CardFooter>
                                <div className="d-flex align-items-center">
                                    <div className="ml-auto">
                                        <button className="btn btn-danger px-5 mr-2" onClick={this.ViewAllRegistars}>Cancel</button>
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

export default AddRegistar;
