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

class EditAdminUser extends Component {


    state = {
        formRegister: {
            email: '',
            password: '',
            password2: '',
            terms: false,
            fullname: "",
            username: "",
            phonenumber: "",
            monthlysmslimit: 0
        },
        user:{}
    }
    componentDidMount(){
        const { state } = this.props.history.location;
        // console.log(state.id)
        if (state == undefined) {
            return this.props.history.push('/admin-customers-list/')
        }

        axios.get("/users/" + state.id)
            .then(res => {
                const response = res.data;
                const user=response;
                console.log(response)
                const formRegister=this.state.formRegister;
            
                this.setState({ user })
            })
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
           

            // axios.post("users/admin",data).then(res=>{
            //     console.log(res);
            //     console.log(res.data);
            //     this.ViewUserPage();
            //   })
        }
    }

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

 

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Edit User
                     <small>Updating user details</small>
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
                                     
{/* 
                                        <div className="row">
                                            <div className="col-md-12">

                                                <h4 className="text-center"><strong>User Roles</strong></h4>
                                                <div className="form-group px-md-4 px-1 mt-1">

                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="vwconlist" value="vwconlist" />
                                                            <label className="form-check-label" for="vwconlist">View Contact List</label>
                                                        </div>
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="vwdashboard" value="vwdashboard" />
                                                            <label className="form-check-label" for="vwdashboard">View Dashboard</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="vwreports" value="vwreports" />
                                                            <label className="form-check-label" for="vwreports">View Reports</label>
                                                        </div>
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="vwsenderid" value="vwsenderid" />
                                                            <label className="form-check-label" for="vwsenderid">View Sender IDs</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="vwsyslogs" value="vwsyslogs" />
                                                            <label className="form-check-label" for="vwsyslogs">View System Logs</label>
                                                        </div>
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="vwusers" value="vwusers" />
                                                            <label className="form-check-label" for="vwusers">View Users</label>
                                                        </div>
                                                    </div>

                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="adduser" value="adduser" />
                                                            <label className="form-check-label" for="adduser">Add User</label>
                                                        </div>
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="composesms" value="composesms" />
                                                            <label className="form-check-label" for="composesms">Compose SMS</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="compsmsnum" value="compsmsnum" />
                                                            <label className="form-check-label" for="compsmsnum">Compose SMS using Enter number</label>
                                                        </div>
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="compsmspb" value="compsmspb" />
                                                            <label className="form-check-label" for="compsmspb">Compose SMS using Phonebook</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="compsmsupnum" value="compsmsupnum" />
                                                            <label className="form-check-label" for="compsmsupnum">Compose SMS using Upload number</label>
                                                        </div>
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="crtcontactlist" value="crtcontactlist" />
                                                            <label className="form-check-label" for="crtcontactlist">Create Contact List</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="crtsenderid" value="crtsenderid" />
                                                            <label className="form-check-label" for="crtsenderid">Create Sender Id</label>
                                                        </div>
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="dltconlist" value="dltconlist" />
                                                            <label className="form-check-label" for="dltconlist">Delete Contact List</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="dltuser" value="dltuser" />
                                                            <label className="form-check-label" for="dltuser">Delete User</label>
                                                        </div>
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="edtconlist" value="edtconlist" />
                                                            <label className="form-check-label" for="edtconlist">Edit Contact List</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="edtuser" value="edtuser" />
                                                            <label className="form-check-label" for="edtuser">Edit User</label>
                                                        </div>
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="reqsms" value="reqsms" />
                                                            <label className="form-check-label" for="reqsms">Request SMS</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-row my-2">
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="snddynamsg" value="snddynamsg" />
                                                            <label className="form-check-label" for="snddynamsg">Send dynamic messages</label>
                                                        </div>
                                                        <div className="form-check form-check-inline col-sm-5">
                                                            <input className="form-check-input" type="checkbox" id="sndschmsg" value="sndschmsg" />
                                                            <label className="form-check-label" for="sndschmsg">Send Schedule SMS</label>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>


                                        </div> */}


                                    </CardBody>
                                    <CardFooter>
                                        <div className="d-flex align-items-center">
                                            <div className="ml-auto">
                                                <button className="btn btn-danger px-5 mr-2" onClick={this.ViewAllAdminUsers}>Cancel</button>
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

export default EditAdminUser;
