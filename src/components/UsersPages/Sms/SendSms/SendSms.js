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
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,

} from "reactstrap";
import classnames from 'classnames';
import $ from "jquery";
import axios from '../../../../services/axios'


class SendSmsCompose extends Component {
    ViewDashboard = () => {
        return this.props.history.push('/user/dashboard')
    }

    state = {
        smsTemplateList: [],
        sendersList: [],
        contactLists: [],
        sendLater: false,
        selectedMessageTemplate: '',
        selectedMessageTemplateId: 0,
        selectedSenderId: 0,
        activeTab: 0,
        activeTab: '1',
    }

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    handleClickActiveTab = event => {
        const newActiveTab = event.target.tab;
        this.setState({
            activeTab: newActiveTab,
        })
    }


    componentDidMount() {
        axios.get("/sms-request")
            .then(res => {
                const response = res.data;
                this.setState({ smsTemplateList: response })
                // console.log(response);
            })

        axios.get("/sender-ids")
            .then(res => {
                const response = res.data;
                this.setState({ sendersList: response })
                console.log(response);
            })
        axios.get("/sms/contact-files")
            .then(res => {
                const response = res.data;
                this.setState({ contactLists: response })
                console.log(response);
            })
    }

    onChangeSendingOptions = event => {
        if ([event.target.value] == "Now") {
            this.setState({ sendLater: false })
        } else {
            this.setState({ sendLater: true })
        }
    }

    handleSmsTemplateChange = event => {
        const templateId = event.target.value
        const template = this.state.smsTemplateList.find(item => item.id == templateId);
        this.setState({ selectedMessageTemplate: template.messageTemplate })
        this.setState({ selectedMessageTemplateId: templateId })
    }

    handleSenderIdChange = event => {
        const senderId = event.target.value;
        const sender = this.state.sendersList.find(item => item.id == senderId);
        this.setState({ selectedSenderId: sender.id })
    }

    onChangeSendingOptions = event => {
        if ([event.target.value] == "Now") {
            this.setState({ sendLater: false })
        } else {
            this.setState({ sendLater: true })
        }
    }

    handleSmsTemplateChange = event => {
        const templateId = event.target.value
        const template = this.state.smsTemplateList.find(item => item.id == templateId);
        this.setState({ selectedMessageTemplate: template.messageTemplate })
        this.setState({ selectedMessageTemplateId: templateId })
    }

    handleSenderIdChange = event => {
        const senderId = event.target.value;
        const sender = this.state.sendersList.find(item => item.id == senderId);
        this.setState({ selectedSenderId: sender.id })
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
                                            <select className="form-control" id="exampleFormControlSelect1" onChange={this.handleSenderIdChange}>
                                                <option>Select a sender id</option>
                                                {this.state.sendersList.map(row => (
                                                    <option key={row.id} value={row.id} >
                                                        {row.senderId}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div role="tabpanel">
                                            {/* Nav tabs */}
                                            <Nav tabs>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab === '1' })}
                                                        onClick={() => { this.toggleTab('1'); }}>
                                                        <span className="fa fa-file mr-1"></span>
                                             Upload Contacts
                                            </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab === '2' })}
                                                        onClick={() => { this.toggleTab('2'); }}>
                                                        <span className="fa fa-edit mr-1"></span>
                                              Enter Numbers
                                            </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab === '3' })}
                                                        onClick={() => { this.toggleTab('3'); }}>
                                                        <span className="fa fa-book"></span>
                                                Use Contact List
                                            </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={this.state.activeTab}>
                                                <TabPane tabId="1">
                                                    <div className="form-group px-md-2 px-1">
                                                        <label for="csvupload"><strong>Accepted files (CSV file or Excel document)</strong></label>
                                                        <input
                                                            accept="application/vnd.ms-excel, text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                                            type="file"
                                                            className="form-control-file"
                                                            name="csvupload"
                                                            id="csvupload" />
                                                        <p className="mt-2"><em>Note: These contacts will not be saved</em></p>
                                                        <p><a href="sample2.csv"> <i className="fa fa-download"></i> Download Sample</a></p>
                                                    </div>

                                                </TabPane>
                                                <TabPane tabId="2">  <textarea name="phone_number" type="number" className="form-control rounded-0" rows="5"></textarea>
                                                    <label className="mt-2">Please separate phone numbers with comma (,)</label></TabPane>
                                                <TabPane tabId="3">
                                                <label htmlFor="exampleFormControlSelect1">Sender Id : </label>
                                            <select className="form-control" id="exampleFormControlSelect1">
                                                <option>Select a phonebook</option>
                                                {this.state.contactLists.map(row => (
                                                    <option key={row.name} value={row.name} >
                                                        {row.name}
                                                    </option>
                                                ))}
                                            </select>
                                                </TabPane>

                                            </TabContent>
                                        </div>
                                        {/* <FormGroup>
                                            <label>Recipients :</label>
                                            <input className="form-control" type="email" name="email" onChange={this.handleChange} required></input>
                                        </FormGroup> */}

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect11">Sms Template : </label>
                                            <select className="form-control" id="exampleFormControlSelect11" onChange={this.handleSmsTemplateChange}>
                                                <option>Select a template</option>
                                                {this.state.smsTemplateList.map(row => (
                                                    <option key={row.id} value={row.id}>
                                                        {row.messageTemplate}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <FormGroup>
                                            <label>Template preview :</label>
                                            <textarea rows="8" className="form-control" name="password" type="text" value={this.state.selectedMessageTemplate} disabled></textarea>
                                        </FormGroup>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Sending Options : </label>
                                            <select className="form-control" id="exampleFormControlSelect1" onChange={this.onChangeSendingOptions}>
                                                <option value="Now">Now</option>
                                                <option value="Later">Later</option>
                                            </select>
                                        </div>

                                        {this.state.sendLater &&
                                            <FormGroup>
                                                <label>Scheduled Date:</label>
                                                <input className="form-control" name="date" type="datetime-local" onChange={this.handleChange}></input>
                                            </FormGroup>
                                        }
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
