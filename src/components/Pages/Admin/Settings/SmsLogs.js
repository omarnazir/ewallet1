import React, { Component } from 'react';
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import ReactDatatable from '@ashvin27/react-datatable';


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
                this.setState({ operators })
                console.log(operators);
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
            key: "senderId",
            text: "Sender"
        },
        {
            key: "type",
            text: "Type"
        },
        {
            key: "status",
            text: "Status"
        },
        {
            key: "network",
            text: "Network"
        },
        {
            key: "message",
            text: "Message"
        },
        {
            key: "msisdn",
            text: "Recipient"
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


    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        SMS
    <small>List of all SMS's sent.</small>
                    </div>
                    <div className="flex-row">
                    
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

export default SmsLogs;
