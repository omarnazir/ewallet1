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

    redFont = {
        color: "#cc0002"
    }

    partnerLogo = {
        maxWidth: "90px"
    }

    FeatureIcon = {
        borderRadius: "50%",
        fontSize: "1.25rem",
        backgroundColor: "#cc0002",
        color: "white",
        width: "2.5em",
        height: "2.5em",
        lineHeight: "1.5",
        padding: "0.45em"
    }

    IntroText = {
        fontSize: "18px",
        lineHeight: "2em"
    }

    IntroHeader = {
        fontSize: "36px",
        lineHeight: "1.2em",
        color: "#aa0002",
        fontWeight: "700"
    }

    ParaText = {
        fontSize: "16px",
        marginBottom: "30px",
        lineHeight: "2em"
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
        backgroundImage: `linear-gradient(to top, rgba(35, 85, 40, 0.45), rgba(40, 43, 58, 0.25)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "600px"
    }

    HeroText = {
        width: "100%",
        textAlign: "center",
        marginTop: "150px",
        marginBottom: "140px"
    }

    HeroSubText = {
        fontSize: "20px",
        marginBottom: "40px",
        marginTop: "20px",
        fontWeight: "500"
    }

    ViewLogin = () => {
        return this.props.history.push('/login')
    }

   

    onSubmit = e => {
        e.preventDefault();
        this.ViewLogin();
    }

    render() {

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
                                    <a class="nav-link text-white" href="#about" style={this.NavLink}>About</a>
                                </li>
                                <li className="nav-item mx-3">
                                    <a class="nav-link text-white" href="#features" style={this.NavLink}>Features</a>
                                </li>
                                <li className="nav-item mx-3">
                                    <a class="nav-link text-white" href="#partners" style={this.NavLink}>Partners</a>
                                </li>
                                <li className="nav-item mx-3">
                                    <a class="nav-link text-white" href="#contact" style={this.NavLink}>Contact Us</a>
                                </li>
                            </ul>
                            <Button outline onClick={this.ViewLogin} color="success" className="btn-pill mr-3">Login</Button>
                            {/* <Button outline color="success" onClick={this.ViewSignUp} className="btn-pill mr-3">Sign Up</Button> */}
                        </div>
                    </nav>
                </header>

                <div className="container-fluid px-0">
                    <div style={this.HeroHeader} className="py-5">
                        <div style={this.HeroText} className="px-md-5 px-3">
                            <h1 className="text-white mb-3">Creating sustainable farming ecosystem</h1>
                            <p style={this.HeroSubText} className="text-white">Transforming Agriculture by giving Small-Holder Farmers<br/>
                            access to Knowledge, Agricultural Inputs, Finance and Markets via a Commercially<br/>self-sustainable Digital Agri-ecosystem
                            </p>                           
                        </div>
                    </div>
                </div>

                <div className="container py-3 my-lg-5 my-4">
                    <div className="row my-4" id="about">
                        <div className="col-lg-4">
                            <h2 className="text-center my-md-4 my-2" style={this.IntroHeader}><strong>About M-KULIMA Platform</strong></h2>
                        </div>   
                        <div className="col-lg-8">
                            <p style={this.IntroText}>We are an all-inclusive digital platform designed to assist farmers through their
                            cooperative unions. With M-KULIMA platform farmers will be able to acquire knowledge related to markets,
                            advisory services, understanding patterns and trends. Also farmers can sell their crops and make purchases
                            for agricultural inputs such as seeds, fertilizer, tools and the like on credit.<br /> The platform combines
                             a carefully formulated support of all key stakeholders in the ecosystem such as various Government officials,
                             extension officers and other key members. 
                            </p>
                        </div>
                    </div>
                </div>
            
                <div className="container-fluid text-dark px-0 mt-5">
                    <h2 className="text-center my-md-4 my-2" id="features"><strong>Unique M-KULIMA Features</strong></h2>
                    <div className="row no-gutters m-lg-5 m-3">
                        <div className="col-sm-6 col-lg-4 text-center px-md-4 px-2 py-3">
                            <span className="fas fa-mobile-alt mb-3" style={this.FeatureIcon}></span>
                            <h4>Low-cost solution</h4>
                            <p style={this.ParaText}>The platform employs the use of USSD service and mobile application to ensure affordability and mobility.</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center px-md-4 px-2 py-3">
                            <span className="fa fa-sync-alt mb-3" style={this.FeatureIcon}></span>
                            <h4>Real-time information</h4>
                            <p style={this.ParaText}>All the information processed is instantly saved and syncronized to both Web portal and USSD service.</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center px-md-4 px-2 py-3">
                            <span className="fa fa-link mb-3" style={this.FeatureIcon}></span>
                            <h4>Guaranteed connectivity</h4>
                            <p style={this.ParaText}>Through fast and reliable servers, we guarantee a minimum uptime of about 95%.</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center px-md-4 px-2 py-3">
                            <span className="fa fa-chart-line mb-3" style={this.FeatureIcon}></span>
                            <h4>Elegant analytics and reports</h4>
                            <p style={this.ParaText}>M-KULIMA portal assists in decision making since it catalogs, analyzes and give reports about relevant farmer information.</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center px-md-4 px-2 py-3">
                            <span className="fa fa-users mb-3" style={this.FeatureIcon}></span>
                            <h4>Multi-User Platform</h4>
                            <p style={this.ParaText}>The multiple users feature allows different types of users to efficiently access the platform with different privileges.</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center px-md-4 px-2 py-3">
                            <span className="fa fa-money-bill-wave mb-3" style={this.FeatureIcon}></span>
                            <h4>Direct B2C Payments</h4>
                            <p style={this.ParaText}>Farmers payment can be disbursed directly from the B2C wallet to individual farmer mobile money and banking accounts</p>
                        </div>
                    </div>
                </div>

                <div className="text-center container-fluid py-5 px-lg-5" style={this.RedSection} id="partners">
                    <h1 className="text-white my-3"><strong>Our Partners</strong></h1>
                    <div className="row py-lg-4 py-2 justify-content-center">
                        <div className="col-lg-2 col-md-3">
                            <img className="img-fluid" style={this.partnerLogo} src="img/nembo.png" alt="Wizara Logo" />
                            <h4 className="text-white mt-lg-3 mt-2"><em>Wizara ya Kilimo</em></h4>
                        </div>
                        <div className="col-lg-2 col-md-3">
                            <img className="img-fluid" style={this.partnerLogo} src="img/voda.png" alt="Vodacom Logo" />
                            <h4 className="text-white mt-lg-3 mt-2"><em>Vodacom Tanzania PLC</em></h4>
                        </div>
                    </div>
                </div>

                <div className="container-fluid text-dark px-0">
                    <div className="text-center my-md-5 my-3" id="contact">
                        <h1 className="mb-4 pt-2">Get in touch</h1>
                        <h4 className="px-2">Contact us to find out more about M-KULIMA platform.</h4>
                    </div>
                    <hr className="my-md-4 my-2"/>
                    <div className="row px-md-4 px-2 mx-md-4 pt-2 pb-4 mb-3 no-gutters">
                        <div className="col-md-4 px-md-3 px-2 py-md-3 py-2 ml-md-3">
                            <h4><span className="fa fa-home" style={this.redFont}></span> &nbsp; ADDRESS:</h4>
                            <ul className="list-unstyled ml-2" style={this.ContactList}>
                                <li>Vodacom Tanzania Public Limited Company,</li>
                                <li>7th Floor, Vodacom Tower,</li>
                                <li>Ursino Estate, Plot 23, Old Bagamoyo Road,</li>
                                <li>P.O. Box 2369,</li>
                                <li>Dar es Salaam.</li>
                            </ul>
                            <h4 className="mt-md-4 mt-3"><span className="fa fa-phone-alt" style={this.redFont}></span> &nbsp; TEL:</h4>
                            <ul style={this.ContactList}>
                                <li>+255 754 100 100</li>
                                <li>+255 754 705 000</li>
                            </ul>
                            <h4 className="mt-md-4 mt-3"><span className="fa fa-envelope" style={this.redFont}></span> &nbsp; EMAIL:</h4>
                            <ul style={this.ContactList}>
                                <li>business@vodacom.co.tz</li>
                            </ul>
                        </div>
                        <div className="col-md-7 px-md-3">
                            <div className="bg-light p-md-4 p-2">
                                <form className="mb-3 p-md-2 p-1"  name="formContact" onSubmit={this.onSubmit}>
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
                        <div className="p-3 text-center">
                            &copy;&nbsp;2021&nbsp;-&nbsp;M-KULIMA
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default LandingPage;
