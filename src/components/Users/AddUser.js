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
        email:"",
        phonenumber:"",
        password:"",
        confirmPassword:""

    };
    //phone number and email

    handleSubmit = event => {

        const fk=sessionStorage.getItem('customerFk').toString();
       
        event.preventDefault();
        const user = {
            "name": this.state.name,
            "username": this.state.username,
            "password": this.state.password,
            "image": null,
            "status": null,
            "lastLogin": null,
            "thirdParty": null,
            "customerFk": fk,
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
        this.setState({ [event.target.name]: event.target.value });
    }

    AddActionButtonStyle={
        color:'white',
        background:"#003366"
      }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Create Admin User
                     <small>Adding a new user.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllUsers} style={this.AddActionButtonStyle}  className="btn-pill-right">View All Users</Button>
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
