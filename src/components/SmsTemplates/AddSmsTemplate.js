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


class AddSmsTemplate extends Component {
    state = {
        name: "",
    };


    handleSubmit = event => {
        console.log("am here")
        event.preventDefault();
        //change to tarriff
        const tarriff = {
            "tariffName": this.state.name.toUpperCase(),
            "fromSms": null,
            "toSms": null,
            "expireDurationDays": null,
            "createdAt": "2020-12-02T17:05:19.000+00:00",
            "createdBy": 0,
            "isDefault": 1
        }
        axios.post("/tariff", tarriff).then(res => {
            console.log(res);
            console.log(res.data);
            this.ViewTarrifs();
        })
    }

    ViewAllTemplates = () => {
        return this.props.history.push('/sms-templates')
    }

    handleChange = event => {
        this.setState({ name: event.target.value });
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Add Sms Template
                     <small>Adding a new sms template</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllTemplates} outline color="danger" className="btn-pill-right mr-2">View All Sms Templates</Button>
                    </div>
                </div>
                <Container fluid>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <Card className="card-default">
                                <CardBody>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Message Type : </label>
                                            <select className="form-control" id="exampleFormControlSelect1">
                                                <option>Static message</option>
                                                <option>Dynamic message</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Dynamic sms field: </label>
                                            <select className="form-control" id="exampleFormControlSelect1">
                                                <option>Insert field</option>
                                                <option>Column A</option>
                                                <option>Column B</option>
                                                <option>Column C</option>
                                                <option>Column D</option>
                                                <option>Column E</option>
                                                <option>Column F</option>
                                                <option>Column G</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Message : </label>
                                            <textarea rows="5" className="form-control" type="text" />
                                            <span  className="mt-2">0 characters</span>
                                        </div>
                                        <button className="btn btn-sm btn-success mr-3" type="submit">
                                            Save
                                        </button>
                                        <button onClick={this.ViewTarrifs} className="btn btn-sm btn-danger">
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

export default AddSmsTemplate;
