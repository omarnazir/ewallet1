import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import {
    Container, Card, CardHeader, CardBody, CardTitle, Button, Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter
} from "reactstrap";
import ReactDatatable from '@ashvin27/react-datatable';
import { Fragment } from "react";

class ReservedNumbers extends Component {
    state = {
        reservedNumbersList: [],
        modal: false,
        mode: true,
        editedNumber: {
          id:0,
            number: ""
        },
        Number: {
          number: ""
        }
    };

    initialState = {
        Number: {
            id:0,
            number: ""
        }
    }


    componentDidMount() {
        this.getAllReservedNumbers();
    }

    getAllReservedNumbers() {
        axios.get("/unsubscribe-numbers")
            .then(res => {
                const reservedNumberList = res.data;
                this.setState({ reservedNumberList })

            })
    }

    columns = [
        {
            key: "id",
            text: "ID",
            cell: (record, index) => {
                return index + 1;
            }
        },
        {
            key: "number",
            text: "NUMBER"
        },
        {
            key: "id",
            text: "ACTION",
            cell: (record, index) => {
                return (
                    <Fragment>
                        <span className="btn badge-success mr-2 px-4" onClick={() => this.EditNumberWord(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
                        <span className="btn bg-danger-dark  px-4" onClick={() => this.DeleteNumberWord(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
                    </Fragment>
                )
            }
        }
    ]

    config = {
        page_size: 10,
        length_menu: [10, 25, 50],
        show_filter: true,
        show_pagination: true,
        pagination: 'advance',
        filename: "Contact List",
        button: {

        },
        language: {
            loading_text: "Please be patient while data loads..."
        }
    }

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    AddWordMode = () => {
        this.setState({ mode: true })
        this.toggleModal();
    }
    handleChange = event => {
        if (this.state.mode) {
            this.setState({
                Number: Object.assign({},
                    this.state.Number, { [event.target.name]: event.target.value })
            })
        } else {
            this.setState({
                editedNumber: Object.assign({}, this.state.editedNumber,
                    { [event.target.name]: event.target.value })
            })
        }
    }

    EditNumberWord(row) {
        console.log(row)
        const editedNumber = {
            id:row.id,
            number: row.number
        }

        this.setState({ editedNumber })
        this.setState({ mode: false })
        this.toggleModal();
    }

    DeleteNumberWord(id) {
        axios.delete("/unsubscribe-numbers/" + id)
            .then(res => {
                const response = res.data;
                const reservedNumberList = this.state.reservedNumberList.filter((item) => {
                    return item.id !== id;
                });
                this.setState({ reservedNumberList })
            })
    }


    handleSubmit = event => {
        event.preventDefault();
        this.toggleModal();
        if (this.state.mode) {
            console.log("Add mode")
            axios.post("/unsubscribe-numbers", this.state.Number).then(res => {
                console.log(res.data);
                this.getAllReservedNumbers();
                this.setState({ Number: this.initialState.Number })
            })
        } else {
            console.log("Edit mode")
            axios.put("/unsubscribe-numbers", this.state.editedNumber).then(res => {
                console.log(res.data);
                this.getAllReservedNumbers();

            })
        }
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                    Reserved Numbers
            <small>Sms should not be sent to these numbers.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.AddWordMode} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">Add New Number</Button>

                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add Reserved Number" : "Edit Reserved Number"}</ModalHeader>
                            <form onSubmit={this.handleSubmit}>
                                <ModalBody>
                                    <FormGroup>
                                        <label>Phone number :</label>
                                        <input className="form-control" name="number"
                                            value={this.state.mode ? this.state.Number.number : this.state.editedNumber.number}
                                            onChange={this.handleChange} type="text" required></input>
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <button className="btn btn-sm btn-success mr-3  px-5" type="submit">
                                        Save
                                    </button>
                                </ModalFooter>
                            </form>
                        </Modal>
                    </div>
                </div>
                <Container fluid>
                    <Card>
                        <CardHeader>
                        </CardHeader>
                        <CardBody>
                            <ReactDatatable
                                extraButtons={this.extraButtons}
                                config={this.config}
                                records={this.state.reservedNumbersList}
                                columns={this.columns}
                            />
                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
        );
    }
}

export default ReservedNumbers;
