import React, { Component } from "react";
import ContentWrapper from "../../Layout/ContentWrapper";
import Datatable from "../../Common/Datatable";
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
import axios from "../../../services/axios";


class AddUserContactList extends Component {
   
    ViewAllContacts=()=>{
        return this.props.history.push('/user/contact-list')
      }
    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Add new contact list
                     <small>Adding a new contact list</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllContacts} outline color="danger" className="btn-pill-right mr-2">View All Contact lists</Button>
                    </div>
                </div>
                <Container fluid>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <Card className="card-default">
                                <CardBody>
                                    <form>
                                        <FormGroup>
                                            <label>Contact list Name :</label>
                                            <input className="form-control" name="name" required></input>
                                        </FormGroup>
                                       
                                        <FormGroup>
                                            <label>Select File (Excel xls or xslx) :</label>
                                            <input className="form-control" name="name" type="file" required></input>
                                        </FormGroup>
                                     
                                        <button className="btn btn-sm btn-success mr-3" type="submit">
                                            Save
                                        </button>
                                        <button onClick={this.ViewAllContacts} className="btn btn-sm btn-danger">
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

export default AddUserContactList;
