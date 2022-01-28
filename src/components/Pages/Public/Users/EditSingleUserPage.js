import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import {
    Container,
    Card,
    CardBody,
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

class EditSingleUserPage extends Component {


    state = {
        formUpdate: {
            email: '',
            fullname: "",
            username: "",
            phonenumber: "",
            monthlysmslimit: 0
        },
        passwordReset: {
            userId: "",
            currentPassword:"",
            newPassword: "",
            newPassword2: ""
        },
        userId:"",
        adminRole:false
    }


    componentDidMount() {
        const { state } = this.props.history.location;
        console.log(state)
        if (state == undefined) {
            return this.props.history.push('/dashboard/')
        }
      
      

        axios.get("/users/me")
            .then(res => {
                const user = res.data;
                this.setState({...this.state.passwordReset,userId:user.id})
                this.setState({ ...this.state.formUpdate, fullname: user.name })
                this.setState({
                    formUpdate: Object.assign({}, this.state.formUpdate, {
                        email: user.email,
                    }),
                });

                this.setState({
                    formUpdate: Object.assign({}, this.state.formUpdate, {
                        phonenumber: user.msisdn,
                    }),
                });
                this.setState({
                    formUpdate: Object.assign({}, this.state.formUpdate, {
                        fullname: user.name,
                    }),
                });

                this.setState({
                    formUpdate: Object.assign({}, this.state.formUpdate, {
                        username: user.username,
                    }),
                }); this.setState({
                    formUpdate: Object.assign({}, this.state.formUpdate, {
                        status: user.status,
                    }),
                }); this.setState({
                    formUpdate: Object.assign({}, this.state.formUpdate, {
                        monthlysmslimit: user.userMonthlySmsLimit,
                    }),
                });

                const roles = res.data.roles;
                this.setState({ roles })
                this.setState({ user })
            })
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

    validateOnChange = event => {
        const input = event.target;
        const form = input.form
        const value = input.type === 'checkbox' ? input.checked : input.value;

        const result = FormValidator.validate(input);

        if(result !=null){
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
            const data={
                "userId":this.state.userId,
                "username":this.state.formUpdate.username,
                "email":this.state.formUpdate.email,
                "name":this.state.formUpdate.fullname,
                "msisdn":this.state.formUpdate.phonenumber,
                
            }
            console.log(data)
            axios.put("/users",data).then(res=>{
                this.showSweetAlert("success","Updated User Successfully")
                this.ViewUserPage();
              })
        }
    }

    showSweetAlertSimple(message) {
        return MySwal.fire({
            position: 'center',
            icon: 'success',
            title:message,
            text: "",
            showConfirmButton: false,
            timer: 2000
        })
    }

    handleChange = event => {
        this.setState({
            passwordReset: Object.assign({},
                this.state.passwordReset, { [event.target.name]: event.target.value })
        })
    }


    handlePasswordReset=e=>{
        e.preventDefault()
        this.togglePasswordModal();
        console.log("am here password reset")
        console.log(" Is Admin mode "+this.state.adminRole)
        console.log(this.state.passwordReset.currentPassword);
        console.log(this.state.passwordReset.newPassword);
        console.log(this.state.passwordReset.newPassword2)
        console.log(this.state.user.id)
        
        let data = {}
        let url="/users/password-reset";
        data = {...this.state.passwordReset,userId:this.state.user.id }
        console.log(data)
       
        
        axios.post(url, data).then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data.message!=""){
            this.showSweetAlert('success','Password Updated Sucessfully')
            this.ViewUserPage();
        } 
        },(err) => {
            console.log(err.response.data.message);
            this.showSweetAlert('info',err.response.data.message) 
        })

        
    }

    hasError = (formName, inputName, method) => {
        return this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method]
    }

    ViewAllUsers = () => {
        return this.props.history.push('/manage-user')
    }

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

    ViewUserPage = () => {
        return this.props.history.push("/manage-user");
      };

      togglePasswordModal = () => {
        this.setState({
            passwordModal: !this.state.passwordModal
        });
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Edit User
                     <small>Updating User information.</small>
                    </div>
                    <div className="flex-row">
                    <Button onClick={this.togglePasswordModal} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">Change Password</Button>
                    <Button onClick={this.ViewAllUsers} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Users</Button>
                       
                        <Modal isOpen={this.state.passwordModal} toggle={this.togglePasswordModal}>
                            <ModalHeader toggle={this.togglePasswordModal}>Password Reset : </ModalHeader>
                            <form onSubmit={this.handlePasswordReset}>
                                <ModalBody>

                        
                                <FormGroup>
                                        <label>Current Password :</label>
                                        <input className="form-control" name="currentPassword"
                                            value={this.state.passwordReset.currentPassword}
                                            onChange={this.handleChange} type="password" required></input>
                                    </FormGroup>
    
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
                            <form onSubmit={this.onSubmit} name="formUpdate" action="">
                                <Card className="card-default">
                                    <CardBody>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Full Name *:</label>
                                                    <Input type="text"
                                                        disabled
                                                        name="fullname"
                                                        invalid={this.hasError('formUpdate', 'fullname', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formUpdate.fullname}
                                                        
                                                         />
                                                        
                                                   
                                                    <span className="invalid-feedback">Field is required</span>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Username *:</label>
                                                    <Input type="text"
                                                        disabled
                                                        name="username"
                                                        invalid={this.hasError('formUpdate', 'username', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formUpdate.username} />
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
                                                        invalid={this.hasError('formUpdate', 'email', 'required') || this.hasError('formUpdate', 'email', 'email')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required", "email"]'
                                                        value={this.state.formUpdate.email} />
                                                    {this.hasError('formUpdate', 'email', 'email') && <span className="invalid-feedback">Field must be valid email</span>}
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Phone Number * :</label>
                                                    <Input type="text"
                                                        name="phonenumber"
                                                        invalid={this.hasError('formUpdate', 'phonenumber', 'minlen')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required","minlen"]'
                                                        value={this.state.formUpdate.phonenumber}
                                                        data-param="10" />
                                                    {/* <span className="invalid-feedback">Field is required</span> */}
                                                    <span className="invalid-feedback">Valid phone number is required</span>
                                                </div>
                                            </div>
                                        </div>

                                    
                                     


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

export default EditSingleUserPage;
