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
import $, { holdReady } from "jquery";

import FormValidator from '../../../Common/FormValidator';
import axios from '../../../../services/axios';
import { batch } from "react-redux";
import { SuccessAlert, InfoAlert } from "../../../Common/AppAlerts";

class MakePayement extends Component {

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
        amcos: [],
        crops: [],
        harvests: [],
        regionId: 0,
        districtId: 0,
        wardId: 0,
        villageId: 0,
        amcosId: 0,
        cropId: 0
    };

    componentDidMount() {
        this.getAllRegions();
        try {
            this.setState({ harvests: JSON.parse(sessionStorage.getItem("harvests")).results });
        } catch (error) {
            this.setState({ harvests: [] });
        }
    }

    getAllRegions() {
        axios.get("/regions").then(res => { this.setState({ regions: res.data }); });
    }
    getAllDistrictsByRegion(id) {
        axios.get("/regions/" + id + "/districts").then(res => { this.setState({ districts: res.data }); });
    }
    getAllWardsByDistrict(id) {
        axios.get("/wards/byDistrict/" + id).then(res => { this.setState({ wards: res.data }); });
    }
    getAllVillagesByWard(id) {
        axios.get("/villages/byWard/" + id).then(res => this.setState({ villages: res.data }));
    }

    getAllAmcosByVillage = (id) => {
        axios.get("/amcos/byVillage/" + id).then(res => { this.setState({ amcos: res.data }); });
    };

    getAllCropsByAmcos = (id) => {
        axios.get(`/amcos-crops/${id}/crops`).then(res => { this.setState({ crops: res.data }); });
    };

    getHarvestByAmcosAndCrop = (data) => {
        axios.post("/farmer-harvests/search", data).then(res => {
            console.log(res.data.results);
            sessionStorage.clear();
            sessionStorage.setItem("harvests", JSON.stringify(res.data));
            this.setState({ harvests: JSON.parse(sessionStorage.getItem("harvests")).results });
        });
    };

    InitiatePayment = (e) => {
        e.preventDefault();
        let batch = [];
        this.state.harvests.forEach(harvest => {
            let b = { "harvestId": +harvest.id, "amount": parseFloat(harvest.cropsValue) };
            console.log(b);
            return batch.push(b);

        });

        console.log(batch);
        let data = {
            "batchName": "MALIPO " + new Date().toLocaleDateString(),
            "batch": batch
        };

        console.log(data);

        axios.post("/farmer-harvests/initiate-payment", { data }).then(res => {
            console.log(res.data);
            SuccessAlert("Malipo yameanzishwa kamilifu");
            sessionStorage.clear();
        }).catch(err => {
            console.log(err.message);
            console.log(err.response);
        });
    };

    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method];
    };


    validateOnChange = event => {
        const input = event.target;
        const form = input.form;
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

    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleComplexChange = event => {
        if ([event.target.name] == "regionId") {
            this.getAllDistrictsByRegion([event.target.value]);
            this.setState({ districtId: 0 });
            this.setState({ wardId: 0 });
            this.setState({ villageId: 0 });

            this.setState({ regionId: event.target.value });

        }
        if ([event.target.name] == "districtId") {
            this.getAllWardsByDistrict([event.target.value]);
            this.setState({ wardId: 0 });
            this.setState({ villageId: 0 });

            this.setState({ districtId: event.target.value });
        }
        if ([event.target.name] == "wardId") {
            this.getAllVillagesByWard([event.target.value]);
            this.setState({ villageId: 0 });

            this.setState({ wardId: event.target.value });
        }

        if (event.target.name == "villageId") {
            this.getAllAmcosByVillage([event.target.value]);
            this.setState({ villageId: event.target.value });
        }

        if (event.target.name == "amcosId") {
            this.getAllCropsByAmcos([event.target.value]);
            this.setState({ amcosId: event.target.value });
        }

        if (event.target.name == "cropId") {
            let crop_id = event.target.value;
            console.log(crop_id);
            this.setState({ cropId: crop_id });
            const searchObj = {
                msisdn: "",
                crop: +crop_id,
                amcos: +this.state.amcosId,
            };
            console.log(searchObj);
            this.getHarvestByAmcosAndCrop(searchObj);
        }

        console.log(this.state.cropId);
    };

    handleSmsTemplateChange = event => {
        const templateId = event.target.value;
        const template = this.state.rolesList.find(item => item.id == templateId);
        this.setState({ role: template.name });
        this.setState({ description: template.description });
        this.setState({ roleId: template.id });
    };

    ViewAllTransactions = () => {
        sessionStorage.clear()
        return this.props.history.push('/admin-mpesa-wallet');
    };

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    };

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Pay Farmers
                        <small>Pay Farmers.</small>
                    </div>
                    <div className="flex-row">
                        <Button style={this.AddActionButtonStyle} className="btn-pill-right mr-2">Go Back</Button>
                    </div>
                </div>
                <Container fluid>

                    <form className="mb-3" name="formSearchHarvest">
                        <h3>Lipa Mavuno </h3>
                        <Card className="card-default">
                            <CardBody>
                                <Row>
                                    <Col md={3}>
                                        <div className="form-group">
                                            <label>Region <span className="red">*</span> </label>
                                            <select name="regionId" className="form-control" value={this.state.regionId} onChange={this.handleComplexChange}>
                                                <option value="0">-- Select --</option>
                                                {
                                                    this.state.regions.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>;
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
                                                        return <option key={index} value={data.id}>{data.name}</option>;
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
                                                        return <option key={index} value={data.id}>{data.name}</option>;
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
                                                        return <option key={index} value={data.id}>{data.name}</option>;
                                                    })
                                                }
                                            </select>
                                            <span className="invalid-feedback">Village is required</span>
                                        </div>
                                    </Col>

                                    <Col md={3}>
                                        <div className="form-group">
                                            <label>AMCOS <span className="red">*</span> </label>
                                            <select name="amcosId" className="form-control" value={this.state.amcosId} onChange={this.handleComplexChange}>
                                                <option value="0">-- Select --</option>
                                                {
                                                    this.state.amcos.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>;
                                                    })
                                                }
                                            </select>
                                            <span className="invalid-feedback">Amcos is required</span>
                                        </div>
                                    </Col>

                                    <Col md={3}>
                                        <div className="form-group">
                                            <label>Crops <span className="red">*</span> </label>
                                            <select name="cropId" className="form-control" onChange={this.handleComplexChange}> value={this.state.cropId}
                                                <option value="0">-- Select --</option>
                                                {
                                                    this.state.crops.map((row, index) => {
                                                        return <option key={index} value={row.id}>{row.crop.name}</option>;
                                                    })
                                                }
                                            </select>
                                            <span className="invalid-feedback">Crops is required</span>
                                        </div>
                                    </Col>

                                    {/* <Col md={3}>
                                        <br />
                                        <button onClick={this.onSubmit} className="btn btn-success d-flex align-items-end flex-column">Search Harvests</button>
                                    </Col> */}
                                </Row>
                            </CardBody>
                            <Row>
                                <h4 style={{ margin: "auto" }}>Orodha ya mavuno</h4>
                                <table style={{ margin: "auto", width: "95%" }} class="table table-striped">

                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>NAME</th>
                                            <th>PHONE</th>
                                            <th>BALANCE</th>
                                            <th>CROP</th>
                                            <th>UNIT PRICE</th>
                                            <td>VALUE</td>
                                            {/* <th>ACTION</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.harvests.length > 0 ? this.state.harvests.map((row, i) => {
                                                return (
                                                    <tr>
                                                        <td>{i + 1} </td>
                                                        <td>{row.farmer.firstName} {row.farmer.surname}</td>
                                                        <td>{row.farmer.msisdn}</td>
                                                        <td>{row.farmer.name}</td>
                                                        <td>{row.crop.name}</td>
                                                        <td>{row.cropUnitPrice}</td>
                                                        <td>{row.cropsValue}</td>
                                                        {/* <td>
                                                            <span className="btn btn-success"><i className="fa fa-eye"></i></span>
                                                        </td> */}
                                                    </tr>
                                                );
                                            }) : "No Harvest"
                                        }
                                    </tbody>
                                </table>
                            </Row>
                            <CardFooter>
                                <div className="d-flex align-items-center">
                                    <div className="ml-auto">
                                        <button className="btn btn-danger px-5 mr-2" onClick={this.ViewAllTransactions}>Sitisha</button>
                                        <button type="submit" onClick={this.InitiatePayment} style={this.AddActionButtonStyle} className="btn btn-primary px-5">Anzisha Malipo</button>
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

export default MakePayement;
