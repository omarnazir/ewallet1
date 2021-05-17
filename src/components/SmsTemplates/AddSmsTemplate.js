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
        messageTemplate: '',
        messageTemplateType: ''

    };
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.messageTemplateType.value)
        this.setState({messageTemplateType:event.target.messageTemplate.value})
        const smsTemplate = {
            "senderId": "",
            "messageTemplate": this.state.messageTemplate,
            "customerFk": 6,
            "requestedBy": 6,
            "approvedBy": null,
            "status": "Pending",
            "dateCreated": "2020-12-01T10:19:01.000+00:00",
            "recipientTab": event.target.messageTemplateType.value,
        }
        console.log(smsTemplate)

        
      
      axios.post("/sms-request/create", smsTemplate).then(res => {
          console.log(res);
          console.log(res.data);
          this.ViewAllSmsTemplates();
      }) 
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    ViewAllSmsTemplates = () => {
        return this.props.history.push('/sms-templates')
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
                        <Button onClick={this.ViewAllSmsTemplates} outline color="danger" className="btn-pill-right mr-2">View All Sms Templates</Button>
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
                                            <select className="form-control" id="exampleFormControlSelect1" name="messageTemplateType" onChange={this.handleChange} >
                                                <option value="static">Static message</option>
                                                <option value="dynamic">Dynamic message</option>
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
                                            <textarea rows="5" className="form-control" type="text" name="messageTemplate" onChange={this.handleChange} required />
                                            <span className="mt-2">0 characters</span>
                                        </div>
                                        <button className="btn btn-sm btn-success mr-3" type="submit">
                                            Save
                                        </button>
                                        <button onClick={this.ViewAllSmsTemplates} className="btn btn-sm btn-danger">
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
