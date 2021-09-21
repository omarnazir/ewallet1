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
import $ from "jquery";

import FormValidator from '../../../Common/FormValidator';
import axios from '../../../../services/axios'
import Moment from "moment";

class AddFarmer extends Component {

    state = {
        formRegister: {
            email: '',
            password: '',
            password2: '',
            terms: false,
            fullname: "",
            username: "",
            phonenumber: "",
            monthlysmslimit: 0,
            settings: false,
            accountExpiration: ""

        },
        description: "",
        selectedRoleList: [],
        role: "",
        roleId: 0,
        roleDescription: "",

        regions: [],
        districts: [],
        wards: [],
        villages: [],
        amcos: [],
        crops: []

    }

    componentDidMount() {
       
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
        console.log("am hree")
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

        console.log(this.state.selectedRoleList)


        const UserRoles = [];
        this.state.selectedRoleList.forEach(item => {
            const newItem = { role_id: item.id }
            UserRoles.push(newItem)
        });


        if (!hasError) {
            const accountExpiration = this.formatDate(this.state.formRegister.accountExpiration);
            const User = {
                "username": this.state.formRegister.username,
                "email": this.state.formRegister.email,
                "password": this.state.formRegister.password,
                "name": this.state.formRegister.fullname,
                "msisdn": this.state.formRegister.phonenumber,
                "userMonthlySmsLimit": this.state.formRegister.monthlysmslimit,
                "accountExpiration": accountExpiration
            }

            console.log(this.formatDate(this.state.formRegister.accountExpiration))
            console.log(User)

            const data = { user: User, role_ids: UserRoles }
            console.log(data)


            axios.post("users/admin", data).then(res => {
                console.log(res);
                console.log(res.data);
                this.ViewUserPage();
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

    ViewUserPage = () => {
        return this.props.history.push("/admin-manage-users");
    };

    render() {
        let index = 0;
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Add New Farmer
                        <small>Adding a new farmer.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllFarmers} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Farmers</Button>
                    </div>
                </div>
                <Container fluid>
                    <Card className="pure-form card-default">
                        <CardBody>
                            <form class="form-horizontal" onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h5 className="text-uppercase font-weight-600">Personal Information</h5>
                                    </div>
                                </div>

                                <Row>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>First Name <span className="red">*</span></label>
                                            <input className="form-control"
                                                placeholder="Write a first name..."
                                                name="firstName"
                                                type="text"
                                                value={this.state.firstName}
                                                onChange={this.handleOnChange} />
                                            <span className="text-danger"></span>
                                        </div>
                                    </div>

                                    <div className="col-lg-2">
                                        <div className="form-group">
                                            <label>Middle name</label>
                                            <input className="form-control"
                                                type="text"
                                                placeholder="Write middle name..."
                                                name="middleName"
                                                value={this.state.middleName}
                                                onChange={this.handleOnChange} />
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>Surname <span className="red">*</span></label>
                                            <input className="form-control"
                                                placeholder="Write a surname..."
                                                name="surname"
                                                value={this.state.surname}
                                                onChange={this.handleOnChange}
                                                type="text" />

                                        </div>
                                    </div>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>Date of Birth <span className="red">*</span></Label>
                                            <input
                                                className="form-control"
                                                name="dateOfBirth"
                                                value={this.state.dateOfBirth}
                                                onChange={this.handleOnChange}
                                                type="date" />

                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <Label>Gender <span className="red">*</span></Label>
                                            <select name="sex" className="form-control" value={this.state.sex} onChange={this.handleOnChange} >
                                                <option value="">-- Select --</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>

                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Phone <span className="red">*</span></Label>
                                            <input className="form-control"
                                                name="msisdn"
                                                type="text"
                                                value={this.state.msisdn}
                                                onChange={this.handleOnChange}
                                                placeholder="Write phone number..." />

                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>ID Type <span className="red">*</span></Label>
                                            <select name="idType" className="form-control" value={this.state.idType} onChange={this.handleOnChange} >
                                                <option value="">-- Select --</option>
                                                <option value="NIN">National ID</option>
                                                <option value="VIN">Voting ID</option>
                                            </select>

                                        </FormGroup>
                                    </Col>

                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>ID Number <span className="red">*</span></Label>
                                            <input className="form-control"
                                                name="idNumber"
                                                type="text"
                                                value={this.state.idNumber}
                                                onChange={this.handleOnChange}
                                                placeholder="Write ID Number..." />

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
                                            <select name="regionId" className="form-control" value={this.state.regionId} onChange={this.onChangeRegion}>
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
                                            <select name="districtId" className="form-control" value={this.state.districtId} onChange={this.onChangeDistrict}>
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
                                            <select name="wardId" className="form-control" value={this.state.wardId} onChange={this.onChangeWard}>
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
                                            <select name="villageId" className="form-control" value={this.state.villageId} onChange={this.onChangeVillage}>
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
                                            <input className="form-control"
                                                name="farmSize"
                                                type="text"
                                                placeholder="Write farm size..."
                                                value={this.state.farmSize}
                                                onChange={this.handleOnChange} />

                                        </FormGroup>
                                    </Col>

                                    <Col md={3}>
                                        <FormGroup>
                                            <Label>Type Of Farming <span className="red">*</span></Label>
                                            <select name="typeOfFarming"
                                                className="form-control"
                                                value={this.state.typeOfFarming}
                                                onChange={this.handleOnChange} >
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
                                            <select name="equipmentUsed"
                                                className="form-control"
                                                value={this.state.equipmentUsed}
                                                onChange={this.handleOnChange} >
                                                <option value="">-- Select --</option>
                                                <option value="Tractor">Tractor</option>
                                                <option value="Manual">Manual</option>
                                            </select>

                                        </FormGroup>
                                    </Col>

                                    <Col md={3}>
                                        <FormGroup>
                                            <Label>Planting Season </Label>
                                            <input className="form-control"
                                                name="plantingSeason"
                                                type="text"
                                                placeholder="Write planting season..."
                                                value={this.state.plantingSeason}
                                                onChange={this.handleOnChange} />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label>Latitude </Label>
                                            <input className="form-control"
                                                name="latitude"
                                                type="text"
                                                placeholder="Write latitude..."
                                                value={this.state.latitude}
                                                onChange={this.handleOnChange} />
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
                                        <h5 className="text-uppercase font-weight-600">Membership Information</h5>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={3}>
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

                                    <Col md={3}>
                                        <FormGroup>
                                            <Label>Amcos <span className="red">*</span></Label>
                                            <select name="amcosId" className="form-control" value={this.state.amcosId} onChange={this.handleOnChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.amcos.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>

                                        </FormGroup>
                                    </Col>

                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>Hamlet <span className="red">*</span></Label>
                                            <input className="form-control"
                                                name="hamlet"
                                                type="text"
                                                placeholder="Write Hamlet..."
                                                value={this.state.hamlet}
                                                onChange={this.handleOnChange} />

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
                                            <select name="cropId" className="form-control" value={this.state.cropId} onChange={this.handleOnChange}>
                                                <option value="">-- Select --</option>
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
                                            <select name="otherCropId" className="form-control" value={this.state.otherCropId} onChange={this.handleOnChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.crops.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                {/* <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <button className="btn btn-sm btn-primary mr-2" type="submit">Save</button>
                                            <a href="/farmers" className="btn btn-danger btn-sm">Cancel</a>
                                        </FormGroup>
                                    </Col>
                                </Row> */}


                            </form>
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
                </Container>
            </ContentWrapper>
        );
    }
}

export default AddFarmer;
