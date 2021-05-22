import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios"
import Datatable from "../../../Common/Datatable"
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Input,
  Button
} from "reactstrap";
import Datetime from 'react-datetime';
import $ from "jquery";

import Moment from 'moment';

class UserRequestedSmsList extends Component {
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
    smsTemplateList: []
  };

  componentDidMount() {
    axios.get(`http://localhost:8085/api/v1/sms-request/me`)
      .then(res => {
        const response = res.data;
        this.setState({ smsTemplateList: response })
        console.log(response);
      })
  }

  AddActionButtonStyle={
    color:'white',
    background:"#003366"
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

  AddSmsTemplates = () => {
    return this.props.history.push('/add-sms-request')
  }

  formatDate=(date)=>{
    return Moment(date).format('lll')
  }

  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Requested SMS Templates
          <br />
            <small>Showing all sms templates </small>
          </div>
          <div className="flex-row">
            <Button onClick={this.AddSmsTemplates} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
              Add New SMS Template</Button>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardBody>
              <Datatable options={this.state.dtOptions}>
                <table className="table table-striped my-4 w-100">
                  <thead>
                    <tr>
                      <th data-priority="1">#</th>
                      <th>Customer Name</th>
                      <th>MESSAGE</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                      <th>Reason for rejection</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.smsTemplateList.map(row => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        {/* <td>SCANIA TANZANIA LTD</td> */}
                        <td>{row.customerFk}</td>
                        <td>{row.messageTemplate}</td>
                        <td>{this.formatDate(row.dateCreated)}</td>
                        <td>
                          {row.status == "0" &&
                            <span className="badge badge-warning">Pending</span>
                          }
                          {
                            row.status == "1" &&
                            <span className="badge badge-success">Approved</span>
                          }
                          {
                            row.status == "2" &&
                            <span className="badge badge-danger">Rejected</span>
                          }
                        </td>
                        <td>N/A</td>
                        { row.status == "0" &&
                          <td>
                            <span className="btn badge-danger mt-1">Delete</span>
                          </td>
                        }
                        {
                          row.status != "0" &&
                          <td>
                            N/A
                          </td>
                        }
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

export default UserRequestedSmsList;
