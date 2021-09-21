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
    Input, CardFooter,
    Modal,
    Row,
    Col,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import $ from "jquery";

import FormValidator from '../../../Common/FormValidator';
import axios from '../../../../services/axios'
import Moment from "moment";

class AddRegistar extends Component {

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
            accountExpiration:""

        },
        rolesList: [],
        description: "",
        selectedRoleList: [],
        role: "",
        roleId: 0,
        roleDescription: "",

        regions: [],
        districts: [],
        wards: [],
        villages: [],
    }

    componentDidMount() {
        axios.get("/roles/admin")
            .then(res => {
                const response = res.data;
                this.setState({ rolesList: response })
            })
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

    handleSubmit = event => {
        this.toggleModal();
        event.preventDefault()

        console.log(event.target.value)
        const roleId = this.state.roleId;
        const role = this.state.rolesList.find(item => item.id == roleId);
        const found = this.state.selectedRoleList.find((row) => row.id == roleId);

        if (found == undefined) {
            const selectedRoleList = [...this.state.selectedRoleList, role]
            this.setState({ selectedRoleList })
        }
        console.log(this.state.roleId)
        console.log(this.state.role)
        console.log(this.state.description)

    }

    DeleteUserRole = (id) => {
        const role = this.state.rolesList.find(item => item.id == id);
        const selectedRoleList = this.state.selectedRoleList.filter(row => row.id != role.id)
        this.setState({ selectedRoleList })

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
            const accountExpiration=this.formatDate(this.state.formRegister.accountExpiration);
            const User = {
                "username": this.state.formRegister.username,
                "email": this.state.formRegister.email,
                "password": this.state.formRegister.password,
                "name": this.state.formRegister.fullname,
                "msisdn": this.state.formRegister.phonenumber,
                "userMonthlySmsLimit": this.state.formRegister.monthlysmslimit,
                "accountExpiration":accountExpiration
            }

            console.log(this.formatDate(this.state.formRegister.accountExpiration))
            console.log(User)

            const data = { user:User,role_ids:UserRoles }
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

    handleSmsTemplateChange = event => {
        const templateId = event.target.value
        const template = this.state.rolesList.find(item => item.id == templateId);
        this.setState({ role: template.name })
        this.setState({ description: template.description })
        this.setState({ roleId: template.id })
    }


    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method]
    }

    ViewAllRegistars = () => {
        return this.props.history.push('admin-manage-registars')
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
                        Create New Registar
                     <small>Adding a new registar.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllRegistars} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Registars</Button>
                    </div>
                </div>
                <Container fluid>
                <Card className="card-default">
                        <CardBody>
                            <form className="mb-3" onSubmit={this.onSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label>Full Name <span className="red">*</span></label>
                                            <input placeholder="Write full name ..."
                                                name="fullName"
                                                className="form-control"
                                                onChange={this.handleOnChange}
                                                value={this.state.fullName} />
                                            <span className="text-danger">{this.state.fullNameError}</span>
                                        </div>
                                    </Col>

                                    <Col md={6}>
                                        <div className="form-group">
                                            <label>Phone <span className="red">*</span> </label>
                                            <input placeholder="Write phone ..."
                                                name="msisdn"
                                                className="form-control"
                                                onChange={this.handleOnChange}
                                                value={this.state.msisdn} />
                                            <span className="text-danger">{this.state.msisdnError}</span>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={3}>
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

                                    <Col md={3}>
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

                                    <Col md={3}>
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

                                    <Col md={3}>
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
                                </Row>

                                <Row>
                                    <Col md={12}>
                                        <div className="form-group">
                                            <label>Address </label>
                                            <input
                                                name="address"
                                                className="form-control"
                                                placeholder="Write address..."
                                                onChange={this.handleOnChange}
                                                value={this.state.address} />
                                            <span className="invalid-feedback">{this.state.addressError}</span>
                                        </div>
                                    </Col>
                                </Row>

                                {/* <Row>
                                    <Col md={12}>
                                        <div className="form-group">
                                            <button className="btn btn-primary mr-2">Save</button>
                                            <a href="/registrars" className="btn btn-danger">Cancel</a>
                                        </div>
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

export default AddRegistar;
