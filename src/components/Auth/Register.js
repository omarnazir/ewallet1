import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Input, CustomInput, Button, Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import image from './bulksms-image.jpeg';
import axios from "axios";
import FormValidator from '../Common/FormValidator.js';
import { AuthService } from '../../services';
import { data } from 'jquery';

class Register extends Component {

    state = {

        formRegister: {

            customer_type: 'Individual',
            payment_type: 'Pre-Paid',

            fullname: "",
            email: '',
            phonenumber: "",
            location: '',
            v_account: "V000-000",
            username: '',
            password: '',
            id_number: '',
            passwordConfirm: '',
            terms: false,
            attachment: '',
        },



        fileDisplay: false,
        fileDisplayName: "",
        showIndividualFields: true,
        showVaccount: false,
        modal: false,
        attachment:''
    }

    ViewLoginPage = () => {
        return this.props.history.push('/login')
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }



    handleOnCustomerSelectChange = value => {

        if (value == "Individual") {
            this.setState({ showIndividualFields: true })
            this.setState({ showOrganizationFields: false })
        } else {
            this.setState({ showIndividualFields: false })
            this.setState({ showOrganizationFields: true })
        }
      

    }



    handleOnPaymentSelectChange = value => {

        if (value == "Post-Paid") {
            this.setState({ showVaccount: true })
        } else {
            this.setState({ showVaccount: false })
        }

    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    validateOnChange = event => {
        const input = event.target;
        console.log(input);

        const form = input.form
        const value = input.type === 'checkbox' ? input.checked : input.value;
        if ([event.target.name] == "customer_type") {
            console.log("Customer type", value)
            this.handleOnCustomerSelectChange([event.target.value])
        }

        if ([event.target.name] == "payment_type") {
            this.handleOnPaymentSelectChange([event.target.value])

        }
        if([event.target.name]=="attachment"){
            this.handleFileChange(event)
        }

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
        
    }

    // handleFileChange = event => {
    //     console.log(event)
    //     this.setState({ attachment: event});
        
    // }


    onSubmit = e => {
        const form = e.target;
        const inputs = [...form.elements].filter(i => ['INPUT'].includes(i.nodeName))
     

        const { errors, hasError } = FormValidator.bulkValidate(inputs)

        this.setState({
            [form.name]: {
                ...this.state[form.name],
                errors
            }
        });

        console.log(hasError);
        console.log(errors);
        console.log(this.state.formRegister)
        console.log(hasError ? 'Form has errors. Check!' : 'Form Submitted!')

        e.preventDefault()



        const data = new FormData()

        data.append("fullname", this.state.formRegister.fullname)
        data.append("email", this.state.formRegister.email)
        data.append("phonenumber", this.state.formRegister.phonenumber)
        data.append('location', this.state.formRegister.location)
        data.append('customer_type', this.state.formRegister.customer_type)
        //field added on post paid selected
        data.append('v_account', this.state.formRegister.v_account)

        data.append('username', this.state.formRegister.username)
        data.append('password', this.state.formRegister.password)
        data.append('payment_type', this.state.formRegister.payment_type)
        //on prepaid select: Nida  Nida number
        //on post paid select: buss licence: buss licence number add Vaccount field
        data.append('id_number', this.state.formRegister.id_number)
        // data.append('attachment', this.state.formRegister.attachment)
        data.append('attachment', this.state.attachment)
       
       



        AuthService.register(data).then((res) => {
            console.log(res)
            this.ViewLoginPage()
        }, (err) => {
            console.log(err)
        })


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
                                    <form className="mb-3 p-2" name="formRegister" onSubmit={this.onSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6 px-2">
                                                <label>Customer type</label>
                                                <select defaultValue="Individual" className="form-control form-control-lg rounded-0" name="customer_type"
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    value={this.state.formRegister.customer_type}
                                                    invalid={this.hasError('formRegister', 'customer_type', 'required')}
                                                >
                                                    <option value="" disabled selected>Select customer type</option>
                                                    <option value="Individual">Individual</option>
                                                    <option value="Organization">Organization</option>
                                                </select>
                                                {this.hasError('formRegister', 'customer_type', 'required') &&
                                                    <span className="invalid-feedback">customer type is required</span>}
                                            </div>
                                            <div className="form-group col-md-6 px-2">
                                                <label>Account type</label>
                                                <select defaultValue="Pre-Paid" className="form-control form-control-lg rounded-0" name="payment_type"
                                                    onChange={this.validateOnChange}
                                                    value={this.state.formRegister.payment_type}
                                                    data-validate='["required"]'
                                                    invalid={this.hasError('formRegister', 'payment_type', 'required')
                                                    }
                                                >
                                                    <option value="" disabled selected>Select account type</option>
                                                    <option value="Pre-Paid" selected>Pre-paid account</option>
                                                    <option value="Post-Paid">Post-paid account</option>
                                                </select>
                                                {this.hasError('formRegister', 'payment_type', 'required') &&
                                                    <span className="invalid-feedback">payment name is required</span>}
                                            </div>
                                        </div>
                                        <div className="form-row">

                                            <div className="form-group col-md-6 px-2">
                                                <label>Customer name</label>
                                                <div className="input-group with-focus">
                                                    <Input type="text"
                                                        name="fullname"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="Customer name"
                                                        invalid={this.hasError('formRegister', 'fullname', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formRegister.fullname} />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                                            <em className="fa fa-envelope"></em>
                                                        </span>
                                                    </div>
                                                    {this.hasError('formRegister', 'fullname', 'required') &&
                                                        <span className="invalid-feedback">Customer name is required</span>}
                                                </div>

                                            </div>

                                            <div className="form-group col-md-6 px-2">
                                                <label>Username</label>
                                                <div className="input-group with-focus">
                                                    <Input type="text"
                                                        name="username"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="Enter Username"
                                                        invalid={this.hasError('formRegister', 'username', 'minlen')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required","minlen"]'
                                                        data-param="10"
                                                        value={this.state.formRegister.username} />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                                            <em className="fa fa-user"></em>
                                                        </span>
                                                    </div>
                                                    {this.hasError('formRegister', 'username', 'minlen') &&
                                                        <span className="invalid-feedback"> Valid Username is required</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6 px-2">
                                                <label>Email address</label>
                                                <div className="input-group with-focus">
                                                    <Input type="text"
                                                        name="email"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="Enter email address"
                                                        invalid={this.hasError('formRegister', 'email', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required","email"]'
                                                        value={this.state.formRegister.email} />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                                            <em className="fa fa-envelope"></em>
                                                        </span>
                                                    </div>
                                                    {this.hasError('formRegister', 'email', 'required') &&
                                                        <span className="invalid-feedback">Email is required</span>}
                                                </div>
                                            </div>
                                            <div className="form-group col-md-6 px-2">
                                                <label>Phone number</label>
                                                <div className="input-group with-focus">
                                                    <Input type="tel"
                                                        name="phonenumber"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="Enter phone number"
                                                        invalid={this.hasError('formRegister', 'phonenumber', 'minlen')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required","minlen"]'
                                                        data-param="10"
                                                        value={this.state.formRegister.phonenumber} />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                                            <em className="fa fa-phone-alt"></em>
                                                        </span>
                                                    </div>
                                                    {this.hasError('formRegister', 'phonenumber', 'minlen') &&
                                                        <span className="invalid-feedback">Valid phone number is required</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6 px-2">
                                                <label>Password</label>
                                                <div className="input-group with-focus">
                                                    <Input type="password"
                                                        id="id-password"
                                                        name="password"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="Enter secure password"
                                                        invalid={this.hasError('formRegister', 'password', 'minlen')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required","minlen"]'
                                                        value={this.state.formRegister.password}
                                                        data-param="12"
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                                            <em className="fa fa-lock"></em>
                                                        </span>
                                                    </div>
                                                    {/* {this.hasError('formRegister', 'password', 'required') &&
                                                        <span className="invalid-feedback">Valid password  is required</span>} */}
                                                    {this.hasError('formRegister', 'password', 'minlen') &&
                                                        <span className="invalid-feedback">Password too weak</span>}


                                                </div>
                                                {this.hasError('formRegister', 'password', 'minlen') &&
                                                <small className="text-danger">
                                                    <strong>Must contain at least one upper and one lower letter, one special character and number</strong>
                                                </small>}

                                            </div>
                                            <div className="form-group col-md-6 px-2">

                                                <label>Confirm password</label>
                                                <div className="input-group with-focus">
                                                    <Input type="password"
                                                        name="passwordConfirm"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="Repeat password"
                                                        invalid={this.hasError('formRegister', 'passwordConfirm', 'equalto')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["equalto"]'
                                                        value={this.state.formRegister.passwordConfirm}
                                                        data-param="id-password" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                                            <em className="fa fa-lock"></em>
                                                        </span>
                                                    </div>
                                                    <span className="invalid-feedback">Password must match</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6 px-2">

                                                <label>Physical address</label>
                                                <div className="input-group with-focus">
                                                    <Input type="text"
                                                        name="location"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="Enter physical address"
                                                        invalid={this.hasError('formRegister', 'location', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formRegister.location} />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                                            <em className="fa fa-home"></em>
                                                        </span>
                                                    </div>
                                                    {this.hasError('formRegister', 'location', 'required') &&
                                                        <span className="invalid-feedback">Location field is required</span>}
                                                </div>
                                            </div>
                                            <div className="form-group col-md-6 px-2">
                                                <label> {this.state.showIndividualFields ? "NIDA ID Number" : "Bussiness License Number"}</label>

                                                <div className="input-group with-focus">
                                                    <Input type="number"
                                                        name="id_number"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="ID number"
                                                        invalid={this.hasError('formRegister', 'id_number', 'minlen')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required","minlen"]'
                                                        data-param="6"
                                                        value={this.state.formRegister.id_number} />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                                            <em className="fa fa-phone-user"></em>
                                                        </span>
                                                    </div>
                                                    {this.hasError('formRegister', 'id_number', 'minlen') &&
                                                        <span className="invalid-feedback">Field is required</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6 px-2">
                                                <label htmlFor="nidafile"> {this.state.showIndividualFields ? "NIDA ID (Scanned PDF required)" : "Bussiness License (Scanned PDF required)"}
                                                    <span className="text-danger"> (Max. size 200KB)</span>
                                                </label>

                                                <div className="custom-file">
                                                    <input
                                                        accept="image/png,image/jpeg,application/pdf"
                                                        type="file"
                                                        className="form-control form-control-file"
                                                        name="attachment"
                                                        id="csvupload"


                                                        invalid={this.hasError('formRegister', 'attachment', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.formRegister.attachment}
                                                    />
                                                </div>


                                                {/* <div className="custom-file">
                                                    <input type="file" className="custom-file-input form-control form-control-lg rounded-0" name="attachment"
                                                        onChange={this.handleFileChange} required
                                                        accept="image/png, image/jpeg,application/pdf"
                                                    />
                                                    <label className="custom-file-label" htmlFor="attachment">{this.state.fileDisplay ? this.state.fileDisplayName : "Select file for upload"}</label>
                                                </div> */}
                                                {/* <small><span id="fileSizeError"></span></small> */}
                                            </div>

                                            {this.state.showVaccount &&
                                                <div className="form-group col-md-6 px-2">
                                                    <label>V Account:</label>
                                                    <div className="input-group with-focus">
                                                        <Input type="text" name="v_account"
                                                            className="border-right-0 form-control form-control-lg rounded-0"
                                                            placeholder="V account"
                                                            invalid={this.hasError('formRegister', 'v_account', 'required')}
                                                            onChange={this.validateOnChange}
                                                            data-validate='["required"]'
                                                            value={this.state.formRegister.v_account}

                                                        />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text bg-transparent border-left-0">
                                                                <em className="fa fa-user"></em>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                        </div>
                                        <div className="form-group px-md-2 px-1 my-2 mr-auto">
                                            {/* <div className="form-check">
                                                <input className="form-check-input" type="checkbox" required value="" id="termscheck" name="termscheck" />
                                                <label className="form-check-label" htmlFor="termscheck">
                                                    I agree with <a href="#">Terms and Conditions</a>
                                                </label>
                                            </div> */}
                                            <CustomInput
                                                type="checkbox"
                                                id="terms"
                                                name="terms"
                                                label="I agree with the terms and conditions"
                                                invalid={this.hasError('formRegister', 'terms', 'required')}
                                                onChange={this.validateOnChange}
                                                value={this.state.formRegister.terms}
                                                data-validate='["required"]'
                                                checked={this.state.formRegister.terms}
                                            >
                                                <span className="ml-3 text-danger" onClick={this.toggleModal}>Read terms</span>
                                                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                                                    <ModalHeader toggle={this.toggleModal} className="bg-danger">
                                                        ESMS Terms and Conditions
                                                    </ModalHeader>

                                                    <ModalBody className="container-fluid" style={{maxHeight: '60vh', overflowY: 'auto'}}>

                                                        <div className="pl-lg-4 pl-3 pr-2">
                                                            <div className="my-2">
                                                                <h4 style={{ fontSize: '14.5px' }}><strong>1.	Nature of Terms and Conditions & Applicability</strong></h4>
                                                                <ul className="ml-2 terms-list">
                                                                    <li className="my-2">
                                                                        1.1.	These terms and conditions are issued by Vodacom Tanzania PLC (hereinafter “Vodacom” or “we” or “us” “ourselves” or “our”) to Customer (hereinafter “you” or “your” or “user” “yourself”).
                            </li>
                                                                    <li className="my-2">
                                                                        1.2.	These terms and conditions shall apply to You for the Bulk SMS Portal Services provided by Vodacom
                            </li>
                                                                </ul>
                                                            </div>
                                                            <div className="mt-lg-4 mt-3">
                                                                <h4 style={{ fontSize: '14.5px' }}><strong>2.	Disclaimer</strong></h4>
                                                                <ul className="ml-2 terms-list">
                                                                    <li className="my-2">
                                                                        2.1.	Whilst every effort has been made by Vodacom, its affiliated companies, employees, suppliers, agents and or vendors to ensure Bulk SMS Portal Services are provided appropriately, Vodacom, its affiliated companies, employees, suppliers, agents and or vendors do not guarantee the availability of Services at all times or that Services will be uninterrupted or error free or accurate or secure or complete or meet your requirement. You will be notified when Vodacom will have a scheduled down time or planned maintenance except for emergency cases where the system is unavailable due to reasons beyond our control.
                            </li>
                                                                </ul>
                                                            </div>
                                                            <div className="mt-lg-4 mt-3">
                                                                <h4 style={{ fontSize: '14.5px' }}><strong>3.	Use of Services</strong></h4>
                                                                <ul className="ml-2 terms-list">
                                                                    <li className="my-2">
                                                                        3.1.	Your request for registration to Vodacom to subscribe for the Bulk SMS services by completing the registration form and attaching your NIDA ID and a scanned copy of your NIDA ID means:
                                <ul className="ml-2 terms-list">
                                                                            <li className="my-2">
                                                                                3.1.1.	Vodacom shall consider the registration made to it by you, that it has either;
                                    </li>
                                                                            <li className="my-2">
                                                                                3.1.2.	If Vodacom rejects any registration made by you, then you shall not be entitled to be provided with the Bulk SMS service in question.
                                    </li>
                                                                            <li className="my-2">
                                                                                3.1.3.	If Vodacom approves the registration made by you, or if Vodacom approves such registration with amendments and then you adopt such amendments, then you will continue at all times to comply with the Service Specifications as well as the terms and conditions hereof and upon which such approval was granted;
                                    </li>
                                                                        </ul>
                                                                    </li>
                                                                    <li className="my-2">
                                                                        3.2.	You may only use Services for lawful purposes and you warrant that you shall not:
                                <ul className="ml-2 terms-list">
                                                                            <li className="my-2">
                                                                                3.2.1.	use Services to receive or transmit material which is in violation of any law or regulation, which is obscene, threatening, racist, menacing, offensive, defamatory, in breach of confidence, in breach of any intellectual property rights, or otherwise objectionable or unlawful;
                                    </li>
                                                                            <li className="my-2">
                                                                                3.2.2.	use Services to carry out or facilitate any illegal act of corruption, bribery, money laundry or any other unlawful act;
                                    </li>
                                                                        </ul>
                                                                    </li>
                                                                    <li className="my-2">
                                                                        3.3.    You shall have the right, at your discretion, to rescind these terms within any time after registering for Services provided by Vodacom
                            </li>
                                                                </ul>
                                                            </div>
                                                            <div className="mt-lg-4 mt-3">
                                                                <h4 style={{ fontSize: '14.5px' }}><strong>4.	Charges</strong></h4>
                                                                <ul className="ml-2 terms-list">
                                                                    <li className="my-2">
                                                                        4.1.    The prices setoff in this service are tier based, set on volumes including all taxes and may herein change subject to Vodacom giving a notice of change in advance and hereby being ordered.
                            </li>
                                                                </ul>
                                                            </div>
                                                            <div className="mt-lg-4 mt-3">
                                                                <h4 style={{ fontSize: '14.5px' }}><strong>5.	Intellectual Property Rights</strong></h4>
                                                                <ul className="ml-2 terms-list">
                                                                    <li className="my-2">
                                                                        5.1.	You acknowledge that we own the intellectual property rights on Services and that the unauthorized use thereof is expressly prohibited.
                            </li>
                                                                </ul>
                                                            </div>
                                                            <div className="mt-lg-4 mt-3">
                                                                <h4 style={{ fontSize: '14.5px' }}><strong>6.	General</strong></h4>
                                                                <ul className="ml-2 terms-list">
                                                                    <li className="my-2">
                                                                        6.1.	These terms and conditions will be governed by and construed in accordance with the laws of United Republic of Tanzania
                            </li>
                                                                    <li className="my-2">
                                                                        6.2.	Any complaint or dispute arising out of or in connection with any Services or these Terms and Conditions shall be referred to Vodacom within 14 days from the occurrence of such complaint or dispute, failing to refer the complaint or dispute within these days shall give Vodacom an option of rejecting the complaint or the dispute.
                            </li>
                                                                    <li className="my-2">
                                                                        6.3.	These terms and conditions are severable, in that if any provision is determined to be illegal or unenforceable by any court of competent jurisdiction, then such provision shall be deemed to have been deleted without affecting the remaining provisions of the terms and conditions.
                            </li>
                                                                    <li className="my-2">
                                                                        6.4.	Our failure to exercise any particular rights or provision of these terms and conditions shall not constitute a waiver of such right or provision, unless acknowledged and agreed to by us in writing.
                            </li>
                                                                    <li className="my-2">
                                                                        6.5.	We accept no liability for the, loss, late receipt or non-readability of any download, transmission, or other communications. The Content, which is obtained from a large range of sources, is supplied to you on an "as is" basis or depend on device capacity and we do not warrant that the Content is of satisfactory quality, fit for a particular purpose, suitable, reliable, accurate, complete, secure or is free from error and virus.
                            </li>
                                                                    <li className="my-2">
                                                                        6.6.	You accept all liabilities arising from all transactions which are conducted by means of using the Service
                            </li>
                                                                    <li className="my-2">
                                                                        6.7.	Should you misuse the Service and/or send unsolicited SMS messages to recipients (whether intentionally or not), and without their consent then you agree to be held liable for any loss, damage or disturbance caused by such misuse or negotiated settlement.
                            </li>
                                                                    <li className="my-2">
                                                                        6.8.	That you agree that by use of the service, you are not likely to bring Vodacom into disrepute and which contain nothing which is likely in the light of generally prevailing standards of decency to cause offence. In this respect suitability may be determined by Vodacom and such determination shall be final and binding by yourself.
                            </li>
                                                                    <li className="my-2">
                                                                        6.9.	At all times you shall comply, with all and any relevant provisions of the United Republic of Tanzania Act on Bulk Messaging as well as all directives issued by the Telecommunications Authority or any other authority to Vodacom from time to time.
                            </li>
                                                                    <li className="my-2">
                                                                        6.10.	These terms and conditions, may be varied by us from time to time. You will be notified of any change of services before implementation. Where a specific agreement has been signed between yourself and ourselves which contain similar terms and conditions the provision of such specific terms and conditions shall take precedent in the event of conflict or inconsistence.
                            </li>
                                                                    <li className="my-2">
                                                                        6.11.	We reserve the right with a prior notice and reason to alter, restrict and/or terminate Services to you in particular, or to revise these terms and conditions, and/or the prices at which Services are offered, at any time. Such changes will be deemed to have been accepted by you if you continue using the Services. The obligation therefore is on you to review these terms and conditions at regular intervals.
                            </li>
                                                                    <li className="my-2">
                                                                        6.12.	We reserve the right to seek all remedies available at law and in equity for violations of these Terms and Conditions, including but not limited to the right to block access to this Service and any other Vodacom web sites, features, and networks.
                            </li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                    </ModalBody>
                                                    <ModalFooter>
                                                        {/* <button className="btn btn-danger mt-md-1 mb-1 mx-2">Print PDF</button> */}
                                                        <button className="btn btn-dark mt-md-1 mb-1 mx-2 px-5" onClick={this.toggleModal}>
                                                            Close</button>

                                                    </ModalFooter>

                                                </Modal>
                                                <span className="invalid-feedback">Field is required</span>
                                            </CustomInput>
                                        </div>
                                        <button className="btn btn-danger mt-3" type="submit">Create account</button>
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