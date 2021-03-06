import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Input, CustomInput, Button } from 'reactstrap';

import FormValidator from '../Common/FormValidator.js';
import { AuthService } from "../../services"


class TwofaToken extends Component {

    state = {
        formLogin: {
            token: ''
        },
        loginHasError: false,
        redirect: null
    }

    componentDidMount() {
        const id=window.localStorage.getItem("id");
        if (id==null || id == undefined) {
            this.setState({ redirect:"/login" })
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
        if (!hasError) {
            const data = {
                id:window.localStorage.getItem("id"),
                token: this.state.formLogin.token
            }
            AuthService.verifyToken(data).then(
                (res) => {
                    const roles=res.user.roles;
                    if (roles == null || !Array.isArray(roles)) {
                        this.setState({redirect: '/login'});
                        
                    } else {
                        // roles.filter(role => (role.name === "/admin/dashboard")).length === 0
                        const found = roles.find((row) => row.name == "/admin-dashboard");
                        if (found == undefined) {
                            this.setState({redirect: '/dashboard'});

                        } else {
                            this.setState({redirect: '/admin-dashboard'});
                           
                        }

                        // const redirect=localStorage.getItem("dashboard");
                        // this.setState({redirect})
                    }

                    // const redirect=AuthService.getRedirectPath();
                    // this.setState({redirect});

                            window.location.reload();
                }, (err) => {
                    console.log(err.response.data.message);
                    this.setState({ loginHasError: true })
                }
            )
        }
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
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                <header>
                   
                    <nav className="navbar topnavbar py-2 px-5">
                      
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
                   

                        <div className="navbar-nav flex-row">
                            <Button onClick={this.ViewLogin} outline color="success" className="btn-pill mr-3">Login</Button>
                        </div>
                    </nav>
                </header>

                <div className="container-fluid px-0 mt-2">
                    <div className="block-center mt-5 wd-xl">
                        <div className="card card-flat">
                            <div className="card-header text-center bg-dark">
                                <a href="/">
                                    <img className="block-center rounded" src="img/logo.png" alt="Logo" />
                                </a>
                            </div>
                            <div className="card-body">
                                <p className="text-center py-2">ENTER OTP TOKEN TO CONTINUE.</p>
                                {this.state.loginHasError ?
                                    <p className="text-danger">Valid token is required , Please request another</p> : null}
                                <form className="mb-3" name="formLogin" onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <div className="input-group with-focus">
                                            <Input type="text"
                                                name="token"
                                                className="border-right-0"
                                                placeholder="Token"
                                                invalid={this.hasError('formLogin', 'token', 'required')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required"]'
                                                value={this.state.formLogin.token}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text text-muted bg-transparent border-left-0">
                                                    <em className="fa fa-lock"></em>
                                                </span>
                                            </div>
                                            <span className="invalid-feedback">Numeric token is required</span>
                                        </div>
                                    </div>
                                
                                    <button className="btn btn-block btn-primary mt-3" type="submit">Verify</button>
                                    <p className="pt-3 text-center">Check token in your mail</p>
                                     <Link to="/login" className="btn btn-block btn-secondary">Back to login</Link>

                                </form>
                               
                            </div>
                        </div>
                    </div>
                    <div className="p-3 text-center">
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

export default TwofaToken;

