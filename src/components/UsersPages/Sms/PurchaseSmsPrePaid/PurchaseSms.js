import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    FormGroup
} from "reactstrap";
import $ from "jquery";
import axios from "../../../../services/axios"


class PurchaseSms extends Component {

    ViewAllInvoices = () => {
        return this.props.history.push('/prepaid-invoices')
    }

    state = {
        tariff: "",
        paymentMethod:"",
        paymentMsisdn:"",
        tariffList:[]
    };

    componentDidMount() {
        axios.get("/tariff")
            .then(res => {
                const response = res.data;
                this.setState({ tariffList: response })
              
            })
        }

    handleSubmit = event => {
        event.preventDefault();
        const tarriff = {
            "tariff": this.state.tariff,
            "paymentMethod":this.state.paymentMethod,
            "paymentMsisdn":this.state.paymentMsisdn
        }
        axios.post("/bills", tarriff).then(res => {
            console.log(res);
            console.log(res.data);
            this.ViewAllInvoices();
        })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handlePaymentMethodChange = event => {
        const paymentMethod = event.target.value;
        this.setState({ paymentMethod })
    }
    handleSelectBundleChange = event => {
        const tariff = event.target.value;
        this.setState({ tariff })
    }
    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Purchase sms units
                     <small>Recharge sms for pre paid customers</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllInvoices} outline color="danger" className="btn-pill-right mr-2">View Invoices</Button>
                    </div>
                </div>
                <Container fluid>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <Card className="card-default">
                                <CardBody>
                                    <form onSubmit={this.handleSubmit}>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Select a bundle : </label>
                                            <select className="form-control" id="exampleFormControlSelect1" required name="tariff" onChange={this.handleSelectBundleChange} >
                                                {this.state.tariffList.map(row => (
                                                    <option key={row.id} value={row.id} >
                                                        {row.tariffName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Payment method : </label>
                                            <select className="form-control" id="exampleFormControlSelect1" name="paymentMethod" required onChange={this.handlePaymentMethodChange}>
                                                <option value="MPESA">MPESA</option>
                                            </select>
                                        </div>
                                        <FormGroup>
                                            <label>Enter Vodacom phone number:</label>
                                            <input className="form-control" name="paymentMsisdn" type="number" required onClick={this.handleChange}></input>
                                        </FormGroup>
                                     
                                            <h6>After entering the number check out your phone to continue</h6>
                                        
                                        <div className="mt-3">
                                        <button className="btn btn-sm btn-success mr-3" type="submit">
                                            Continue
                                        </button>
                                        <button onClick={this.ViewAllInvoices} className="btn btn-sm btn-danger">
                                            Cancel
                                        </button>
                                        </div>
                                    </form>
                                </CardBody>
                            </Card>

                        </div>
                    </div>
                </Container>
            </ContentWrapper>
        );
    }
}

export default PurchaseSms;
