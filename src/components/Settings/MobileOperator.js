import React, { Component } from "react";
import ContentWrapper from "../Layout/ContentWrapper";
import Datatable from "../Common/Datatable";
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import $ from "jquery";
import axios from "axios";


class MobileOperator extends Component {
    state = {
        dtOptions: {
            paging: true, // Table pagination
            ordering: true, // Column ordering
            info: true, // Bottom left status text
            responsive: true,
            oLanguage: {
                sSearch: '<em class="fa fa-search"></em>',
                sLengthMenu: "_MENU_ records per page",
                info: "Showing page _PAGE_ of _PAGES_",
                zeroRecords: "Nothing found - sorry",
                infoEmpty: "No records available",
                infoFiltered: "(filtered from _MAX_ total records)",
                oPaginate: {
                    sNext: '<em class="fa fa-caret-right"></em>',
                    sPrevious: '<em class="fa fa-caret-left"></em>',
                },
            },
            // Datatable Buttons setup
            dom: "Bfrtip",
            buttons: [
                { extend: "csv", className: "btn-info" },
                { extend: "excel", className: "btn-info", title: "XLS-File" },
                { extend: "pdf", className: "btn-info", title: $("title").text() },
                { extend: "print", className: "btn-info" },
            ],
        },
        operators: []
    };

    componentDidMount() {
        axios.get(`http://localhost:8085/api/v1/operators`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                const operators = res.data;
                this.setState({ operators })
                console.log(operators);
            })
    }

    // Access to internal datatable instance for customizations
    dtInstance = (dtInstance) => {
        const inputSearchClass = "datatable_input_col_search";
        const columnInputs = $("tfoot ." + inputSearchClass);
        // On input keyup trigger filtering
        columnInputs.keyup(function () {
            dtInstance.fnFilter(this.value, columnInputs.index(this));
        });
    };

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Mobile operator
            <small>Showing all mobile operators.</small>
                    </div>
                    <div className="flex-row">
                        <Button outline color="danger" className="btn-pill-right">Add New Operator</Button>
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
