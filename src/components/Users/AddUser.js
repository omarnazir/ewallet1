import React, { Component } from "react";
import ContentWrapper from "../Layout/ContentWrapper";
import Datatable from "../Common/Datatable";
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
import Datetime from 'react-datetime';
import $ from "jquery";
import axios from "../../services/axios";


class AddUser extends Component {
    state = {
        name: "",
        username:"",
        password:"",

    };

    handleSubmit = event => {

        event.preventDefault();
        const user = {
            "name": "alpha",
            "username": "alpha",
            "password": "alpha123",
            "image": null,
            "status": null,
            "lastLogin": null,
            "thirdParty": null,
            "customerFk": "null"
        }
        axios.post('/register', user, {
            headers: {
                'Content-type': 'application/json', 
            }
        }).then(res => {
            console.log(res);
            console.log(res.data);
            this.ViewAllUsers();
        })
    }

    ViewAllUsers = () => {
        return this.props.history.push('/manage-users')
    }

    handleChange = event => {
        this.setState({ name: event.target.value });
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Add User
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
                                            <label>Sender Id :</label>
                                            <input className="form-control" name="name" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                        <button className="btn btn-sm btn-success mr-3" type="submit">
                                            Save
                                        </button>
                                        <button className="btn btn-sm btn-danger">
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

export default AddUser;
