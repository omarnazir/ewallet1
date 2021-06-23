import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    Button,
    FormGroup
} from "reactstrap";
import $ from "jquery";
import { AuthService } from '../../../../services';



class PurchaseSms extends Component {

    ViewAllInvoices = () => {
        return this.props.history.push('/prepaid-invoices')
    }

    state = {
        tariffBand: "",
        paymentMethod: "1",
        phoneNumber: "",
        amount:"",
        smsCount:0,
        tarriffBandList: [],
        paymentTypeList:[]
    };

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

    componentDidMount() {
        const isAuthenticated = AuthService.isAuthenticated();
        if (!isAuthenticated) {
          this.setState({ redirect: "/login" })
        }
        axios.get("/tariff-bands/customer")
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
            "amount":this.state.amount,
            "payment_type_id":this.state.paymentMethod,
            "msisdn":this.state.phoneNumber
        }
        axios.post("/bills", bill).then(res => {
            console.log(res);
            console.log(res.data);
            this.ViewAllInvoices();
        })
    }


    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleOnAmountChange=event=>{
        this.setState({ [event.target.name]: event.target.value });
        const smsCount=this.computeNumberOfSms([event.target.value])
        this.setState({smsCount:smsCount})
    }

    computeNumberOfSms=amount=>{
    let bandId=0;
     this.state.tarriffBandList.forEach(item => {
            if(amount >=item.fromAmount && amount<=item.toAmount){
                bandId=item.id
            }
        })

        if(bandId!=0){
            const band =this.state.tarriffBandList.find((item)=>item.id==bandId)
            return amount/band.pricePerSms;
        }
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
                                        <FormGroup>
                                            <label>Enter amount (TShs):</label>
                                            <input className="form-control" name="amount" type="number" required onChange={this.handleOnAmountChange} ></input>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Number of SMS:</label>
                                            <input className="form-control" name="smsCount" type="number" required disabled 
                                            value={this.state.smsCount}
                                            ></input>
                                        </FormGroup>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Payment method : </label>
                                            <select className="form-control" id="exampleFormControlSelect1" name="paymentMethod" required onChange={this.handlePaymentMethodChange} onClick={this.handlePaymentMethodChange}>
                                            {/* <option value="0">Select payment method</option> */}
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
