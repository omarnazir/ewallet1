import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import { Link, Redirect } from 'react-router-dom';
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    InputGroup,
    InputGroupAddon,
    Button,
    FormGroup,
    Row, Col, Input, CardFooter, CustomInput
} from "reactstrap";
import $ from "jquery";

import FormValidator from '../../../Common/FormValidator';
import axios from '../../../../services/axios'

class AddUser extends Component {

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
            settings:false,

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
            const data = {
                "username": this.state.formRegister.username,
                "email": this.state.formRegister.email,
                "password": this.state.formRegister.password,
                "name": this.state.formRegister.fullname,
                "msisdn": this.state.formRegister.phonenumber,
                "userMonthlySmsLimit": this.state.formRegister.monthlysmslimit
            }
            console.log(data)


            // axios.post("users/admin", data).then(res => {
            //     console.log(res);
            //     console.log(res.data);
            //     this.ViewUserPage();
            // })
        }
    }


    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method]
    }

    ViewAllAdminUsers = () => {
        return this.props.history.push('/admin-manage-users')
    }

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

    ViewUserPage = () => {
        return this.props.history.push("/admin-manage-users");
    };

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Create Admin User
                     <small>Adding a new user.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllAdminUsers} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Users</Button>
                    </div>
                </div>
                <Container fluid>
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <form onSubmit={this.onSubmit} name="formRegister" action="">
                                <Card className="card-default">
                                    <CardBody>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Full Name *:</label>
                                                    <Input type="text"
                                                        name="fullname"
                                                        invalid={this.hasError('formRegister', 'fullname', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formRegister.fullname}

                                                    />


                                                    <span className="invalid-feedback">Field is required</span>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Username *:</label>
                                                    <Input type="text"
                                                        name="username"
                                                        invalid={this.hasError('formRegister', 'username', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formRegister.username} />
                                                    <span className="invalid-feedback">Field is required</span>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Email Address *</label>
                                                    <Input type="email"
                                                        name="email"
                                                        invalid={this.hasError('formRegister', 'email', 'required') || this.hasError('formRegister', 'email', 'email')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required", "email"]'
                                                        value={this.state.formRegister.email} />
                                                    {this.hasError('formRegister', 'email', 'email') && <span className="invalid-feedback">Field must be valid email</span>}
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Phone Number * :</label>
                                                    <Input type="number"
                                                        name="phonenumber"
                                                        invalid={this.hasError('formRegister', 'phonenumber', 'minlen')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required","minlen"]'
                                                        value={this.state.formRegister.phonenumber}
                                                        data-param="10" />
                                                    {/* <span className="invalid-feedback">Field is required</span> */}
                                                    <span className="invalid-feedback">Valid phone number is required</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Password *</label>
                                                    <Input type="password"
                                                        id="id-password"
                                                        name="password"
                                                        invalid={this.hasError('formRegister', 'password', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formRegister.password}
                                                    />
                                                    <span className="invalid-feedback">Password is required</span>
                                                    <span className="text-center  invalid-feedback"><strong>NOTE: &nbsp;</strong>Must contain at least one upper and one lower letter, one special character and number</span>

                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Confirm Password *</label>
                                                    <Input type="password" name="password2"
                                                        invalid={this.hasError('formRegister', 'password2', 'equalto')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["equalto"]'
                                                        value={this.state.formRegister.password2}
                                                        data-param="id-password"
                                                    />
                                                    <span className="invalid-feedback">Passwords must match</span>
                                                </div>
                                            </div>

                                            {/* <span className="text-center ml-3"><strong>NOTE: &nbsp;</strong>Must contain at least one upper and one lower letter, one special character and number</span> */}


                                        </div>


                                        <div className="row">
                                            <div className="col-md-12">

                                                <h4 className="text-center"><strong>User Roles</strong></h4>
                                                <div className="form-group px-md-4 px-1 mt-1">

                                                    <div className="form-row my-2">

                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="vwdashboard" value="2" />
                                                            <label className="form-check-label" for="vwdashboard">View Dashboard</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="vwreports" value="2" />
                                                            <label className="form-check-label" for="vwreports">View Customer List</label>
                                                        </div>

                                                    </div>
                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="vwsyslogs" value="3" />
                                                            <label className="form-check-label" for="vwsyslogs">Post Paid Customer</label>
                                                        </div>

                                                    </div>

                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="adduser" value="4" />
                                                            <label className="form-check-label" for="adduser">View Transactions</label>
                                                        </div>

                                                    </div>
                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="compsmsnum" value="5" />
                                                            <label className="form-check-label" for="compsmsnum">Manage Sender Id's</label>
                                                        </div>

                                                    </div>
                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="compsmsupnum" value="6" />
                                                            <label className="form-check-label" for="compsmsupnum">Manage Templates</label>
                                                        </div>

                                                    </div>
                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="crtsenderid" value="7" />
                                                            <label className="form-check-label" for="crtsenderid">Manage Tariffs</label>
                                                        </div>

                                                    </div>
                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="dltuser" value="8" />
                                                            <label className="form-check-label" for="dltuser">Manage Users</label>
                                                              {/* <CustomInput type="checkbox" id="terms"
                                                                name="terms"
                                                                label="System Settings"
                                                                invalid={this.hasError('formRegister', 'terms', 'required')}
                                                                onChange={this.validateOnChange}
                                                                
                                                                checked={this.state.formRegister.terms}> 

        </CustomInput> */}
                                                        </div>

                                                    </div>

                                                    {/* add 9 12 10 11 */}
                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">

                                                            <CustomInput type="checkbox" id="settings"
                                                                name="settings"
                                                                label="System Settings"
                                                                invalid={this.hasError('formRegister', 'settings', 'required')}
                                                                onChange={this.validateOnChange}
                                                                checked={this.state.formRegister.terms}
                                                               
                                                                >

                                                            </CustomInput>
                                                            {/* <input className="form-check-input" type="checkbox" id="edtuser" value="25" />
                                                            <label className="form-check-label" for="edtuser">System Settings</label> */}
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>


                                        </div>


                                    </CardBody>
                                    <CardFooter>
                                        <div className="d-flex align-items-center">
                                            <div className="ml-auto">
                                                <button className="btn btn-danger px-5 mr-2" onClick={this.ViewUserPage}>Cancel</button>
                                                <button type="submit" style={this.AddActionButtonStyle} className="btn btn-primary px-5">Save</button>
                                            </div>
                                        </div>
                                    </CardFooter>


                                </Card>

                            </form>
                        </div>
                    </div>
                </Container>
            </ContentWrapper>
        );
    }
}

export default AddUser;
