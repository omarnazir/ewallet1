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
    FormGroup
} from "reactstrap";
import $ from "jquery";
import axios from '../../../../services/axios'


class SendSmsCompose extends Component {
    ViewDashboard = () => {
        return this.props.history.push('/user/dashboard')
    }

    state = {
        smsTemplates: [],
        sendersList: []
    }
    componentDidMount() {
        axios.get("/sms-request")
            .then(res => {
                const response = res.data;
                this.setState({ smsTemplates: response })
                console.log(response);
            })

        axios.get("/sender-ids")
            .then(res => {
                const response = res.data;
                this.setState({ sendersList: response })
                console.log(response);
            })
    }


    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Sending sms
                     <small>Sending a sms.</small>
                    </div>

                </div>
                <Container fluid>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <Card className="card-default">
                                <CardBody>
                                    <form onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <label>Campaign :</label>
                                            <input className="form-control" name="name" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Sender Id : </label>
                                            <select className="form-control" id="exampleFormControlSelect1">
                                                <option>Select a sender id</option>
                                                {this.state.sendersList.map(row => (
                                                    <option key={row.id} value={row.id} >
                                                        {row.senderId}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <FormGroup>
                                            <label>Recipients :</label>
                                            <input className="form-control" type="email" name="email" onChange={this.handleChange} required></input>
                                        </FormGroup>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Sms Template : </label>
                                            <select className="form-control" id="exampleFormControlSelect1">
                                                <option>Select a template</option>
                                                {this.state.smsTemplates.map(row => (
                                                    <option key={row.id} value={row.id}>
                                                        {row.messageTemplate}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <FormGroup>
                                            <label>Template preview :</label>
                                            <textarea rows="8" className="form-control" name="password" type="text" onChange={this.handleChange} required></textarea>
                                        </FormGroup>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Sending Options : </label>
                                            <select className="form-control" id="exampleFormControlSelect1">
                                                <option>Now</option>
                                                <option>Later</option>
                                            </select>
                                        </div>

                                        <FormGroup>
                                            <label>Scheduled Date:</label>
                                            <input className="form-control" name="date" type="datetime-local" onChange={this.handleChange}></input>
                                        </FormGroup>

                                        <button className="btn btn-sm btn-success mr-3" type="submit">
                                            Send Message
                                        </button>
                                        <button className="btn btn-sm btn-danger" onClick={this.ViewDashboard}>
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

export default SendSmsCompose;
