import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";

import {
    Container,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    FormGroup,
    Col,
    Row
} from "reactstrap";
import $ from "jquery";



class AddNormalUser extends Component {
    ViewAllUsers = () => {
        return this.props.history.push('/manage-user')
    }
    render() {
        return (
            <ContentWrapper>
            <div className="content-heading">
                <div>Add User
                </div>
            </div>
            {/* START row */}
            <Row>
                <Col xl="12" className="px-sm-5">
                    <form role="form" className="p-md-4 w-75">
                        <div className="form-group px-md-4 px-1">
                            <div className="input-group with-focus">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-dark text-white">
                                        <em className="fa fa-user"></em>
                                    </span>
                                </div>
                                <Input type="text" name="name"
                                    className="form-control form-control-lg rounded-0"
                                    placeholder="Full Name" />
                            </div>
                        </div>     
                        <div className="form-group px-md-4 px-1">
                            <div className="input-group with-focus">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-dark text-white">
                                        <em className="fa fa-user"></em>
                                    </span>
                                </div>
                                <Input type="text" name="username"
                                    className="form-control form-control-lg rounded-0"
                                    placeholder="Username" />
                            </div>
                        </div> 
                        <div className="form-group px-md-4 px-1">
                            <div className="input-group with-focus">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-dark text-white">
                                        <em className="fa fa-envelope"></em>
                                    </span>
                                </div>
                                <Input type="email" name="email"
                                    className="form-control form-control-lg rounded-0"
                                    placeholder="Email address" />
                                </div>
                        </div>
                        <div className="form-group px-md-4 px-1">
                            <div className="input-group with-focus">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-dark text-white">
                                        <em className="fa fa-phone-alt"></em>
                                    </span>
                                </div>
                                <Input type="tel" name="phone"
                                    className="form-control form-control-lg rounded-0"
                                    placeholder="Phone Number" />
                            </div>
                        </div> 
                        <div className="form-group px-md-4 px-1">
                            <div className="input-group with-focus">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-dark text-white">
                                        <em className="fa fa-lock"></em>
                                    </span>
                                </div>
                                <Input type="password" name="password"
                                    className="form-control form-control-lg rounded-0"
                                    placeholder="Password" />
                            </div>
                        </div>
                        <div className="form-group px-md-4 px-1">
                            <div className="input-group with-focus">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-dark text-white">
                                        <em className="fa fa-lock"></em>
                                    </span>
                                </div>
                                <Input type="password" name="password2"
                                    className="form-control form-control-lg rounded-0"
                                    placeholder="Confirm password" />
                            </div>
                        </div>
                        <div className="row alert alert-success">
                            <strong>NOTE: &nbsp;</strong>Must contain at least one upper and one lower letter, one special character and number
                        </div>
                        <div className="form-group px-md-4 px-1">
                            <div className="input-group with-focus">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-dark text-white">
                                        <em className="fa fa-sort-numeric-down"></em>
                                    </span>
                                </div>
                                <Input type="number" name="limit"
                                    className="form-control form-control-lg rounded-0"
                                    placeholder="User monthly sms limit"/>
                            </div>
                        </div>
                        <h4><strong>User Roles</strong></h4>
                        <div className="form-group px-md-4 px-1 mt-1">
                            <div className="form-row my-2">
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="adduser" value="adduser"/>
                                    <label className="form-check-label" for="adduser">Add User</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="composesms" value="composesms"/>
                                    <label className="form-check-label" for="composesms">Compose SMS</label>
                                </div>
                            </div>
                            <div className="form-row my-2">
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="compsmsnum" value="compsmsnum"/>
                                    <label className="form-check-label" for="compsmsnum">Compose SMS using Enter number</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="compsmspb" value="compsmspb"/>
                                    <label className="form-check-label" for="compsmspb">Compose SMS using Phonebook</label>
                                </div>
                            </div>
                            <div className="form-row my-2">
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="compsmsupnum" value="compsmsupnum"/>
                                    <label className="form-check-label" for="compsmsupnum">Compose SMS using Upload number</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="crtcontactlist" value="crtcontactlist"/>
                                    <label className="form-check-label" for="crtcontactlist">Create Contact List</label>
                                </div>
                            </div>
                            <div className="form-row my-2">
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="crtsenderid" value="crtsenderid"/>
                                    <label className="form-check-label" for="crtsenderid">Create Sender Id</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="dltconlist" value="dltconlist"/>
                                    <label className="form-check-label" for="dltconlist">Delete Contact List</label>
                                </div>
                            </div>
                            <div className="form-row my-2">
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="dltuser" value="dltuser"/>
                                    <label className="form-check-label" for="dltuser">Delete User</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="edtconlist" value="edtconlist"/>
                                    <label className="form-check-label" for="edtconlist">Edit Contact List</label>
                                </div>
                            </div>
                            <div className="form-row my-2">
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="edtuser" value="edtuser"/>
                                    <label className="form-check-label" for="edtuser">Edit User</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="reqsms" value="reqsms"/>
                                    <label className="form-check-label" for="reqsms">Request SMS</label>
                                </div>
                            </div>
                            <div className="form-row my-2">
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="snddynamsg" value="snddynamsg"/>
                                    <label className="form-check-label" for="snddynamsg">Send dynamic messages</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="sndschmsg" value="sndschmsg"/>
                                    <label className="form-check-label" for="sndschmsg">Send Schedule SMS</label>
                                </div>
                            </div>
                            <div className="form-row my-2">
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="vwconlist" value="vwconlist"/>
                                    <label className="form-check-label" for="vwconlist">View Contact List</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="vwdashboard" value="vwdashboard"/>
                                    <label className="form-check-label" for="vwdashboard">View Dashboard</label>
                                </div>
                            </div> 
                            <div className="form-row my-2">
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="vwreports" value="vwreports"/>
                                    <label className="form-check-label" for="vwreports">View Reports</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="vwsenderid" value="vwsenderid"/>
                                    <label className="form-check-label" for="vwsenderid">View Sender IDs</label>
                                </div>
                            </div>
                            <div className="form-row my-2">
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="vwsyslogs" value="vwsyslogs"/>
                                    <label className="form-check-label" for="vwsyslogs">View System Logs</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-5">
                                    <input className="form-check-input" type="checkbox" id="vwusers" value="vwusers"/>
                                    <label className="form-check-label" for="vwusers">View Users</label>
                                </div>
                            </div> 
                        </div>
                        <div className="form-group mt-sm-4 mt-2">
                            <div className="col-sm-6 p-0">
                                <button className="btn btn-primary btn-lg btn-block" id="addUserBtn" type="submit">ADD</button>
                            </div>
                        </div>            
                    </form>
                </Col>
            </Row>
            {/* END row */}
        </ContentWrapper>
        );
    }
}

export default AddNormalUser;
