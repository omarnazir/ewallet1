import React, { Component } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Input, CustomInput ,Button} from 'reactstrap';

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
        return this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method]
    }

    render() {
        return (
            <Fragment>

                <header className="topnavbar-wrapper">
                    { /* START Top Navbar */}
                    <nav className="navbar topnavbar">
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

                        { /* START Right Navbar */}
                        {/* <ul className="navbar-nav flex-row">
                            <li className="nav-item">
                                <a className="nav-link" href="" data-search-open="">
                                    <em className="icon-magnifier"></em>
                                </a>
                            </li>
                        </ul> */}
                    </nav>
                </header>



            </Fragment>
        );
    }
}

export default Register;
