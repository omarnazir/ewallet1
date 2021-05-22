import React, {Component} from 'react';
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';

class SmsLogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            operators: []
        }
    }

    componentDidMount() {
        axios.get("/sms")
            .then(res => {
                const operators = res.data;
                this.setState({operators})
                console.log(operators);
            })
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>SMS
                        <small>List of all SMSes sent</small>
                    </div>
                </div>
                {/* START row */}
                <Row>
                    <Col xl="12">
                        <Card className="card-default">
                            <CardHeader>Striped Rows</CardHeader>
                            <CardBody>
                                <Table striped hover responsive>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Sender</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Network</th>
                                        <th>Message</th>
                                        <th>Recipient</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.operators.map(row => (
                                        <tr>
                                            <td>{row.id}</td>
                                            <td>{row.sender}</td>
                                            <td>{row.type}</td>
                                            <td>{row.status}</td>
                                            <td>{row.network}</td>
                                            <td>{row.message}</td>
                                            <td>{row.msisdn}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {/* END row */}
            </ContentWrapper>
        );
    }
}

export default SmsLogs;
