import React, {Component} from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import axios from "axios";

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            operators: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8085/api/v1/operators`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
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
                    <div>Operators
                        <small>List of all operators</small>
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
                                        <th>Network</th>
                                        <th>Code</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.operators.map(row => (
                                        <tr>
                                            <td>{row.id}</td>
                                            <td>{row.network}</td>
                                            <td>{row.code}</td>
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

export default List;
