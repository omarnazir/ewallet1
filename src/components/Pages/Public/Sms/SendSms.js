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
import axios from '../../../../services/axios';
import Moment from "moment";
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2"
const MySwal = withReactContent(Swal)


class SendSmsCompose extends Component {
    ViewDashboard = () => {
        return this.props.history.push('/user/dashboard')
    }

    state = {
        smsTemplateList: [],
        sendersList: [],
        contactLists: [],
        sendScheduled: 0,
        selectedMessageTemplate: '',
        selectedMessageTemplateId: 0,
        selectedSenderId: 0,
        activeTab: '1',
        campaign:"",
        senderId: 0,
        templateId: 0,
        recipientType: "file",
        contactListId: 0,
        numbers: "",
        file:"",
        isScheduled:0,
        scheduledTime:'',
        scheduleddate:''
    }

    formatDate = (date) => {
        return Moment(date).format('YYYY-MM-DD HH:mm:ss')
      }

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });

            if (tab == "1") {
                this.setState({ recipientType: "file" })
            }
            if (tab == "2") {
                this.setState({ recipientType: "numbers" })
            }
            if (tab == "3") {
                this.setState({ recipientType: "contactList" })
            }
        }
    }

    componentDidMount() {
        axios.get("/sms-request/me/approved")
            .then(res => {
                const response = res.data;
                this.setState({ smsTemplateList: response })
                console.log(response);
            })

        axios.get("/sender-ids/my-approved-sender-ids")
            .then(res => {
                const response = res.data;
                this.setState({ sendersList: response })
                console.log(response);
            })
        axios.get("/contact-lists/me")
            .then(res => {
                const response = res.data;
                this.setState({ contactLists: response })
                console.log(response);
            })
    }

    handleSubmit = event => {
        event.preventDefault()

        console.log("senderId " + this.state.senderId)
        console.log("templateId "+ this.state.selectedMessageTemplateId)
        console.log('recipientType '+ this.state.recipientType)
        console.log("contactListId "+ this.state.contactListId)
        console.log("numbers "+ this.state.numbers)
        console.log("file "+ this.state.file)
        console.log("ActiveTab "+ this.state.activeTab)
        console.log("SmsScheduled"+ this.state.sendScheduled)
        console.log("isScheduled"+ this.state.isScheduled)
        console.log("scheduledTime"+ this.state.scheduledTime)
        
        console.log("scheduledTime"+ this.formatDate(this.state.scheduledTime))
        const data = new FormData()
        data.append("campaign",this.state.campaign)
        data.append("senderId",this.state.senderId)
        data.append("templateId", this.state.selectedMessageTemplateId)
        data.append("recipientType", this.state.recipientType)
        data.append("contactListId", this.state.contactListId)
        data.append("numbers", this.state.numbers)
        if(this.state.recipientType=="file" || this.state.file!=undefined){
            data.append("file", this.state.file)
        }
        data.append("isScheduled ",this.state.isScheduled)
        data.append("scheduledTime",this.formatDate(this.state.scheduledTime))

        console.log("isScheduled: "+this.state.isScheduled)
        console.log("scheduledTime: "+this.formatDate(this.state.scheduledTime))

        axios.post("/sms/send-sms", data, { headers: { "Content-Type": "multipart/form-data" } })
        .then(res => {
            console.log(res);
            console.log(res.data);
            this.showSweetAlert();
            setTimeout(this.ViewDashboard,3000)
            // this.ViewDashboard();
        })
    }


    showSweetAlert() {
        return MySwal.fire({
            position: 'center',
            icon: 'success',
            title: 'SMS Sent Sucessfully',
            text: "",
            showConfirmButton: false,
            timer: 2000
        })
    }
    ViewDashboard = () => {
        return this.props.history.push('/dashboard')
    }

    onChangeSendingOptions = event => {
        if ([event.target.value] == "0") {
            this.setState({ sendScheduled: false })
            this.setState({isScheduled:0})
        } else {
            this.setState({ sendScheduled: true })
            this.setState({isScheduled:1})
        }
    }

    handleFileChange = event => {
        this.setState({ file: event.target.files[0] });
    }

    handleSmsTemplateChange = event => {
        const templateId = event.target.value
        const template = this.state.smsTemplateList.find(item => item.id == templateId);
        this.setState({ selectedMessageTemplate: template.messageTemplate })
        this.setState({ selectedMessageTemplateId: templateId })
    }

    onChangeSendingOptions = event => {
        if ([event.target.value] == "0") {
            this.setState({ sendScheduled: false })
            this.setState({isScheduled:0})
        } else {
            this.setState({ sendScheduled: true })
            this.setState({isScheduled:1})
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChangeDate = event => {
        console.log([event.target.value])
        this.setState({ scheduledTime: event.target.value });
    }

    handleSmsTemplateChange = event => {
        const templateId = event.target.value
        const template = this.state.smsTemplateList.find(item => item.id == templateId);
        this.setState({ selectedMessageTemplate: template.messageTemplate })
        this.setState({ selectedMessageTemplateId: template.id })
    }

    handleSenderIdChange = event => {
        
        const senderId = [event.target.value]
        console.log(senderId)
        const sender = this.state.sendersList.find(item => item.id == senderId);
        this.setState({ senderId:sender.id })
    }


    handlePhoneBookChange = event => {
        const contactListId = [event.target.value];
        const contact = this.state.contactLists.find(item => item.id == contactListId);
        this.setState({ contactListId:contact.id })
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
                                            <input className="form-control" name="campaign" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                        <div className="form-group">
                                            <label>Sender Id : </label>
                                            <select className="form-control" onChange={this.handleSenderIdChange}>
                                                <option key="0" value="0">Select a sender id</option>
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
                                                        <span className="fa fa-book mr-1"></span>
                                                Use Contact List
                                            </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={this.state.activeTab}>
                                                <TabPane tabId="1">
                                                    <div className="form-group px-md-2 px-1">
                                                        <label htmlFor="csvupload"><strong>Accepted files (CSV file or Excel document)</strong></label>
                                                        <input
                                                            accept="application/vnd.ms-excel, text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                                            type="file"
                                                            className="form-control-file"
                                                            name="file"
                                                            id="csvupload"
                                                            onChange={this.handleFileChange}
                                                             />
                                                        <p className="mt-2"><em>Note: These contacts will not be saved</em></p>
                                                        <p><a href="sample2.csv"> <i className="fa fa-download"></i> Download Sample</a></p>
                                                    </div>

                                                </TabPane>
                                                <TabPane tabId="2">  <textarea name="numbers" type="text" className="form-control rounded-0" rows="5" onChange={this.handleChange}></textarea>
                                                    <label className="mt-2">Please separate phone numbers with comma (,)</label></TabPane>
                                                <TabPane tabId="3">
                                                    <label htmlFor="exampleFormControlSelect2">Sender Id : </label>
                                                    <select className="form-control" id="exampleFormControlSelect2" onChange={this.handlePhoneBookChange}>
                                                        <option>Select a phonebook</option>
                                                        {this.state.contactLists.map(row => (
                                                            <option key={row.id} value={row.id} >
                                                                {row.title}  ({row.count} subscribers)
                                                            </option>
                                                        ))}
                                                    </select>
                                                </TabPane>

                                            </TabContent>
                                        </div>
                                        <div className="form-group">
                                            <label>Sms Template : </label>
                                            <select className="form-control" onChange={this.handleSmsTemplateChange}>
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
                                            <label htmlFor="exampleFormControlSelect4">Sending Options : </label>
                                            <select className="form-control" id="exampleFormControlSelect4" onChange={this.onChangeSendingOptions}>
                                                <option value="0">Now</option>
                                                <option value="1">Later</option>
                                            </select>
                                        </div>

                                        {this.state.sendScheduled ==1&&
                                            <FormGroup>
                                                <label>Scheduled Date:</label>
                                                <input className="form-control" name="scheduledTime" type="datetime-local" onChange={this.handleChangeDate}></input>
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
