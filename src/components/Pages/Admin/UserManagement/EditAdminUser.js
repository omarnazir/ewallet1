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
    Row, Col, Input, CardFooter, CustomInput
} from "reactstrap";
import $ from "jquery";

import FormValidator from '../../../Common/FormValidator';
import axios from '../../../../services/axios'

class EditAdminUser extends Component {


    state = {
        formRegister: {
            email: '',
            password: '',
            password2: '',
            terms: false,
            fullname: "",
            username: "",
            phonenumber: "",
            monthlysmslimit: 0
        },
        user:{},
        selectedRoleList:[],
        roles:[]
    }
    componentDidMount(){
        const { state } = this.props.history.location;
        // console.log(state.id)
        if (state == undefined) {
            return this.props.history.push('/admin-customers-list/')
        }

        axios.get("/users/" + state.id)
            .then(res => {
                const user=res.data;

                // [form.name]: {
                //     ...this.state[form.name],
                //     [input.name]: value,

                // this.setState({formRegister:{...this.state.formRegister,}})
                this.setState({...this.state.formRegister,fullname:user.name})

                this.setState({
                    formRegister: Object.assign({}, this.state.formRegister, {
                      fullname: user.name,
                    }),
                  });
                  this.setState({
                    formRegister: Object.assign({}, this.state.formRegister, {
                      username: user.username,
                    }),
                  }); this.setState({
                    formRegister: Object.assign({}, this.state.formRegister, {
                      email: user.status,
                    }),
                  }); this.setState({
                    formRegister: Object.assign({}, this.state.formRegister, {
                        monthlysmslimit: user.userMonthlySmsLimit,
                    }),
                  });
                 
                const roles=res.data.roles;
                this.setState({roles})
                this.setState({ user })
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
                "username":this.state.formRegister.username,
                "email":this.state.formRegister.email,
                "password":this.state.formRegister.password,
                "name":this.state.formRegister.fullname,
                "msisdn":this.state.formRegister.phonenumber,
                "userMonthlySmsLimit":this.state.formRegister.monthlysmslimit
            }
            console.log(data)
           

            // axios.post("users/admin",data).then(res=>{
            //     console.log(res);
            //     console.log(res.data);
            //     this.ViewUserPage();
            //   })
        }
    }

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

 

    render() {
        let index=0;
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Edit User
                     <small>Updating user details</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllAdminUsers} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Users</Button>
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
                                                    <Input type="email"
                                                        name="email"
                                                        disabled
                                                        invalid={this.hasError('formRegister', 'email', 'required') || this.hasError('formRegister', 'email', 'email')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required", "email"]'
                                                        value={this.state.formRegister.email} />
                                                    {this.hasError('formRegister', 'email', 'email') && <span className="invalid-feedback">Field must be valid email</span>}
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
