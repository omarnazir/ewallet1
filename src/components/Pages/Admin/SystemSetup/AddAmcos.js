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

class AddAmcos extends Component {

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
        crops: [],
            registrars: [],
            mcos: []

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

    ViewAllAmcos = () => {
        return this.props.history.push('/admin-manage-amcos')
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
                        Add New Amcos
                        <small>Adding a new amcos.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllAmcos} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Amcos</Button>
                    </div>
                </div>
                <Container fluid>

                <Card className="pure-form card-default">
                        <CardBody>
                            <form className="mb-3" onSubmit={this.onSubmit}>
                                <Row>
                                    <Col md={4}>
                                        <div className="form-group">
                                            <label>Region <span className="red">*</span> </label>
                                            <select name="regionId" className="form-control" value={this.state.regionId} onChange={this.onChangeRegion}>
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
                                            <select name="districtId" className="form-control" value={this.state.districtId} onChange={this.onChangeDistrict}>
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
                                            <select name="wardId" className="form-control" value={this.state.wardId} onChange={this.onChangeWard}>
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
                                            <label>Village <span className="red">*</span> </label>
                                            <select name="villageId" className="form-control" value={this.state.villageId} onChange={this.handleOnChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.villages.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                            <span className="text-danger">{this.state.villageIdError}</span>
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <div className="form-group">
                                            <label>MCU <span className="red">*</span> </label>
                                            <select name="mcosId" className="form-control" value={this.state.mcosId} onChange={this.handleOnChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.mcos.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                            <span className="text-danger">{this.state.mcosIdError}</span>
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <div className="form-group">
                                            <label>Registrar <span className="red">*</span> </label>
                                            <select name="registrarId" className="form-control" value={this.state.registrarId} onChange={this.handleOnChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                 
                                                }
                                            </select>
                                            <span className="text-danger">{this.state.registrarIdError}</span>
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <div className="form-group">
                                            <label>Amcos Name <span className="red">*</span></label>
                                            <input placeholder="Write amcos name ..."
                                                name="name"
                                                className="form-control"
                                                onChange={this.handleOnChange}
                                                value={this.state.name} />
                                            <span className="text-danger">{this.state.nameError}</span>
                                        </div>
                                    </Col>
                                </Row>
{/* 
                                <Row>
                                    <Col md={12}>
                                        <div className="form-group">
                                            <button className="btn btn-primary mr-2">Save</button>
                                            <a href="/amcos" className="btn btn-danger">Cancel</a>
                                        </div>
                                    </Col>
                                </Row> */}
                                
                            </form>
                        </CardBody>
                        <CardFooter>
                            <div className="d-flex align-items-center">
                                <div className="ml-auto">
                                    <button className="btn btn-danger px-5 mr-2" onClick={this.ViewAllAmcos}>Cancel</button>
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

export default AddAmcos;
