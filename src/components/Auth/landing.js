import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Input, Button} from 'reactstrap';
import heroImage from './ew_slide.jpg';




class LandingPage extends Component {

    state={}
    componentDidMount() {
        // const token = localStorage.getItem('token');
        // if (token != null && token.length > 0) {
        //     this.setState({redirect: '/dashboard'});
        // }
    }

    RedSection = {
        background: "#aa0002"
    }

    FeatureIcon = {
        borderRadius: "50%",
        border: "2px solid",
        fontSize: "1.5rem",
        width: "2.25em",
        height: "2.25em",
        lineHeight: "1.125",
        padding: "0.45em"
    }

    ParaText = {
        fontSize: "16px",
        marginBottom: "30px"
    }

    FrontButton = {
        fontSize: "16px",
        minWidth: "270px",
        padding: "12px"
    }

    NavLink = {
        fontSize: "16px",
    }

    ContactList = {
        fontSize: "15px",
        lineHeight: "1.8em"  
    }

    HeroHeader = {
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    }

    HeroText = {
        width: "100%",
        textAlign: "center",
        marginTop: "130px",
        marginBottom: "140px"
    }

    HeroSubText = {
        fontSize: "20px",
        marginBottom: "40px",
        marginTop: "20px",
        fontWeight: "600"
    }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect to={this.state.redirect}/>
        // }

        return (
            <div className="bg-white">
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
                            <ul className="nav mx-3 px-3">
                                <li className="nav-item mx-3">
                                    <a class="nav-link text-white" href="#features" style={this.NavLink}>Features</a>
                                </li>
                                <li className="nav-item mx-3">
                                    <a class="nav-link text-white" href="#pricing" style={this.NavLink}>Pricing</a>
                                </li>
                                <li className="nav-item mx-3">
                                    <a class="nav-link text-white" href="#contact" style={this.NavLink}>Contact</a>
                                </li>
                            </ul>
                            <Button outline color="danger" className="btn-pill mr-3">Login</Button>
                            <Button outline color="success" className="btn-pill mr-3">Sign Up</Button>
                        </div>
                    </nav>
                </header>

                <div className="container-fluid px-0 mb-2">
                    <div style={this.HeroHeader} className="py-5">
                        <div style={this.HeroText} className="px-md-5 px-3">
                            <h1 className="text-white mb-3">Affordable SMS Packages</h1>
                            <p style={this.HeroSubText} className="text-dark">With our affordable SMS packages, you can now manage
                                <br/>all your SMS campaigns online with our SMS Gateway.
                            </p>
                            <a href="#">
                                <button className="btn btn-light rounded-pill btn-outline-dark mt-2" style={this.FrontButton}>Sign up today &nbsp;
                                    <span className="fa fa-arrow-right"></span>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
               
                <div className="container-fluid text-dark px-0 mt-5">
                    <h2 className="text-center my-md-4 my-2" id="features"><em>Explore Features</em></h2>
                    <div className="row no-gutters m-lg-5 m-3">
                        <div className="col-sm-6 col-lg-4 text-center px-md-4 px-2 py-3">
                            <span className="far fa-envelope mb-3" style={this.FeatureIcon}></span>
                            <h4>Bulk SMS Sending</h4>
                            <p style={this.ParaText}>You can send Bulk SMS up to 200k at a time without any downtime or crashing.</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center px-md-4 px-2 py-3">
                            <span className="far fa-calendar-alt mb-3" style={this.FeatureIcon}></span>
                            <h4>Scheduled SMS</h4>
                            <p style={this.ParaText}>We've made it easy for you to schedule messages that need to be sent on a later time with our Scheduled SMS Feature.</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center px-md-4 px-2 py-3">
                            <span className="fa fa-shopping-cart mb-3" style={this.FeatureIcon}></span>
                            <h4>Online Subscription & Payment</h4>
                            <p style={this.ParaText}>You can subscribe an SMS package and instantly pay online without letting us know. We've made it easy for you to send SMS.</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center px-md-4 px-2 py-3">
                            <span className="fa fa-list mb-3" style={this.FeatureIcon}></span>
                            <h4>Customizable Sender Name</h4>
                            <p style={this.ParaText}>Choose any acceptable names to appear as a sender when you send Bulk SMS. Sender names has to be approved before they can send SMS.</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center px-md-4 px-2 py-3">
                            <span className="fa fa-users mb-3" style={this.FeatureIcon}></span>
                            <h4>Multi-User Platform</h4>
                            <p style={this.ParaText}>Our multiple users management feature will let you create users for your team with their defined SMS quotas.</p>
                        </div>
                    </div>
                    <hr className="my-md-4 my-2"/>
                    <div className="text-center text-dark my-md-5 my-3 py-3">
                        <h4 className="mb-4 px-2"><em>Experience more other features like Contact Manager, CSV and Excel Upload and Developer API Integration</em></h4>
                        <a href="">
                            <button className="btn rounded-pill btn-outline-dark mt-3" style={this.FrontButton}>Sign up today &nbsp;
                                <span className="fa fa-arrow-right"></span>
                            </button>
                        </a>
                    </div>
                    <div className="text-center py-5 px-lg-5" style={this.RedSection} id="pricing">
                        <h1 className="text-white mt-5 mb-3"><em>Pricing</em></h1>
                        <p className="text-white mx-lg-5 px-md-5 px-2 mb-4" style={this.HeroSubText}>We have very affordable SMS packages rates for everyone . Simply register, pay easily via M-pesa and just send as you wish!</p>
                        <a href="">
                            <button className="btn rounded-pill btn-light btn-outline-dark mb-5 mt-2" style={this.FrontButton}>Sign up today &nbsp;
                                <span className="fa fa-arrow-right"></span>
                            </button>
                        </a>
                    </div>
                    <div className="text-center text-dark my-md-5 my-3" id="contact">
                        <h1 className="mb-4 pt-2">Get in touch</h1>
                        <h4 className="px-2">Contact us to find out more about our Bulk SMS service.</h4>
                    </div>
                    <hr className="my-md-4 my-2"/>
                    <div className="row px-md-4 px-2 mx-md-4 py-3 mb-3 no-gutters">
                        <div className="col-md-4 px-md-3 px-2 py-md-3 py-2 ml-md-3">
                            <h4><span className="fa fa-home"></span> &nbsp; ADDRESS:</h4>
                            <ul className="list-unstyled ml-2" style={this.ContactList}>
                                <li>Vodacom Tanzania Public Limited Company,</li>
                                <li>7th Floor, Vodacom Tower,</li>
                                <li>Ursino Estate, Plot 23, Old Bagamoyo Road,</li>
                                <li>P.O. Box 2369,</li>
                                <li>Dar es Salaam.</li>
                            </ul>
                            <h4 className="mt-md-4 mt-3"><span className="fa fa-phone-alt"></span> &nbsp; TEL:</h4>
                            <ul style={this.ContactList}>
                                <li>+255 754 100 100</li>
                                <li>+255 754 705 000</li>
                            </ul>
                            <h4 className="mt-md-4 mt-3"><span className="fa fa-envelope"></span> &nbsp; EMAIL:</h4>
                            <ul style={this.ContactList}>
                                <li>business@vodacom.co.tz</li>
                            </ul>
                        </div>
                        <div className="col-md-7 px-md-3">
                            <div className="bg-light p-md-4 p-2">
                                <form className="mb-3 p-md-2 p-1" name="formContact" onSubmit={this.onSubmit}>
                                    <div className="form-group px-2">
                                        <label>Full name</label>
                                        <div className="input-group with-focus">
                                            <Input type="text" name="name"
                                                className="border-right-0 form-control form-control-lg rounded-0"
                                                placeholder="Enter full name" />
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-transparent border-left-0">
                                                    <em className="fa fa-user"></em>
                                                </span>
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="form-group px-2">
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
                                    <div className="form-group px-2">
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
                                    <div className="form-group px-2">
                                        <label>Message</label>
                                        <Input type="textarea" name="message"
                                            className="form-control rounded-0"
                                            rows = "4"
                                            placeholder="Message" />
                                    </div>
                                    <div className="px-2">
                                        <button className="btn btn-danger mt-3" type="submit">Send message</button>
                                    </div>                           
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="block-center">
                        <div className="p-3 pb-4 text-center">
                            <span className="mr-2">&copy;</span>
                            <span>2021</span>
                            <span className="mx-2">-</span>
                            <span>E-SMS</span>
                            <br/>
                            <span>Bulk SMS Platform</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;
