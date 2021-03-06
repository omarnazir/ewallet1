import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios"
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



class AddUserRequestedSms extends Component {

    state = {
        messageTemplate: '',
        messageTemplateType: '',
        showDynamicSmsField: false,
        messageTemplateLength: 0,
        currentPosition:0
    };

    handleOnSelectChange = event => {

        if ([event.target.value] == "dynamic") {
            this.setState({ showDynamicSmsField: true })
            this.setState({ messageTemplateType: "dynamic" })
        } else {
            this.setState({ showDynamicSmsField: false })
            this.setState({ messageTemplateType: "static" })
        }
        this.setState({ [event.target.name]: event.target.value });
    }

    handleOnColumnChange= event =>{

        const currentPosition=this.state.currentPosition;
        const currentTemplate=this.state.messageTemplate;
        const valueToInsert=event.target.value;
        const finalTemplate=currentTemplate.slice(0,currentPosition)+valueToInsert+currentTemplate.slice(currentPosition);
        this.setState({messageTemplate:finalTemplate})
        this.setState({ messageTemplateLength: finalTemplate.length })

        // const value=this.state.messageTemplate+event.target.value;
        // this.setState({messageTemplate:value})
    }


    handleSubmit = (event) => {
        event.preventDefault();

        const smsTemplate = {
            "messageTemplate": this.state.messageTemplate, 
            "recipientTab": this.state.messageTemplateType,
        }
        console.log(smsTemplate)

        axios.post("/sms-request", smsTemplate).then(res => {
            console.log(res);
            console.log(res.data);
            this.ViewAllSmsTemplates();
        })
    }



    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        const message = event.target.value;
        this.setState({currentPosition:event.target.selectionStart})
        this.setState({ messageTemplateLength: message.length })
    }

    ViewAllSmsTemplates = () => {
        return this.props.history.push('/sms-requests')
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
                        Add Sms Template
                     <small>Adding a new sms template</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllSmsTemplates} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Sms Templates</Button>
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
                                            <select className="form-control" id="exampleFormControlSelect1" name="messageTemplateType" onChange={this.handleOnSelectChange} >
                                                <option value="static">Static message</option>
                                                <option value="dynamic">Dynamic message</option>
                                            </select>
                                        </div>
                                        {this.state.showDynamicSmsField &&
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlSelect1">Dynamic sms field: </label>
                                                <select className="form-control" id="exampleFormControlSelect1" onChange={this.handleOnColumnChange}>
                                                    <option>Insert field</option>
                                                    <option value=" {ColumnB} ">Column B</option>
                                                    <option value=" {ColumnC} ">Column C</option>
                                                    <option value=" {ColumnD} ">Column D</option>
                                                    <option value=" {ColumnE} ">Column E</option>
                                                    <option value=" {ColumnF} ">Column F</option>
                                                   
                                                </select>
                                            </div>}
                                        <div className="form-group">
                                            <label>Message : </label>
                                            <textarea rows="8" className="form-control mb-2" type="text" name="messageTemplate" value={this.state.messageTemplate}
                                                onChange={this.handleChange} required/>
                                            <span className="mt-2"><span className="text-danger">{this.state.messageTemplateLength}</span> <strong>characters</strong></span>
                                            <span className="mt-2 float-right">160 characters = 1 SMS</span>
                                        </div>
                                        <button className="btn btn-sm btn-success mr-3 px-5" type="submit">
                                            Save
                                        </button>
                                        <button onClick={this.ViewAllSmsTemplates} className="btn btn-sm btn-danger px-5">
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

export default AddUserRequestedSms;
