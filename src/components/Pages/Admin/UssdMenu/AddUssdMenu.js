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

class AddUssdMenu extends Component {

    state = {
        title: '',
        loadBy: '',
        menuHeader: '',
        type: '',
        nextType: '',
        dataSource: '',
        priority: '',
        itemDataUrl: '',
        itemDataMethod: '',
        parentId: 0,
        inputVariableName: '',
        apiVariableName: '',
        apiTitle: '',


        //errors
        titleError: '',
        typeError: '',
        dataSourceError: '',
        priorityError: '',
        itemDataUrlError: '',
        itemDataMethodError: '',
        parentIdError: '',

        //array
        ussdMenus: []

    }

    componentDidMount() {
            axios.get("/ussd-menus")
            .then(res => {
                const response = res.data;
                this.setState({ ussdMenus: response })
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
        let itemDataUrlError = '';
        let itemDataMethodError = '';
        let parentIdError = '';

        if (!this.state.title) {
            titleError = 'Title required';
        }

        if (!this.state.type) {
            typeError = 'Type required';
        }

        if (!this.state.dataSource) {
            dataSourceError = 'Data source  required';
        }

        if (!this.state.priority) {
            priorityError = 'Priority required';
        }

        if (!this.state.itemDataMethod) {
            itemDataMethodError = 'Data Method required';
        }

        //check for validation
        if (titleError || typeError || dataSourceError || priorityError || itemDataMethodError) {
            this.setState({ titleError, typeError, dataSourceError, priorityError, itemDataMethodError });
            return false;
        }
        return true;
    }

 
  
    onSubmit = e => {
        e.preventDefault();

        const isValid = this.validate();

        if (isValid) {
            //payload
            const payload = {
                title: this.state.title,
                loadBy: this.state.loadBy,
                menuHeader: this.state.menuHeader,
                type: this.state.type,
                nextType: this.state.nextType,
                dataSource: this.state.dataSource,
                priority: Number(this.state.priority),
                inputVariableName: this.state.inputVariableName,
                apiVariableName: this.state.apiVariableName,
                apiTitle: this.state.apiTitle,
                itemDataUrl: this.state.itemDataUrl,
                itemDataMethod: this.state.itemDataMethod,
                parentId: Number(this.state.parentId),
            };

            //loadBy
            if (this.state.loadBy === '')
                payload.loadBy = null
            else
                payload.loadBy = this.state.loadBy

            //type
            if (this.state.type === '')
                payload.type = null
            else
                payload.type = this.state.type

            //console log
            console.log(payload)

            //insert data
            axios.post("/api/v1/ussd-menus", JSON.stringify(payload))
                .then((res) => {
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
        let index = 0;
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Create New Ussd Menu
                        <small>Adding a new ussd menu.</small>
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
                                            <Label>Menu Header</Label>
                                            <input className="form-control"
                                                name="menuHeader"
                                                type="text"
                                                min="1"
                                                placeholder="Write menu header..."
                                                onChange={this.handleOnChange}
                                                value={this.state.menuHeader} />
                                            <span className="text-danger"></span>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Type <span className="red">*</span></Label>
                                            <select name="type" className="form-control" onChange={this.handleOnChange} value={this.state.type}>
                                                <option value="">-- Select --</option>
                                                <option value="SELECTION">SELECTION</option>
                                                <option value="INPUT">INPUT</option>
                                                <option value="END">END</option>
                                            </select>
                                            <span className="text-danger">{this.state.typeError}</span>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Next Type</Label>
                                            <select name="nextType" className="form-control" onChange={this.handleOnChange} value={this.state.nextType}>
                                                <option value="">-- Select --</option>
                                                <option value="LOCAL">LOCAL</option>
                                                <option value="REMOTE">REMOTE</option>
                                            </select>
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

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Priority <span className="red">*</span></Label>
                                            <input className="form-control"
                                                name="priority"
                                                type="number"
                                                min="1"
                                                placeholder="Write priority..."
                                                onChange={this.handleOnChange}
                                                value={this.state.priority} />
                                            <span className="text-danger">{this.state.priorityError}</span>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>URL </Label>
                                            <input className="form-control"
                                                name="itemDataUrl"
                                                type="text"
                                                placeholder="Write Url..."
                                                onChange={this.handleOnChange}
                                                value={this.state.itemDataUrl} />
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Load By</Label>
                                            <input className="form-control"
                                                name="loadBy"
                                                type="text"
                                                placeholder="Write load by..."
                                                onChange={this.handleOnChange}
                                                value={this.state.loadBy} />
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Method <span className="red">*</span></Label>
                                            <select name="itemDataMethod" className="form-control" onChange={this.handleOnChange} value={this.state.itemDataMethod}>
                                                <option value="">-- Select --</option>
                                                <option value="POST">POST</option>
                                                <option value="GET">GET</option>
                                            </select>
                                            <span className="text-danger">{this.state.itemDataMethodError}</span>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Input Variable Name</Label>
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

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>API Variable Name</Label>
                                            <input className="form-control"
                                                name="apiVariableName"
                                                type="text"
                                                min="1"
                                                placeholder="Write api variable name..."
                                                onChange={this.handleOnChange}
                                                value={this.state.apiVariableName} />
                                            <span className="text-danger"></span>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>API Title</Label>
                                            <input className="form-control"
                                                name="apiTitle"
                                                type="text"
                                                min="1"
                                                placeholder="Write api title..."
                                                onChange={this.handleOnChange}
                                                value={this.state.apiTitle} />
                                            <span className="text-danger"></span>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Parent ID  </Label>
                                            <select name="parentId" className="form-control" onChange={this.handleOnChange} value={this.state.parentId}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.ussdMenus.map((menu, index) => {
                                                        return <option key={index} value={menu.id}>{menu.title}</option>
                                                    })
                                                }
                                            </select>
                                            <span className="text-danger">{this.state.parentIdError}</span>
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

export default AddUssdMenu;
