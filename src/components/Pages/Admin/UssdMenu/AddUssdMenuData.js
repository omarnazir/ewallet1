import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import {
    Container,
    Card,
    CardBody,
    Button,
    FormGroup,
    Row,
    Col,
    CardFooter,
    Label
} from "reactstrap";

import axios from '../../../../services/axios'
import {SuccessAlert} from "../../../Common/AppAlerts";

class AddUssdMenuData extends Component {

    state = {
        id:0,
        name: '',
        value:'',
        priority: 1,
        role:'',
        nextPageId:'',

        //errors
        nameError: '',
        valueError:'',
        priorityError: '',
        roleError:'',
        nextPageIdError:'',

        //array
        ussdMenus: []

    }

    componentDidMount() {
        const { state } = this.props.history.location;
        console.log(state)
        this.setState({id:state})
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
        let nameError = '';
        let valueError='';
        let priorityError = '';
        let roleError='';
        let nextPageIdError='';

        if (!this.state.name) {
            nameError = 'Name is required';
        }

        if (!this.state.value) {
            valueError = 'Value is required';
        }

        if (!this.state.priority) {
            priorityError = 'Priority is required';
        }

        if (!this.state.role) {
            roleError = 'Role is required';
        }

        if (!this.state.nextPageId) {
            nextPageIdError = 'Next Page is required';
        }
        //check for validation
        if (nameError || valueError  || priorityError||roleError || nextPageIdError ) {
            this.setState({ nameError, valueError, priorityError,roleError,nextPageIdError });
            return false;
        }
        return true;
    }



    onSubmit = e => {
        e.preventDefault();

        const isValid = this.validate();

        if (isValid) {
        
            //PageId from above
            const payload ={
                name: this.state.name,
                value: this.state.value,
                pageId: this.state.id, 
                priority: this.state.priority,
                nextPageId: this.state.nextPageId,
                role:this.state.role
            }

            console.log(payload)

            //insert data

            axios.post("/ussd-menu-data", payload)
                .then((res) => {
                    SuccessAlert("Added Ussd Menu Data Successfully");
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
        return this.props.history.push('/admin-ussd-details/'+this.state.id)
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
                        Create New Ussd Menu Data
                        <small>Adding a new ussd menu data.</small>
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
                                            <label>Name <span className="red">*</span></label>
                                            <input placeholder="Write name ..."
                                                name="name"
                                                className="form-control"
                                                onChange={this.handleOnChange}
                                                value={this.state.name} />
                                            <span className="text-danger">{this.state.nameError}</span>
                                        </div>
                                    </Col>


                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Value </Label>
                                            <input className="form-control"
                                                name="value"
                                                type="text"
                                                placeholder="Write Value..."
                                                onChange={this.handleOnChange}
                                                value={this.state.value} />
                                                <span className="text-danger">{this.state.valueError}</span>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Priority <span className="red">*</span></Label>
                                            <input className="form-control"
                                                name="priority"
                                                type="number"
                                                placeholder="Write Priority level..."
                                                onChange={this.handleOnChange}
                                                value={this.state.priority} />
                                            <span className="text-danger">{this.state.priorityError}</span>
                                        </FormGroup>
                                    </Col>


                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Next PageID  </Label>
                                            <select name="nextPageId" className="form-control" onChange={this.handleOnChange} value={this.state.nextPageId}>
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
                                    <Col md={8}>
                                        <FormGroup>
                                            <Label>Role</Label>
                                            <input className="form-control"
                                                name="role"
                                                type="text"
                                                placeholder="Write Role..."
                                                onChange={this.handleOnChange}
                                                value={this.state.role} />
                                                 <span className="text-danger">{this.state.roleError}</span>
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

export default AddUssdMenuData;
