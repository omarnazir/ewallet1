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

class RestrictedWords extends Component {
    state = {
        restrictedWordsList: [],
        modal: false,
        mode: true,
        editedRestricted: {
            id:0,
            word: ""
        },
        restricted: {
            word: ""
        }
    };

    initialState = {
        restricted: {
            id:0,
            word: ""
        }
    }


    componentDidMount() {
        this.getAllReservedWords();
    }

    getAllReservedWords() {
        axios.get("/reserved-words")
            .then(res => {
                const restrictedWordsList = res.data;
                this.setState({ restrictedWordsList })

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
            key: "word",
            text: "WORD"
        },
        {
            key: "id",
            text: "ACTION",
            cell: (record, index) => {
                return (
                    <Fragment>
                        <span className="btn badge-success mr-2 px-4" onClick={() => this.EditRestrictedWord(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
                        <span className="btn bg-danger-dark  px-4" onClick={() => this.DeleteRestrictedWord(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
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
                restricted: Object.assign({},
                    this.state.restricted, { [event.target.name]: event.target.value })
            })
        } else {
            this.setState({
                editedRestricted: Object.assign({}, this.state.editedRestricted,
                    { [event.target.name]: event.target.value })
            })
        }
    }

    EditRestrictedWord(row) {
        console.log(row)
        const editedRestricted = {
            id:row.id,
            word: row.word
        }

        this.setState({ editedRestricted })
        this.setState({ mode: false })
        this.toggleModal();
    }

    DeleteRestrictedWord(id) {
        axios.delete("/reserved-words/" + id)
            .then(res => {
                const response = res.data;
                const restrictedWordsList = this.state.restrictedWordsList.filter((item) => {
                    return item.id !== id;
                });
                this.setState({ restrictedWordsList })
            })
    }


    handleSubmit = event => {
        event.preventDefault();
        this.toggleModal();
        if (this.state.mode) {
            console.log("Add mode")
            axios.post("/reserved-words", this.state.restricted).then(res => {
                console.log(res.data);
                this.getAllReservedWords();
                this.setState({ restricted: this.initialState.restricted })
            })
        } else {
            console.log("Edit mode")
            axios.put("/reserved-words", this.state.editedRestricted).then(res => {
                console.log(res.data);
                this.getAllReservedWords();

            })
        }
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Restricted Words
                        <small>These words should not be inside sms templates.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.AddWordMode} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">Add New Word</Button>

                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add New Word" : "Edit Word"}</ModalHeader>
                            <form onSubmit={this.handleSubmit}>
                                <ModalBody>
                                    <FormGroup>
                                        <label>Name :</label>
                                        <input className="form-control" name="word"
                                            value={this.state.mode ? this.state.restricted.word : this.state.editedRestricted.word}
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
                                records={this.state.restrictedWordsList}
                                columns={this.columns}
                            />
                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
        );
    }
}

export default RestrictedWords;
