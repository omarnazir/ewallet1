import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import { Link, Redirect } from 'react-router-dom';
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    InputGroup,
    InputGroupAddon,
    Button,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row, Col, Input, CardFooter, CustomInput
} from "reactstrap";
import $ from "jquery";
import Swal from "sweetalert2"
const MySwal = withReactContent(Swal)
import withReactContent from 'sweetalert2-react-content'
import FormValidator from '../../../Common/FormValidator';
import axios from '../../../../services/axios'

class EditAdminUser extends Component {


    state = {
        formRegister: {
            id:0,
            fullname: "",
            username: "",
            phoneNumber: "",
            monthlysmslimit: 0,
            status: "",
            email:"",
        },
        passwordReset: {
            userId: "",
            newPassword: "",
            newPassword2: ""
        },
        user: {},
        selectedRoleList: [],
        roles: [],
        rolesList: [],
        passwordModal: false,
        id:0
    }
    componentDidMount() {
        const { state } = this.props.history.location;
        console.log(state)
        if (state == undefined) {
            return this.props.history.push('/admin-customers-list/')
        }

        let url = "";
        if (state.roleName == "ADMIN") {
            url = "/roles/admin";
        }
        else if (state.roleName == "CUSTOMER_ADMIN") {
            url = "roles/customer-admin";
        }
        else {
            url = "roles/user";
        }
        this.setState({...this.state.passwordReset,userId:state.id})
        this.setState({id:state.id})
        axios.get(url)
            .then(res => {
                const response = res.data;
                this.setState({ rolesList: response })
            })
            this.setState({
                formRegister: Object.assign({}, this.state.formRegister, {
                    id: state.id,
                }),
            });
        axios.get("/users/" + state.id)
            .then(res => {
                const user = res.data;

                // [form.name]: {
                //     ...this.state[form.name],
                //     [input.name]: value,

                // this.setState({formRegister:{...this.state.formRegister,}})
                this.setState({ ...this.state.formRegister, fullname: user.name })
              
                // this.setState({
                //     passwordReset:Object.assign({},this.state.passwordReset,{
                //         userId:user.id
                //     })
                // })

                this.setState({
                    formRegister: Object.assign({}, this.state.formRegister, {
                        fullname: user.name,
                    }),
                });
                this.setState({
                    formRegister: Object.assign({}, this.state.formRegister, {
                        email: user.email,
                    }),
                });
                this.setState({
                    formRegister: Object.assign({}, this.state.formRegister, {
                        phoneNumber: user.phoneNumber,
                    }),
                });
                this.setState({
                    formRegister: Object.assign({}, this.state.formRegister, {
                        username: user.username,
                    }),
                }); this.setState({
                    formRegister: Object.assign({}, this.state.formRegister, {
                        status: user.status,
                    }),
                }); this.setState({
                    formRegister: Object.assign({}, this.state.formRegister, {
                        monthlysmslimit: user.userMonthlySmsLimit,
                    }),
                });

                const roles = res.data.roles;
                this.setState({ roles })
                this.setState({ user })
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


    ViewUserPage = () => {
        return this.props.history.push("/admin-manage-users");
    };

    handleChange = event => {
        this.setState({
            passwordReset: Object.assign({},
                this.state.passwordReset, { [event.target.name]: event.target.value })
        })
    }

    handleSmsTemplateChange = event => {
        const templateId = event.target.value
        const template = this.state.rolesList.find(item => item.id == templateId);
        this.setState({ role: template.name })
        this.setState({ description: template.description })
        this.setState({ roleId: template.id })
    }


    handleSubmit = event => {
        this.toggleModal();
        event.preventDefault()

        console.log(event.target.value)
        const roleId = this.state.roleId;
        const role = this.state.rolesList.find(item => item.id == roleId);
        const found = this.state.roles.find((row) => row.id == roleId);

        if (found == undefined) {
            const selectedRoleList = [...this.state.roles, role]
            this.setState({ roles: selectedRoleList })
        }
        console.log(this.state.roleId)
        console.log(this.state.role)
        console.log(this.state.description)

    }

    showSweetAlert(icon,title) {
        return MySwal.fire({
            position: 'center',
            icon: icon,
            title: title,
            text: "",
            showConfirmButton: false,
            timer: 2000
        })
    }

    handlePasswordReset=e=>{
        e.preventDefault()
        this.togglePasswordModal();
        console.log("am here password reset")
        console.log(this.state.passwordReset.newPassword);
        console.log(this.state.passwordReset.newPassword2)
        console.log(this.state.user.id)
        const userId=this.state.user.id;
        
        const data = {...this.state.passwordReset,userId:userId }
        console.log(data)
        axios.post("/users/admin-password-reset", data).then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data.message!=""){
            this.showSweetAlert('success','Password Updated Sucessfully')
            this.ViewUserPage();
            }else{
                this.showSweetAlert('info','Password Mismatch') 
            }
            
        })

        
    }

    deleteCurrentUser(){
        const userId=this.state.id;
        axios.post("users/delete/"+ userId).then(res => {
            console.log(res);
            this.showSweetAlert('success','User deleted Sucessfully')
            this.ViewUserPage();
        })
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
        
        if (!hasError) {
            const User = {
                "id":this.state.formRegister.id,
                "name": this.state.formRegister.fullname,
                "username": this.state.formRegister.username,
                "userMonthlySmsLimit": this.state.formRegister.monthlysmslimit
            }

            const UserRoles = [];
            this.state.roles.forEach(item => {
                const newItem = { role_id: item.id }
                UserRoles.push(newItem)
            });

            const data = { user: User, role_ids: UserRoles }
            console.log(data)


            axios.put("users/admin", data).then(res => {
                console.log(res);
                console.log(res.data);
                this.ViewUserPage();
            })
        }
    }

    hasError = (formName, inputName, method) => {
        return this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method]
    }


    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    togglePasswordModal = () => {
        this.setState({
            passwordModal: !this.state.passwordModal
        });
    }

    ViewAllAdminUsers = () => {
        return this.props.history.push('/admin-manage-users')
    }

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }
    DeleteActionButtonStyle={
        color: 'white',
        background: "#ec2121" 
    }

    DeleteUserRole = (id) => {
        const role = this.state.roles.find(item => item.id == id);
        const selectedRoleList = this.state.roles.filter(row => row.id != role.id)
        this.setState({ roles: selectedRoleList })

    }

    render() {
        let index = 0;
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Edit User
                        <small>Updating user details</small>
                    </div>
                    <div className="flex-row">
                    {/* <Button onClick={this.deleteCurrentUser}  style={this.DeleteActionButtonStyle}   className="btn-pill-right mr-2">Delete Account</Button> */}
                        <Button onClick={this.togglePasswordModal} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">Password Reset</Button>
                        <Button onClick={this.toggleModal} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">Add Role</Button>
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


                        <Modal isOpen={this.state.passwordModal} toggle={this.togglePasswordModal}>
                            <ModalHeader toggle={this.togglePasswordModal}>Password Reset : </ModalHeader>
                            <form onSubmit={this.handlePasswordReset}>
                                <ModalBody>

                                    <FormGroup>
                                        <label>New Password :</label>
                                        <input className="form-control" name="newPassword"
                                            value={this.state.passwordReset.newPassword}
                                            onChange={this.handleChange} type="password" required></input>
                                    </FormGroup>

                                    <FormGroup>
                                        <label>Confirm Password :</label>
                                        <input className="form-control" name="newPassword2"
                                            value={this.state.passwordReset.newPassword2}
                                            onChange={this.handleChange} type="password" required></input>
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <button className="btn btn-sm btn-success mr-3  px-5" type="submit">
                                        Save
                                    </button>
                                </ModalFooter>
                            </form>
                        </Modal>
                    </div>
                </div>
                <Container fluid>
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <form onSubmit={this.onSubmit} name="formRegister" action="">
                                <Card className="card-default">
                                    <CardBody>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Full Name *:</label>
                                                    <Input type="text"
                                                        disabled
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
                                                    <label className="col-form-label">Status *</label>
                                                    <Input type="text"
                                                        name="status"
                                                        disabled
                                                        invalid={this.hasError('formRegister', 'status', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formRegister.status} />
                                                    {this.hasError('formRegister', 'status', 'required') && <span className="invalid-feedback">Field must be valid status</span>}
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Monthly SMS Limit * :</label>
                                                    <Input type="number"
                                                        name="monthlysmslimit"
                                                        invalid={this.hasError('formRegister', 'monthlysmslimit', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formRegister.monthlysmslimit} />
                                                    <span className="invalid-feedback">Field is required</span>
                                                </div>
                                            </div>

                                        </div>
                                        {/* <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Email *</label>
                                                    <Input type="text"
                                                        name="email"
                                                        invalid={this.hasError('formRegister', 'email', 'email')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formRegister.email} />
                                                    {this.hasError('formRegister', 'email', 'email') &&
                                                        <span className="invalid-feedback">Email is required</span>}
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Phone Number * :</label>
                                                    <Input type="number"
                                                        name="phoneNumber"
                                                        invalid={this.hasError('formRegister', 'phoneNumber', 'minlen')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["minlen"]'
                                                        data-param="10"
                                                        value={this.state.formRegister.phoneNumber} />
                                                    {this.hasError('formRegister', 'phoneNumber', 'minlen') &&
                                                        <span className="invalid-feedback">Valid phone number is required</span>}
                                                </div>
                                            </div>
                                            
                                        </div> */}
                                     
                                        <div className="row">

                                            {/* <h4 className="text-center"><strong>User Roles</strong></h4> */}
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
                                                    {this.state.roles.map(row => (
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


                                        </div>


                                    </CardBody>
                                    <CardFooter>
                                        <div className="d-flex align-items-center">
                                            <div className="ml-auto">
                                                <button className="btn btn-danger px-5 mr-2" onClick={this.ViewAllAdminUsers}>Cancel</button>
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

export default EditAdminUser;
