import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, CustomInput, Button } from 'reactstrap';
import image from './bulksms-image.jpeg';

import FormValidator from '../Common/FormValidator.js';

class Register extends Component {

    state = {
        formRegister: {
            email: '',
            password: '',
            password2: '',
            terms: false
        }
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
        return  this.state[formName] &&
                this.state[formName].errors &&
                this.state[formName].errors[inputName] &&
                this.state[formName].errors[inputName][method]
    }

    render() {
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
                            <Button outline color="danger" className="btn-pill mr-2">Login</Button>
                            <Button outline color="success" className="btn-pill mr-3">Sign Up</Button>
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
                                <img className = "mx-2 mt-2 mt-md-4" src = {image} alt = "BulkSMS" />
                           </div>
                       </div>
                        <div className="col-md-7 mt-4">
                            {/* START card */}
                            <div className="card card-flat">
                                <div className="card-header text-center bg-dark">
                                    <h3 className="text-white pt-2">REGISTER NOW</h3>
                                </div>
                                <div className="card-body">
                                    <form className="mb-3 p-2" name="formRegister" onSubmit={this.onSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6 px-2">
                                                <label>Customer type</label>
                                                <select className="form-control form-control-lg rounded-0" name="custype" required>
                                                    <option value="" disabled selected hidden>Select customer type</option>
                                                    <option value="individual">Individual</option>
                                                    <option value="organization">Organization</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-6 px-2">
                                                <label>Account type</label>
                                                <select className="form-control form-control-lg rounded-0" name="acctype" required>
                                                    <option value="" disabled selected hidden>Select account type</option>
                                                    <option value="prepaid">Pre-paid account</option>
                                                    <option value="postpaid">Post-paid account</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6 px-2">
                                                <label>Customer name</label>
                                                <div className="input-group with-focus">
                                                    <Input type="text" name="name"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="Enter full name" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-transparent border-left-0">
                                                            <em className="fa fa-user"></em>
                                                        </span>
                                                    </div>
                                                    <span className="invalid-feedback">Field must be equal to previous</span>
                                                </div>
                                            </div>
                                            <div className="form-group col-md-6 px-2">
                                                <label>Username</label>
                                                <div className="input-group with-focus">
                                                    <Input type="text" name="username"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="Select username" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-transparent border-left-0">
                                                            <em className="fa fa-user"></em>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6 px-2">
                                                <label>Email address</label>
                                                <div className="input-group with-focus">
                                                    <Input type="email" name="email"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="Enter email address" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-transparent border-left-0">
                                                            <em className="fa fa-envelope"></em>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group col-md-6 px-2">
                                                <label>Phone number</label>
                                                <div className="input-group with-focus">
                                                    <Input type="tel" name="phone"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="Enter phone number" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-transparent border-left-0">
                                                            <em className="fa fa-phone-alt"></em>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                                <div className="form-group col-md-6 px-2">
                                                    <label>Password</label>
                                                    <div className="input-group with-focus">
                                                        <Input type="password" name="password"
                                                            className="border-right-0 form-control form-control-lg rounded-0"
                                                            placeholder="Enter secure password" />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text bg-transparent border-left-0">
                                                                <em className="fa fa-lock"></em>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <small className="text-danger">
                                                        <strong>Must contain at least one upper and one lower letter, one special character and number</strong>
                                                    </small>
                                                </div>
                                                <div className="form-group col-md-6 px-2">
                                                    <label>Confirm password</label>
                                                    <div className="input-group with-focus">
                                                        <Input type="password" name="password2"
                                                            className="border-right-0 form-control form-control-lg rounded-0"
                                                            placeholder="Repeat password" />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text bg-transparent border-left-0">
                                                                <em className="fa fa-lock"></em>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6 px-2">
                                                <label>Physical address</label>
                                                <div className="input-group with-focus">
                                                    <Input type="text" name="name"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="Enter physical address" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-transparent border-left-0">
                                                            <em className="fa fa-home"></em>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group col-md-6 px-2">
                                                <label>NIDA ID Number</label>
                                                <div className="input-group with-focus">
                                                    <Input type="text" name="name"
                                                        className="border-right-0 form-control form-control-lg rounded-0"
                                                        placeholder="National card ID number" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-transparent border-left-0">
                                                            <em className="fa fa-user"></em>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-8 px-2">
                                            <label for="nidafile">NIDA ID (Scanned PDF required)
                                                <span className="text-danger"> (Max. size 200KB)</span>
                                            </label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input form-control form-control-lg rounded-0" name="nidafile" />
                                                <label class="custom-file-label" for="nidafile">Select file for upload</label>
                                            </div>
                                            <small><span id="fileSizeError"></span></small>
                                        </div>
                                        <div className="form-group px-md-2 px-1 my-2 mr-auto">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" required value="" id="termscheck" />
                                                <label className="form-check-label" for="termscheck">
                                                    I agree with <a href="#">Terms and Conditions</a>
                                                </label>
                                            </div>
                                        </div>
                                        <button className="btn btn-danger mt-3" type="submit">Create account</button>
                                    </form>
                                    <p className="pt-2 text-center">Have an account?</p>
                                    <Link to="login" className="btn btn-block btn-secondary">Login</Link>
                                </div>
                                </div>
                                {/* END card */}
                            </div>
                        </div>
                    </div>
                    <div className="block-center mt-md-5 mt-3 bg-dark py-2">
                        <div className="p-3 text-center text-white">
                            <span className="mr-2">&copy;</span>
                            <span>2021</span>
                            <span className="mx-2">-</span>
                            <span>E-SMS</span>
                            <br/>
                            <span>Bulk SMS Platform</span>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Register;