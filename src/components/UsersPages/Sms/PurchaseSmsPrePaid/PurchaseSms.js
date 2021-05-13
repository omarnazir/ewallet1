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



class PurchaseSms extends Component {

    ViewAllInvoices = () => {
        return this.props.history.push('/user/prepaid-invoices')
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
                                    <form>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Select a bundle : </label>
                                            <select className="form-control" id="exampleFormControlSelect1">
                                                <option>A</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Payment method : </label>
                                            <select className="form-control" id="exampleFormControlSelect1">
                                                <option>MPESA</option>
                                            </select>
                                        </div>
                                        <FormGroup>
                                            <label>Enter Vodacom phone number:</label>
                                            <input className="form-control" name="name" type="number" required></input>
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
