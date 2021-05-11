import React, { Component } from "react";
import ContentWrapper from "../Layout/ContentWrapper";
import Datatable from "../Common/Datatable";
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
import axios from "axios";


class AddTarriff extends Component {
    state = {
      name:"",
    }; 

    handleSubmit = event => {
        console.log("am here")
        event.preventDefault();
        //change to tarriff
        const sender = {
            "senderId": this.state.name,
            "isActive": "0",
            "isDeleted": "1",
            "isDefault": "0",
            "dateApproved": null,
            "dateCreated": "2020-11-24T06:37:16.000+00:00",
            "customerFk": 180,
            "source": "VODACOM",
            "is_approved": 0
       
        }
        //change to tarriff
        axios.post('http://localhost:8085/api/v1/sender-ids/create',sender, {
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }}).then(res=>{
            console.log(res);
            console.log(res.data);
            // window.location = "/retrieve" 
            this.ViewAllSenderIds();
          })
      }

    ViewTarrifs=()=>{
        return this.props.history.push('/manage-tariffs')
      }

      handleChange = event =>{
        this.setState({ name: event.target.value});
      }
    
    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Add Tarriff
                     <small>Adding a new tarriff</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewTarrifs} outline color="danger" className="btn-pill-right mr-2">View All Tarrifs</Button>
                    </div>
                </div>
                <Container fluid>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <Card className="card-default">
                                <CardBody>
                                    <form onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <label>Tarriff Name :</label>
                                            <input className="form-control" name="name" onChange={this.handleChange} required></input>
                                        </FormGroup>
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

export default AddTarriff;
