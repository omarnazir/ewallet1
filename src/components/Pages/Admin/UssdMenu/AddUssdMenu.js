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
        formRegister: {
            email: '',
            password: '',
            password2: '',
            terms: false,
            fullname: "",
            username: "",
            phonenumber: "",
            monthlysmslimit: 0,
            settings: false,
            accountExpiration: ""

        },
        rolesList: [],
        description: "",
        selectedRoleList: [],
        role: "",
        roleId: 0,
        roleDescription: "",
        ussdMenus: []

    }

    componentDidMount() {
        axios.get("/roles")
            .then(res => {
                const response = res.data;
                this.setState({ rolesList: response })
            })
    }
    validateOnChange = event => {
        const input = event.target;
        const form = input.form
        const value = input.type === 'checkbox' ? input.checked : input.value;

        const result = FormValidator.validate(input);

        if (result != null) {
            this.setState({
                [form.name]: {
                    ...this.state[form.name],
                    [input.name]: value,
                    errors: {
                        ...this.state[form.name].errors,
                        [input.name]: result
                    }
                }
            });
        }
    }

    handleSubmit = event => {
        this.toggleModal();
        event.preventDefault()

        console.log(event.target.value)
        const roleId = this.state.roleId;
        const role = this.state.rolesList.find(item => item.id == roleId);
        const found = this.state.selectedRoleList.find((row) => row.id == roleId);

        if (found == undefined) {
            const selectedRoleList = [...this.state.selectedRoleList, role]
            this.setState({ selectedRoleList })
        }
        console.log(this.state.roleId)
        console.log(this.state.role)
        console.log(this.state.description)

    }

    DeleteUserRole = (id) => {
        const role = this.state.rolesList.find(item => item.id == id);
        const selectedRoleList = this.state.selectedRoleList.filter(row => row.id != role.id)
        this.setState({ selectedRoleList })

    }
    handleChange = event => {
        console.log("am hree")
        this.setState({ [event.target.name]: event.target.value });
    }
    formatDate = (date) => {
        //07/19/2021 10:49:10
        // YYYY-MM-DD HH:mm:ss
        return Moment(date).format('MM/DD/YYYY HH:mm:ss')
    }


    onSubmit = e => {
        e.preventDefault()
        const form = e.target;
        const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT'].includes(i.nodeName))

        const { errors, hasError } = FormValidator.bulkValidate(inputs)

        this.setState({
            [form.name]: {
                ...this.state[form.name],
                errors
            }
        });

        console.log(hasError ? 'Form has errors. Check!' : 'Form Submitted!')

        console.log(this.state.selectedRoleList)


        const UserRoles = [];
        this.state.selectedRoleList.forEach(item => {
            const newItem = { role_id: item.id }
            UserRoles.push(newItem)
        });


        if (!hasError) {
            const accountExpiration = this.formatDate(this.state.formRegister.accountExpiration);
            const User = {
                "username": this.state.formRegister.username,
                "email": this.state.formRegister.email,
                "password": this.state.formRegister.password,
                "name": this.state.formRegister.fullname,
                "msisdn": this.state.formRegister.phonenumber,
                "userMonthlySmsLimit": this.state.formRegister.monthlysmslimit,
                "accountExpiration": accountExpiration
            }

            console.log(this.formatDate(this.state.formRegister.accountExpiration))
            console.log(User)

            const data = { user: User, role_ids: UserRoles }
            console.log(data)


            axios.post("users/admin", data).then(res => {
                console.log(res);
                console.log(res.data);
                this.ViewUserPage();
            })
        }
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleSmsTemplateChange = event => {
        const templateId = event.target.value
        const template = this.state.rolesList.find(item => item.id == templateId);
        this.setState({ role: template.name })
        this.setState({ description: template.description })
        this.setState({ roleId: template.id })
    }


    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method]
    }

    ViewAllUssdMenus = () => {
        return this.props.history.push('/admin-ussd-menu')
    }

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

    ViewUserPage = () => {
        return this.props.history.push("/admin-ussd-menu");
    };

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
                <Card className="card-default">
                        <CardBody>
                            <form className="mb-3" onSubmit={this.onSubmit}>
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

                                {/* <Row>
                                    <Col md={12}>
                                        <div className="form-group">
                                            <button className="btn btn-primary mr-2">Save</button>
                                            <a href="/ussd-menu" className="btn btn-danger">Cancel</a>
                                        </div>
                                    </Col>
                                </Row> */}
                            </form>
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
                </Container>
            </ContentWrapper>
        );
    }
}

export default AddUssdMenu;
