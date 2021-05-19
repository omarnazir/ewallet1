import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Input, CustomInput,Button} from 'reactstrap';

import FormValidator from '../Common/FormValidator.js';
import axios from "axios";


class Login extends Component {

    state = {
        formLogin: {
            username: '',
            password: ''
        },
        loginHasError: false,
        redirect: null
    }

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (token != null && token.length > 0) {
            this.setState({redirect: '/dashboard'});
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

        const {errors, hasError} = FormValidator.bulkValidate(inputs)

        this.setState({
            [form.name]: {
                ...this.state[form.name],
                errors
            }
        });

        console.log(hasError ? 'Form has errors. Check!' : 'Form Submitted!')

        e.preventDefault()

        if (!hasError) {
            axios.post('http://localhost:8085/api/v1/authenticate', {
                username: this.state.formLogin.username,
                password: this.state.formLogin.password
            }).then(res => {
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.setItem('user',res.data.user)
                sessionStorage.setItem('customerFk',res.data.user.customerFk);
                sessionStorage.setItem('username',res.data.user.username);
                sessionStorage.setItem('user_roles', JSON.stringify(res.data.user.roles));
                this.setState({redirect: '/dashboard'});
            }).catch(error => {
                console.log(error.response.data);
                this.setState({loginHasError: true})
            });
        }
    }

    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method]
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

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
                            <Button outline color="danger" className="btn-pill mr-3">Login</Button>
                            <Button outline color="success" className="btn-pill mr-3">Sign Up</Button>
                        </div>
                    </nav>
                </header>
               
                <div className="container-fluid px-0 mt-2">
                    <div className="block-center mt-5 wd-xl">
                        <div className="card card-flat">
                            <div className="card-header text-center bg-dark">
                                <a href="">
                                    <img className="block-center rounded" src="img/logo.png" alt="Logo"/>
                                </a>
                            </div>
                            <div className="card-body">
                                <p className="text-center py-2">SIGN IN TO CONTINUE.</p>
                                {this.state.loginHasError ?
                                <p className="text-danger">Invalid login, please try again</p> : null}
                                <form className="mb-3" name="formLogin" onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <div className="input-group with-focus">
                                            <Input type="text"
                                                name="username"
                                                className="border-right-0"
                                                placeholder="Enter username"
                                                invalid={this.hasError('formLogin', 'username', 'required')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required"]'
                                                value={this.state.formLogin.username}/>
                                            <div className="input-group-append">
                                                <span className="input-group-text text-muted bg-transparent border-left-0">
                                                    <em className="fa fa-envelope"></em>
                                                </span>
                                            </div>
                                            {this.hasError('formLogin', 'username', 'required') &&
                                            <span className="invalid-feedback">Field is required</span>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group with-focus">
                                            <Input type="password"
                                                id="id-password"
                                                name="password"
                                                className="border-right-0"
                                                placeholder="Password"
                                                invalid={this.hasError('formLogin', 'password', 'required')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required"]'
                                                value={this.state.formLogin.password}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text text-muted bg-transparent border-left-0">
                                                    <em className="fa fa-lock"></em>
                                                </span>
                                            </div>
                                            <span className="invalid-feedback">Field is required</span>
                                        </div>
                                    </div>
                                    <div className="clearfix">
                                        <CustomInput type="checkbox" id="rememberme"
                                                    className="float-left mt-0"
                                                    name="remember"
                                                    label="Remember Me">
                                        </CustomInput>
                                        <div className="float-right">
                                            <Link to="recover" className="text-muted">Forgot your password?</Link>
                                        </div>
                                    </div>
                                    <button className="btn btn-block btn-primary mt-3" type="submit">Login</button>
                                </form>
                                <p className="pt-3 text-center">Need to Signup?</p>
                                <Link to="register" className="btn btn-block btn-secondary">Register Now</Link>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 text-center">
                    <span className="mr-2">&copy;</span>
                    <span>2020</span>
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

export default Login;

