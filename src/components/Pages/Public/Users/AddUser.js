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

class AddNormalUser extends Component {


    state = {
        /* Group each form state in an object.
           Property name MUST match the form name */
        formRegister: {
            email: '',
            password: '',
            password2: '',
            terms: false,
            fullname: "",
            username: "",
            phonenumber: "",
            monthlysmslimit: 0
        }
    }

    validateOnChange = event => {
        const input = event.target;
        const form = input.form
        const value = input.type === 'checkbox' ? input.checked : input.value;

        const result = FormValidator.validate(input);

        if(result !=null){
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
            const data={
                "username":this.state.formRegister.username,
                "email":this.state.formRegister.email,
                "password":this.state.formRegister.password,
                "name":this.state.formRegister.fullname,
                "msisdn":this.state.formRegister.phonenumber,
                "userMonthlySmsLimit":this.state.formRegister.monthlysmslimit
            }
            console.log(data)
           

            axios.post("/users",data).then(res=>{
                console.log(res);
                console.log(res.data);
                this.ViewUserPage();
              })
        }
    }

    hasError = (formName, inputName, method) => {
        return this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method]
    }

    ViewAllUsers = () => {
        return this.props.history.push('/manage-users')
    }

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

    ViewUserPage = () => {
        return this.props.history.push("/manage-users");
      };

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Create User
                     <small>Adding a new user.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllUsers} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Users</Button>
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
                                                    <Input type="text"
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

                                            <span className="text-center ml-3"><strong>NOTE: &nbsp;</strong>Must contain at least one upper and one lower letter, one special character and number</span>


                                        </div>
                                        <div className="row mt-2">

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="col-form-label">Monthly SMS Limit * :</label>
                                                    <Input type="text"
                                                        name="monthlysmslimit"
                                                        invalid={this.hasError('formRegister', 'monthlysmslimit', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formRegister.monthlysmslimit} />
                                                    <span className="invalid-feedback">Field is required</span>
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

export default AddNormalUser;
