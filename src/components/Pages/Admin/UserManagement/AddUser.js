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
    Input, CardFooter,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import $ from "jquery";

import FormValidator from '../../../Common/FormValidator';
import axios from '../../../../services/axios'
import Moment from "moment";

class AddUser extends Component {

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
            accountExpiration:""

        },
        rolesList: [],
        description: "",
        selectedRoleList: [],
        role: "",
        roleId: 0,
        roleDescription: ""
    }

    componentDidMount() {
        axios.get("/roles")
            .then(res => {
                const response = res.data;
                this.setState({ rolesList: response })
            })

        console.log(this.state.rolesList)
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
            const accountExpiration=this.formatDate(this.state.formRegister.accountExpiration);
            const User = {
                "username": this.state.formRegister.username,
                "email": this.state.formRegister.email,
                "password": this.state.formRegister.password,
                "name": this.state.formRegister.fullname,
                "msisdn": this.state.formRegister.phonenumber,
                "accountExpiration":accountExpiration
            }

            console.log(this.formatDate(this.state.formRegister.accountExpiration))
            console.log(User)

            const data = { user:User,role_ids:UserRoles }
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

    ViewAllAdminUsers = () => {
        return this.props.history.push('/admin-manage-users')
    }

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

    ViewUserPage = () => {
        return this.props.history.push("/admin-manage-users");
    };

    render() {
        let index = 0;
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Create Admin User
                     <small>Adding a new user.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.toggleModal} style={this.AddActionButtonStyle} className="btn-pill-right mr-2"><span className="fa fa-key mr-2"></span> Add Role</Button>
                        <Button onClick={this.ViewAllAdminUsers} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Users</Button>
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Add Role : </ModalHeader>
                            <form onSubmit={this.handleSubmit}>
                                <ModalBody>

                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect1">Select Role: </label>
                                        <select className="form-control" id="exampleFormControlSelect1" name="role"
                                            onChange={this.handleSmsTemplateChange}
                                            value={this.state.handleChange}
                                        >
                                            <option >Select role</option>
                                            {this.state.rolesList.map(row => (
                                                <option key={row.id} value={row.id}>
                                                    {row.name}
                                                </option>
                                            ))}

                                        </select>
                                    </div>
                                    <FormGroup>
                                        <label>Description :</label>
                                        <textarea col="5" className="form-control" name="description" value={this.state.description}
                                            type="text" disabled></textarea>
                                    </FormGroup>


                                </ModalBody>
                                <ModalFooter>
                                    <button className="btn btn-sm btn-success mr-3  px-5" type="submit">
                                        Add Role
                    </button>
                                </ModalFooter>
                            </form>
                        </Modal>

                    </div>
                </div>
                <Container fluid>
                    <div className="row">
                        <div className="col-md-12">
                            <form onSubmit={this.onSubmit} name="formRegister" action="">
                                <Card className="card-default">
                                    <CardBody>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Full Name *:</label>
                                                    <Input type="text"
                                                        name="fullname"
                                                        invalid={this.hasError('formRegister', 'fullname', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formRegister.fullname}

                                                    />
                                                    <span className="invalid-feedback">Field is required</span>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Username *:</label>
                                                    <Input type="text"
                                                        name="username"
                                                        invalid={this.hasError('formRegister', 'username', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formRegister.username} />
                                                    <span className="invalid-feedback">Field is required</span>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Email Address *</label>
                                                    <Input type="email"
                                                        name="email"
                                                        invalid={this.hasError('formRegister', 'email', 'required') || this.hasError('formRegister', 'email', 'email')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required", "email"]'
                                                        value={this.state.formRegister.email} />
                                                    {this.hasError('formRegister', 'email', 'email') && <span className="invalid-feedback">Field must be valid email</span>}
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Phone Number * :</label>
                                                    <Input type="number"
                                                        name="phonenumber"
                                                        invalid={this.hasError('formRegister', 'phonenumber', 'minlen')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required","minlen"]'
                                                        value={this.state.formRegister.phonenumber}
                                                        data-param="10" />
                                                    {/* <span className="invalid-feedback">Field is required</span> */}
                                                    <span className="invalid-feedback">Valid phone number is required</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Password *</label>
                                                    <Input type="password"
                                                        id="id-password"
                                                        name="password"
                                                        invalid={this.hasError('formRegister', 'password', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formRegister.password}
                                                    />
                                                    <span className="invalid-feedback">Password is required</span>
                                                    <span className="text-center  invalid-feedback"><strong>NOTE: &nbsp;</strong>Must contain at least one upper and one lower letter, one special character and number</span>

                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Confirm Password *</label>
                                                    <Input type="password" name="password2"
                                                        invalid={this.hasError('formRegister', 'password2', 'equalto')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["equalto"]'
                                                        value={this.state.formRegister.password2}
                                                        data-param="id-password"
                                                    />
                                                    <span className="invalid-feedback">Passwords must match</span>
                                                </div>
                                            </div>

                                            {/* <span className="text-center ml-3"><strong>NOTE: &nbsp;</strong>Must contain at least one upper and one lower letter, one special character and number</span> */}


                                        </div>


                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Account Expiration *</label>
                                                    <Input 
                                                        name="accountExpiration"
                                                        type="date"
                                                        invalid={this.hasError('formRegister', 'accountExpiration', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formRegister.accountExpiration}
                                                    />
                                                    <span className="invalid-feedback">Account expiration is required</span>
                                                  

                                                </div>
                                            </div>
                                            </div>

                                        {/* <input className="form-control" name="scheduledTime" type="datetime-local" onChange={this.handleChangeDate}></input> */}


                                        <table className="table table-striped my-4 w-100">
                                            <thead>
                                                <tr>
                                                    <th data-priority="1">ID</th>
                                                    <th>ROLE NAME</th>
                                                    <th>DESCRIPTION</th>
                                                    <th>ACTIONS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.selectedRoleList.map(row => (
                                                    <tr key={row.id}>
                                                        <td>{index += 1}</td>
                                                        <td>{row.name}</td>
                                                        <td>{row.description}</td>
                                                        <td>
                                                            <span className="btn bg-danger-dark" onClick={() => this.DeleteUserRole(row.id)}>
                                                                <i className="icon-trash mr-2"></i>
                                                                     Delete</span>
                                                        </td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>


                                    </CardBody>
                                    <CardFooter>
                                        <div className="d-flex align-items-center">
                                            <div className="ml-auto">
                                                <button className="btn btn-danger px-5 mr-2" onClick={this.ViewUserPage}>Cancel</button>
                                                <button type="submit" style={this.AddActionButtonStyle} className="btn btn-primary px-5">Save</button>
                                            </div>
                                        </div>
                                    </CardFooter>


                                </Card>

                            </form>
                        </div>
                    </div>
                </Container>
            </ContentWrapper>
        );
    }
}

export default AddUser;
