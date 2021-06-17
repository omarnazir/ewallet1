import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import {
    Container, Card, CardHeader, CardBody, CardTitle, Button, ModalHeader, Modal,
    ModalBody,
    ModalFooter,
    FormGroup
} from "reactstrap";
import $ from "jquery";
import ReactDatatable from '@ashvin27/react-datatable';
import Moment from "moment"
import { Fragment } from "react";


class MobileOperator extends Component {
    state = {
        operators: []
    };

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        axios.get("/operators")
            .then(res => {
                const operators = res.data;
                this.setState({ operators })
                console.log(operators);
            })
    }

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
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
            key: "network",
            text: "NETWORK"
        },
        {
            key: "code",
            text: "CODE"
        },
        {
            key: "id",
            text: "ACTION",
            cell: (record, index) => {
                return (
                    <Fragment>
                        <span className="btn badge-success mr-2 px-4" onClick={() => this.EditUser(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
                        <span className="btn badge-danger  px-4" onClick={() => this.EnableUser(record)}> <i className="fa fa-trash mr-2"></i>Delete</span>
                    </Fragment>
                )
            }
        }
    ]


    render() {
        return (
            <ContentWrapper>

                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Mobile operator
            <small>Showing all mobile operators.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.toggleModal} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">Add New Operator</Button>

                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>{this.state.AddTariffMode ? "Add Mobile operator" : "Edit Mobile operator"}</ModalHeader>
                            <form onSubmit={this.handleSubmit}>
                                <ModalBody>

                                    <div className="form-group px-md-2 px-1">
                                        <label>Network Name :</label>
                                        <input className="form-control" name="name" onChange={this.handleChange}
                                            value={this.state.name}
                                            required ></input>
                                    </div>

                                    <div className="form-group px-md-2 px-1">
                                        <label>Code :</label>
                                        <input className="form-control" name="name" onChange={this.handleChange}
                                            value={this.state.name}
                                            required ></input>
                                    </div>

                                </ModalBody>
                                <ModalFooter>
                                    <button className="btn btn-sm  mr-3 px-4" style={this.AddActionButtonStyle}>
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
                                records={this.state.operators}
                                columns={this.columns}
                            />


                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
        );
    }
}

export default MobileOperator;
