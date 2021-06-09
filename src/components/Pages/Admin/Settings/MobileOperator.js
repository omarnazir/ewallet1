import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button,ModalHeader,Modal,
    ModalBody,
    ModalFooter,
    FormGroup } from "reactstrap";
import $ from "jquery";



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

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Mobile operator
            <small>Showing all mobile operators.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.toggleModal} className="btn-pill-right">Add New Operator</Button>

                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>{this.state.AddTariffMode?"Add Mobile operator":"Edit Mobile operator"}</ModalHeader>
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
                {/* <button onClick={this.hideToggelModal} className="btn btn-sm btn-danger px-4">
                  Cancel
                  </button> */}
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
                            <Datatable options={this.state.dtOptions}>
                                <table className="table table-striped my-4 w-100">
                                    <thead>
                                        <tr>
                                            <th data-priority="1">ID</th>
                                            <th>Network</th>
                                            <th>Code</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.operators.map(row => (
                                            <tr className="gradeA">
                                                <td>{row.id}</td>
                                                <td>{row.network}</td>
                                                <td>{row.code}</td>
                                                <td></td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </Datatable>
                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
        );
    }
}

export default MobileOperator;
