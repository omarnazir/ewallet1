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



class AddTariffBand extends Component {
    state = {
      name:"",
    }; 


    handleSubmit = event => {
        console.log("am here")
        event.preventDefault();
        //change to tarriff
        const tarriff=  {
            "tariffName": this.state.name.toUpperCase(),
            "fromSms": null,
            "toSms": null,
            "expireDurationDays": null,
            "createdAt": "2020-12-02T17:05:19.000+00:00",
            "createdBy": 0,
            "isDefault": 1
    }
          axios.post("/tariff",tarriff).then(res=>{
            console.log(res);
            console.log(res.data);
            this.ViewTarrifs();
          })
      }

    ViewTarrifBands=()=>{
        return this.props.history.push('/manage-tariff-bands')
      }

      handleChange = event =>{
        this.setState({ name: event.target.value});
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
                                            <label>From Amount :</label>
                                            <input className="form-control" name="name" onChange={this.handleChange} type="number" required></input>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>To Amount :</label>
                                            <input className="form-control" name="name" onChange={this.handleChange} type="number" required></input>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Price per  SMS :</label>
                                            <input className="form-control" name="name" onChange={this.handleChange} type="number" required></input>
                                        </FormGroup>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Expire Time (Days): </label>
                                            <select className="form-control" id="exampleFormControlSelect1">
                                                <option>30 Days</option>
                                                <option>60 Days</option>
                                                <option>90 Days</option>
                                                <option>Never</option>
                                            </select>
                                        </div>
                                        <button className="btn btn-sm btn-success mr-3" type="submit">
                                            Save
                                        </button>
                                        <button onClick={this.ViewTarrifs} className="btn btn-sm btn-danger">
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
