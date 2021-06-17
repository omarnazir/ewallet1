import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios"
import {
    Container,
    Card,
    CardBody,
    Button,
    FormGroup
} from "reactstrap";

class AddUserContactList extends Component {


    state = {
        file: '',
        title: "",
        description: ""
    };


    ViewAllContacts = () => {
        return this.props.history.push('/contact-lists')
    }


    handleSubmit = event => {
        event.preventDefault()
        const data = new FormData()
        data.append("title", this.state.title)
        data.append("description", this.state.description)
        data.append('file', this.state.file)

        axios.post("/contact-lists", data, { headers: { "Content-Type": "multipart/form-data" } }).then(res => {
            console.log(res);
            console.log(res.data);
            this.ViewAllContacts();
        })
    }

    handleFileChange = event => {
        this.setState({ file: event.target.files[0] });
    }


    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });

    }

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
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
                        <Button onClick={this.ViewAllContacts} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Contact lists</Button>
                    </div>
                </div>
                <Container fluid>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <Card className="card-default">
                                <CardBody>
                                    <form onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <label>Contact list Name :</label>
                                            <input className="form-control" name="title" required onChange={this.handleChange}></input>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Description:</label>
                                            <input className="form-control" name="description" required onChange={this.handleChange}></input>
                                        </FormGroup>

                                        <FormGroup>
                                            <label>Select File (Excel xls or xslx) :</label>
                                            <input
                                                accept="application/vnd.ms-excel, text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                                type="file"
                                                className="form-control form-control-file"
                                                name="file"
                                                id="csvupload"
                                                required
                                                onChange={this.handleFileChange}
                                            />
                                        </FormGroup>

                                        <button className="btn btn-sm btn-success mr-3 px-5" type="submit">
                                            Save
                                        </button>
                                        <button onClick={this.ViewAllContacts} className="btn btn-sm btn-danger px-5">
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
