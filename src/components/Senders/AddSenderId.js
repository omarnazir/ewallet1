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
import axios from "../../services/axios";



class AddSenderId extends Component {
    state = {
      name:"",
    }; 

    handleSubmit = event => {

        event.preventDefault();
        const sender = {
            "senderId": this.state.name.toUpperCase(),
            "isActive": "0",
            "isDeleted": "1",
            "isDefault": "0",
            "dateApproved": null,
            "dateCreated": "2020-11-24T06:37:16.000+00:00",
            "customerFk": 180,
            "source": "VODACOM",
            "is_approved": 0
       
        }
        axios.post("sender-ids/create",sender).then(res=>{
            console.log(res);
            console.log(res.data);
            this.ViewAllSenderIds();
          })
      }

    ViewAllSenderIds=()=>{
        return this.props.history.push('/senders')
      }

      handleChange = event =>{
        this.setState({ name: event.target.value});
      }

      AddActionButtonStyle={
        color:'white',
        background:"#003366"
      }
    
    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Add Sender id's
                     <small>Adding a new sender id.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllSenderIds} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All SenderId's</Button>
                    </div>
                </div>
                <Container fluid>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <Card className="card-default">
                                <CardBody>
                                    <form onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <label>Sender Id :</label>
                                            <input className="form-control" name="name" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                        <button className="btn btn-sm btn-success mr-3" type="submit">
                                            Save
                                        </button>
                                        <button className="btn btn-sm btn-danger" onClick={this.ViewAllSenderIds}>
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

export default AddSenderId;
