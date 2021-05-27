import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
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
import Datetime from 'react-datetime';
import $ from "jquery";
import { useHistory } from "react-router-dom";



class AddTariffBand extends Component {
    state = {

        tariff: [],
        tariffId: 0,
        bandAmount:0,
        smsQuantity: 0,
        expireDurationDays: 0,
        vatAmount: 0
    };


    handleSubmit = event => {
        event.preventDefault();

        const { state } = this.props.history.location;
  
        console.log('id', state.id);
        console.log("name", state.tariffName)

        const tariffBands = {
            "tariffId": state.id,
            "bandAmount": this.state.bandAmount,
            "smsQuantity": this.state.smsQuantity,
            "expireDurationDays": this.state.expireDurationDays,
            "vatAmount": this.state.vatAmount

        }

        axios.post("/tariff-bands", tariffBands).then(res => {
            console.log(res.data);
            this.ViewTarrifBands(state.id);
        })
    }

    ViewTarrifBands = (id) => {
        return this.props.history.goBack();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Add Tarriff Band
                     <small>Adding a new tariff band</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewTarrifBands} outline color="danger" className="btn-pill-right mr-2">View All Tarrifs Bands</Button>
                    </div>
                </div>
                <Container fluid>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <Card className="card-default">
                                <CardBody>
                                    <form onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <label>Amount :</label>
                                            <input className="form-control" name="bandAmount" onChange={this.handleChange} type="number" required></input>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Vat Amount :</label>
                                            <input className="form-control" name="vatAmount" onChange={this.handleChange} type="number" required></input>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Number of SMS :</label>
                                            <input className="form-control" name="smsQuantity" onChange={this.handleChange} type="number" required></input>
                                        </FormGroup>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Expire Time (Days): </label>
                                            <select className="form-control" id="exampleFormControlSelect1" name="expireDurationDays" onChange={this.handleChange}>
                                                <option value="0">Select number days</option>
                                                <option value="30">30 Days</option>
                                                <option value="60">60 Days</option>
                                                <option value="90">90 Days</option>
                                                <option value="180">180 Days</option>
                                                <option value="365">365 Days</option>
                                                <option value="1000000000">Never</option>
                                            </select>
                                        </div>
                                        <button className="btn btn-sm btn-success mr-3" type="submit">
                                            Save
                                        </button>
                                        <button onClick={this.ViewTarrifBands} className="btn btn-sm btn-danger">
                                            Cancel
                                        </button>
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

export default AddTariffBand;
