import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import { Link, Redirect } from 'react-router-dom';
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    Button,
    FormGroup,
    Row,
    Col,
    Input, CardFooter,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label
} from "reactstrap";
import $ from "jquery";

import FormValidator from '../../../Common/FormValidator';
import axios from '../../../../services/axios'
import Moment from "moment";
import {SuccessAlert,DeleteAlert} from "../../../Common/AppAlerts";

class EditUssdMenu extends Component {

    state = {
        id:0,


        title: '',
        loadBy: '',
        menuHeader: '',
        type: '',
        nextType: '',
        dataSource: '',
        priority: 1,
        remoteUrl: '',
        parentId: 0,
        inputVariableName: '',
        apiVariableName: '',
        apiTitle: '',
        actionUrl:'',


        //errors
        titleError: '',
        typeError: '',
        dataSourceError: '',
        priorityError: '',
        remoteUrlError: '',
        parentIdError: '',
        loadyByError:'',

        //array
        ussdMenus: []

    }

    componentDidMount() {

        const { state } = this.props.history.location;
        console.log(state)
        if (state == undefined) {
            return this.props.history.push('/admin-ussd-menu')
        }
        this.setState({id:state})


        axios.get("/ussd-menus/"+state)
            .then(res => {
                console.log(res.data);
                this.setState({title:res.data.title})
                this.setState({type:res.data.pageType})
                this.setState({dataSource:res.data.dataSource})
                this.setState({remoteUrl:res.data.remoteUrl})
                this.setState({loadBy:res.data.loadBy})
                this.setState({priority:res.data.pageLevel})
                this.setState({parentId:res.data.nextPageId})
                this.setState({inputVariableName:res.data.variableName})
                this.setState({actionUrl:res.data.actionUrl})
                // this.setState({})
                // this.setState({ ussdMenus: response })
            })

            this.getAllUssdMenu();
    }


    getAllUssdMenu(){
        return axios.get("/ussd-menus").then(res => {
          this.setState({loading:false})
          this.setState({ ussdMenus: res.data })
        })
    }

    handleOnChange = (e) => {
        const input = e.target;
        const name = input.name
        const value = input.type === 'checkbox' ? input.checked : input.value;

        //set state
        this.setState({ [name]: value });
    }



    //validate
    validate = () => {
        let titleError = '';
        let typeError = '';
        let dataSourceError = '';
        let priorityError = '';
        let remoteUrlError = '';
        let parentIdError = '';
        let loadyByError='';

        if (!this.state.title) {
            titleError = 'Title is required';
        }
        if (!this.state.loadBy) {
            loadyByError = 'Load by is required';
        }

        if (!this.state.title) {
            titleError = 'Title is required';
        }

        if (!this.state.type) {
            typeError = 'Type is required';
        }

        if (!this.state.dataSource) {
            dataSourceError = 'Data source is required';
        }

        if (!this.state.priority) {
            priorityError = 'Page Level is required';
        }

    

        //check for validation
        if (titleError || typeError || dataSourceError || priorityError||loadyByError ) {
            this.setState({ titleError, typeError, dataSourceError, priorityError,loadyByError });
            return false;
        }
        return true;
    }



    onSubmit = e => {
        e.preventDefault();

        const isValid = this.validate();

        if (isValid) {
            //payload
            // const payload = {
            //     title: this.state.title,
            //     loadBy: this.state.loadBy,
            //     menuHeader: this.state.menuHeader,
            //     type: this.state.type,
            //     nextType: this.state.nextType,
            //     dataSource: this.state.dataSource,
            //     priority: Number(this.state.priority),
            //     inputVariableName: this.state.inputVariableName,
            //     apiVariableName: this.state.apiVariableName,
            //     apiTitle: this.state.apiTitle,
            //     remoteUrl: this.state.remoteUrl,
            //     parentId: Number(this.state.parentId),
            // };

            const payload=
                {
                    id:this.state.id,
                    title: this.state.title,
                    pageType: this.state.type, 
                    dataSource:this.state.dataSource, 
                    remoteUrl: this.state.remoteUrl,
                    loadBy: this.state.loadBy, 
                    pageLevel: this.state.priority, 
                    nextPageId:this.state.parentId, 
                    variableName: this.state.inputVariableName, 
                    actionUrl: this.state.actionUrl 
                }
            

            // //loadBy
            // if (this.state.loadBy === '')
            //     payload.loadBy = 
            // else
            //     payload.loadBy = this.state.loadBy

            //type
            // if (this.state.type === '')
            //     payload.type = null
            // else
            //     payload.type = this.state.type

            //console log
            console.log(payload)

            //insert data

            axios.put("/ussd-menus", payload)
                .then((res) => {
                    SuccessAlert("Updated Ussd Menu Successfully");
                    this.ViewAllUssdMenus();
                })
                .catch((err) => {
                    console.log(err);
                });


            //clear form
            this.setState({})
        }
    }




    ViewAllUssdMenus = () => {
        return this.props.history.push('/admin-ussd-menu')
    }

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Edit Ussd Menu
                       <small>Updating ussd menu</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllUssdMenus} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Ussd Menu's</Button>
                    </div>
                </div>
                <Container fluid>
                    <form className="mb-3" onSubmit={this.onSubmit}>
                        <Card className="card-default">
                            <CardBody>

                                <Row>
                                    <Col md={4}>
                                        <div className="form-group">
                                            <label> Title <span className="red">*</span></label>
                                            <input placeholder="Write title ..."
                                                name="title"
                                                className="form-control"
                                                onChange={this.handleOnChange}
                                                value={this.state.title} />
                                            <span className="text-danger">{this.state.titleError}</span>
                                        </div>
                                    </Col>


                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Page Type <span className="red">*</span></Label>
                                            <select name="type" className="form-control" onChange={this.handleOnChange} value={this.state.type}>
                                                <option value="">-- Select --</option>
                                                <option value="SELECTION">SELECTION</option>
                                                <option value="INPUT">INPUT</option>
                                                <option value="END">END</option>
                                                <option value="CONFIRM">CONFIRM</option>
                                                <option value="END-NO-ACTION">END-NO-ACTION</option>
                                            </select>
                                            <span className="text-danger">{this.state.typeError}</span>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Data Source <span className="red">*</span></Label>
                                            <select name="dataSource" className="form-control" onChange={this.handleOnChange} value={this.state.dataSource}>
                                                <option value="">-- Select --</option>
                                                <option value="LOCAL">LOCAL</option>
                                                <option value="REMOTE">REMOTE</option>
                                            </select>
                                            <span className="text-danger">{this.state.dataSourceError}</span>
                                        </FormGroup>
                                    </Col>

                                    <Col md={8}>
                                        <FormGroup>
                                            <Label>Remote URL </Label>
                                            <input className="form-control"
                                                name="remoteUrl"
                                                type="text"
                                                placeholder="Write Url..."
                                                onChange={this.handleOnChange}
                                                value={this.state.remoteUrl} />
                                        </FormGroup>
                                    </Col>


                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Load By <span className="red">*</span></Label>
                                            <select name="loadBy" className="form-control" onChange={this.handleOnChange} value={this.state.loadBy}>
                                                <option value="">-- Select --</option>
                                                <option value="0">NONE</option>
                                                <option value="id">ID</option>
                                                <option value="all">ALL</option>
                                                <option value="msisdn">MSISDN</option>
                                                <option value="amcos">AMCOS</option>
                                                <option value="crop">CROP</option>
                                            </select>
                                            <span className="text-danger">{this.state.loadyByError}</span>

                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Page Level <span className="red">*</span></Label>
                                            <input className="form-control"
                                                name="priority"
                                                type="number"
                                                placeholder="Write page level..."
                                                onChange={this.handleOnChange}
                                                value={this.state.priority} />
                                            <span className="text-danger">{this.state.priorityError}</span>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Next PageID  </Label>
                                            <select name="parentId" className="form-control" onChange={this.handleOnChange} value={this.state.parentId}>
                                                <option value="">-- Select --</option>
                                                <option value="0">NONE</option>
                                                {
                                                    this.state.ussdMenus.map((menu, index) => {
                                                        return <option key={index} value={menu.id}>{menu.title}</option>
                                                    })
                                                }
                                            </select>
                                            <span className="text-danger">{this.state.parentIdError}</span>
                                        </FormGroup>
                                    </Col>


                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Variable Name</Label>
                                            <input className="form-control"
                                                name="inputVariableName"
                                                type="text"
                                                min="1"
                                                placeholder="Write input variable name..."
                                                onChange={this.handleOnChange}
                                                value={this.state.inputVariableName} />
                                            <span className="text-danger"></span>
                                        </FormGroup>
                                    </Col>


                                    <Col md={12}>
                                        <FormGroup>
                                            <Label>Action URL</Label>
                                            <input className="form-control"
                                                name="actionUrl"
                                                type="text"
                                                min="1"
                                                placeholder="Write action url..."
                                                onChange={this.handleOnChange}
                                                value={this.state.actionUrl} />
                                            <span className="text-danger"></span>
                                        </FormGroup>
                                    </Col>
                                </Row>



                            </CardBody>
                            <CardFooter>
                                <div className="d-flex align-items-center">
                                    <div className="ml-auto">
                                        <button className="btn btn-danger px-5 mr-2" onClick={this.ViewAllUssdMenus}>Cancel</button>
                                        <button type="submit" style={this.AddActionButtonStyle} className="btn btn-primary px-5">Save</button>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </form>
                </Container>
            </ContentWrapper>
        );
    }
}

export default EditUssdMenu;