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





class AddUserSenderId extends Component {
    state = {
      name:"",
    }; 

    handleSubmit = event => {

        event.preventDefault();
        const sender = {
            "senderId": this.state.name,
       
        }
        axios.post("sender-ids",sender).then(res=>{
            console.log(res);
            console.log(res.data);
            this.ViewAllSenderIds();
          })
      }

    ViewAllSenderIds=()=>{
        return this.props.history.push('/senderId')
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
                        Add Sender ID
                     <small>Adding a new Sender ID.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllSenderIds} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Sender IDs</Button>
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

export default AddUserSenderId;
