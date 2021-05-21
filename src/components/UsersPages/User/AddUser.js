import React, { Component } from "react";
import ContentWrapper from "../../Layout/ContentWrapper";

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
    FormGroup
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
                    <div className="mr-auto flex-row">
                        Create User
                     <small>Adding a new user.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllUsers} outline color="danger" className="btn-pill-right mr-2">View All Users</Button>
                    </div>
                </div>
                <Container fluid>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <Card className="card-default">
                                <CardBody>
                                    <form onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <label>Full name :</label>
                                            <input className="form-control" name="name" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Username :</label>
                                            <input className="form-control" name="username" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Email :</label>
                                            <input className="form-control" type="email" name="email" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Phone number:</label>
                                            <input className="form-control" name="phonenumber" type="number" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Password :</label>
                                            <input className="form-control" name="password" type="text" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Confirm Password :</label>
                                            <input className="form-control" name="confirmPassword" type="text" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>User monthly limit:</label>
                                            <input className="form-control" name="limit" type="number" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                        <button className="btn btn-sm btn-success mr-3" type="submit">
                                            Save
                                        </button>
                                        <button className="btn btn-sm btn-danger" onClick={this.ViewAllUsers}>
                                            Cancel
                                        </button>
                                    </form>
                                </CardBody>
                            </Card>

                        </div>
                    </div>
                </Container>
            </ContentWrapper>
        );
    }
}

export default AddNormalUser;
