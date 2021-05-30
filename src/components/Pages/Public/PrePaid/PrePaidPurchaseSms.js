import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
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



class PurchaseSms extends Component {

    ViewAllInvoices = () => {
        return this.props.history.push('/prepaid-invoices')
    }

    state = {
        tariffBand: "",
        paymentMethod: "",
        phoneNumber: "",
        tarriffBandList: [],
        paymentTypeList:[]
    };

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

    componentDidMount() {
        axios.get("/tariff/get-default-bands")
            .then(res => {
                const response = res.data;
                this.setState({ tarriffBandList: response })

            })

        axios.get("/payment-type")
            .then(res => {
                const response = res.data;
                this.setState({ paymentTypeList: response })
            })
    }






    handleSubmit = event => {
        event.preventDefault();
        const bill={
            "tariff_band_id":this.state.tariffBand,
            "payment_type_id":this.state.paymentMethod,
            "msisdn":this.state.phoneNumber
        }
        console.log(bill)

        // const bill2={
        //     "tariff_band_id":21,
        //     "payment_type_id":1,
        //     "msisdn":"0745252650"
        // }
        axios.post("/bills", bill).then(res => {
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
        this.setState({ paymentMethod:paymentMethod })
    }
    handleSelectBundleChange = event => {
        const tariff = event.target.value;
        this.setState({ tariffBand:tariff })
    }
    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Purchase SMS
                     <small>Purchase SMS for Pre-paid customers</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllInvoices} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View Invoices</Button>
                    </div>
                </div>
                <Container fluid>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <Card className="card-default">
                                <CardBody>
                                    <form onSubmit={this.handleSubmit}>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Bundle : </label>
                                            <select className="form-control" id="exampleFormControlSelect1" required name="tariffBand" onChange={this.handleSelectBundleChange} onClick={this.handleSelectBundleChange} >
                                            <option value="0">Select a bundle band</option>
                                                {this.state.tarriffBandList.map(row => (
                                                    <option key={row.id} value={row.id} >
                                                        {row.smsQuantity} sms -  Tsh {row.bandAmount}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Payment method : </label>
                                            <select className="form-control" id="exampleFormControlSelect1" name="paymentMethod" required onChange={this.handlePaymentMethodChange} onClick={this.handlePaymentMethodChange}>
                                            <option value="0">Select payment method</option>
                                            {this.state.paymentTypeList.map(row => (
                                                    <option key={row.id} value={row.id} >
                                                        {row.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <FormGroup>
                                            <label>Enter Vodacom phone number:</label>
                                            <input className="form-control" name="phoneNumber" type="number" required onChange={this.handleChange} ></input>
                                        </FormGroup>

                                        <h6>After entering the number check out your phone to continue</h6>

                                        <div className="mt-3">
                                            <button className="btn btn-sm btn-success mr-3 px-5" type="submit">
                                                Continue
                                        </button>
                                            <button onClick={this.ViewAllInvoices} className="btn btn-sm btn-danger px-5">
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
