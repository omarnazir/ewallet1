import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, CustomInput, Button } from 'reactstrap';
import image from './bulksms-image.jpeg';
import axios from "axios";
import FormValidator from '../Common/FormValidator.js';
import { AuthService } from '../../services';
import { data } from 'jquery';

class Register extends Component {

    state = {

        formRegister: {
            fullname: "",
            email: '',
            phonenumber: "",
            location: '',
            customer_type: '',
            v_account: "",
            username: '',
            password: '',
            payment_type: '',
            id_number: '',
            attachment: '',
            termscheck: false,

            //Other params
            passwordConfirm: '',
        },
        fileDisplay: false,
        fileDisplayName: "",
        showIndividualFields: true,
        showVaccount: false
    }

    ViewLoginPage = () => {
        return this.props.history.push('/login')
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state)

        const data = new FormData()

        data.append("fullname", this.state.fullname)
        data.append("email", this.state.email)
        data.append("phonenumber", this.state.phonenumber)
        data.append('location', this.state.location)
        data.append('customer_type', this.state.customer_type)
        //field added on post paid selected
        data.append('v_account', this.state.v_account)

        data.append('username', this.state.username)
        data.append('password', this.state.password)
        data.append('payment_type', this.state.payment_type)
        //on prepaid select: Nida  Nida number
        //on post paid select: buss licence: buss licence number add Vaccount field
        data.append('id_number', this.state.id_number)
        data.append('attachment', this.state.attachment)





        AuthService.register(data).then((res) => {
            console.log(res)
            this.ViewLoginPage()
        }, (err) => {
            console.log(err)
        })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleOnCustomerSelectChange = event => {

        if ([event.target.value] == "Individual") {
            this.setState({ showIndividualFields: true })
            this.setState({ showOrganizationFields: false })
        } else {
            this.setState({ showIndividualFields: false })
            this.setState({ showOrganizationFields: true })
        }
        this.setState({ [event.target.name]: event.target.value });
    }



    handleOnPaymentSelectChange = event => {

        if ([event.target.value] == "Post-paid") {
            this.setState({ showVaccount: true })
        } else {
            this.setState({ showVaccount: false })
        }
        this.setState({ [event.target.name]: event.target.value });
    }

    /**
     * Validate input using onChange event
     * @param  {String} formName The name of the form in the state object
     * @return {Function} a function used for the event
     */
    validateOnChange = event => {
        const input = event.target;
        const form = input.form
        const value = input.type === 'checkbox' ? input.checked : input.value;

        const result = FormValidator.validate(input);

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

    handleFileChange = event => {
        this.setState({ attachment: event.target.files[0] });
        this.setState({ fileDisplayName: event.target.files[0].name })
    }


    onSubmit = e => {
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

        e.preventDefault()
    }

    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method]
    }

    ViewLogin = () => {
        return this.props.history.push('/login')
    }

    ViewSignUp = () => {
        return this.props.history.push('/register')
    }

    render() {
        const year = new Date().getFullYear()
        return (
            <div>
                <header>
                    { /* START Top Navbar */}
                    <nav className="navbar topnavbar py-2 px-5">
                        { /* START navbar header */}
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#/">
                                <div className="brand-logo">
                                    <img className="img-fluid" src="img/logo.png" alt="App Logo" />
                                </div>
                                <div className="brand-logo-collapsed">
                                    <img className="img-fluid" src="img/logo.png" alt="App Logo" />
                                </div>
                            </a>
                        </div>
                        { /* END navbar header */}

                        <div className="navbar-nav flex-row">
                            <Button onClick={this.ViewLogin} outline color="success" className="btn-pill mr-2">Login</Button>

                        </div>
                    </nav>
                </header>

                <div className="container-fluid mt-2">
                    <div className="row px-3">
                        <div className="col-md-5 pl-md-5 pl-2 mt-md-5 mt-3">
                            <h2 className="my-lg-5 my-sm-3">Start creating secure, personalized communication</h2>
                            <div className="mt-4">
                                <p><em><strong>With our affordable SMS packages, you can now manage all your SMS campaigns online with our SMS Gateway with the following features:</strong></em></p>
                                <ul><strong><em>
                                    <li>Bulk SMS Sending</li>
                                    <li>Scheduled SMS</li>
                                    <li>Online Subscription &amp; Payment</li>
                                    <li>Customizable Sender Name</li>
                                    <li>Multi-User Platform</li>
                                </em></strong>
                                </ul>
                                <img className="mx-2 mt-2 mt-md-4" src={image} alt="BulkSMS" />
                            </div>
                        </div>
                        <div className="col-md-7 mt-4">
                            <div className="card card-flat">
                                <div className="card-header text-center bg-dark">
                                    <h3 className="text-white pt-2">REGISTER NOW</h3>
                                </div>
                                <div className="card-body">
                                    <form className="mb-3" name="formRegister" onSubmit={this.onSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6 px-2">
                                                <label>Customer type</label>
                                                <select className="form-control form-control-lg rounded-0" name="customer_type"  onChange={this.handleOnCustomerSelectChange}>
                                                    <option value="" disabled selected hidden>Select customer type</option>
                                                    <option value="Individual">Individual</option>
                                                    <option value="Organization">Organization</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-6 px-2">
                                                <label>Account type</label>
                                                <select className="form-control form-control-lg rounded-0" name="payment_type"  onChange={this.handleOnPaymentSelectChange}>
                                                    <option value="" disabled selected hidden>Select account type</option>
                                                    <option value="Pre-Paid">Pre-paid account</option>
                                                    <option value="Post-Paid">Post-paid account</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div className="form-row">
                                            <div className="form-group col-md-6 px-2">
                                                <label>Customer name</label>
                                                <div className="input-group with-focus">
                                                    <Input type="text" name="fullname"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="Enter full name"
                                                        invalid={this.hasError('formRegister', 'fullname', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formRegister.fullname}
                                                          />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-transparent border-left-0">
                                                            <em className="fa fa-user"></em>
                                                        </span>
                                                    </div>
                                                    {this.hasError('formRegister', 'fullname', 'fullname') && <span className="invalid-feedback">Field is required</span>}
                                                </div>
                                            </div>
                                            <div className="form-group col-md-6 px-2">
                                                <label>Username</label>
                                                <div className="input-group with-focus">
                                                    <Input type="text" name="username"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="Enter username"
                                                        invalid={this.hasError('formRegister', 'username', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formRegister.username}

                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-transparent border-left-0">
                                                            <em className="fa fa-user"></em>
                                                        </span>
                                                    </div>
                                                    {this.hasError('formRegister', 'username', 'username') && <span className="invalid-feedback">Field is required</span>}
                                                </div>
                                            </div>
                                        </div>
                                        

                                        <div className="form-row">
                                            <div className="form-group col-md-6 px-2">
                                                <label>Email address</label>
                                                <div className="input-group with-focus">
                                                    <Input type="email" name="email"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="Enter email address"
                                                        invalid={this.hasError('formRegister', 'email', 'required') || this.hasError('formRegister', 'email', 'email')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required", "email"]'
                                                        value={this.state.formRegister.email}
                                                         
                                                         />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-transparent border-left-0">
                                                            <em className="fa fa-envelope"></em>
                                                        </span>
                                                        {this.hasError('formRegister', 'email', 'email') && <span className="invalid-feedback">Field must be valid email</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group col-md-6 px-2">
                                                <label>Phone number</label>
                                                <div className="input-group with-focus">                     
                                                <Input type="tel" name="phonenumber"
                                                    className="border-right-0 form-control form-control-lg rounded-0"
                                                    placeholder="Enter phone number"
                                                    invalid={this.hasError('formRegister', 'phonenumber', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    value={this.state.formRegister.phonenumber}
                                                    
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-transparent border-left-0">
                                                            <em className="fa fa-phone-alt"></em>
                                                        </span>
                                                        {this.hasError('formRegister', 'phonenumber', 'phonenumber') && <span className="invalid-feedback">Field must be valid phonenumber</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                            
                                        <div className="form-group">
                                            <label className="text-muted" htmlFor="signupInputPassword1">Password</label>
                                            <div className="input-group with-focus">
                                                <Input type="text"
                                                    id="id-password"
                                                    name="password"
                                                    className="border-right-0"
                                                    placeholder="Password"
                                                    invalid={this.hasError('formRegister', 'password', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    value={this.state.formRegister.password}
                                                />
                                                <div className="input-group-append">
                                                    <span className="input-group-text text-muted bg-transparent border-left-0">
                                                        <em className="fa fa-lock"></em>
                                                    </span>
                                                </div>
                                                <span className="invalid-feedback">Field is required</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="text-muted" htmlFor="signupInputRePassword1">Retype Password</label>
                                            <div className="input-group with-focus">
                                                <Input type="text" name="password2"
                                                    className="border-right-0"
                                                    placeholder="Retype assword"
                                                    invalid={this.hasError('formRegister', 'password2', 'equalto')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["equalto"]'
                                                    value={this.state.formRegister.password2}
                                                    data-param="id-password"
                                                />
                                                <div className="input-group-append">
                                                    <span className="input-group-text text-muted bg-transparent border-left-0">
                                                        <em className="fa fa-lock"></em>
                                                    </span>
                                                </div>
                                                <span className="invalid-feedback">Field must be equal to previous</span>
                                            </div>
                                        </div>
                                        <CustomInput type="checkbox" id="terms"
                                            name="terms"
                                            label="I agree with the terms"
                                            invalid={this.hasError('formRegister', 'terms', 'required')}
                                            onChange={this.validateOnChange}
                                            data-validate='["required"]'
                                            checked={this.state.formRegister.terms}>
                                            <span className="invalid-feedback">Please agree with terms</span>
                                        </CustomInput>
                                        <button className="btn btn-block btn-primary mt-3" type="submit">Create account</button>
                                    </form>

                                    <p className="pt-2 text-center">Have an account?</p>
                                    <Link to="login" className="btn btn-block btn-secondary">Login</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="block-center mt-md-5 mt-3 bg-dark py-2">
                    <div className="p-3 text-center text-white">
                        <span className="mr-2">&copy;</span>
                        <span>{year}</span>
                        <span className="mx-2">-</span>
                        <span>E-SMS</span>
                        <br />
                        <span>Bulk SMS Platform</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;