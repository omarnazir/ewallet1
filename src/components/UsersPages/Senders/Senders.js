import React, { Component } from "react";
import ContentWrapper from "../../Layout/ContentWrapper";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from "reactstrap";
import Datetime from "react-datetime";
import $ from "jquery";

import Datatable from "../../Common/Datatable";

class UserSenderIds extends Component {
  state = {
    dtOptions: {
      paging: true, // Table pagination
      ordering: true, // Column ordering
      info: true, // Bottom left status text
      responsive: true,
      // Text translation options
      // Note the required keywords between underscores (e.g _MENU_)
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
    }
  };

  // Access to internal datatable instance for customizations
  dtInstance = (dtInstance) => {
    const inputSearchClass = "datatable_input_col_search";
    const columnInputs = $("tfoot ." + inputSearchClass);
    // On input keyup trigger filtering
    columnInputs.keyup(function () {
      dtInstance.fnFilter(this.value, columnInputs.index(this));
    });
  };

  addSenderId = () => {
    return this.props.history.push("/user/add-senderId");
  };
  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Sender id's
            <small>Showing all approved customers sender id's.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.addSenderId} outline color="danger" className="btn-pill-right">
              Add New SenderId
            </Button>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardBody>
              <Datatable options={this.state.dtOptions}>
                <table className="table table-striped my-4 w-100">
                  <thead>
                    <tr>
                      <th data-priority="1">ID</th>
                      <th className="" data-priority="2">
                        Sender
                      </th>
                      <th>STATUS</th>
                      <th>Reason for rejection</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="gradeA">
                      <td>1</td>
                      <td>TBL Info</td>
                      <td>
                        <span className="badge badge-success">Approved</span>
                      </td>
                      <td>N/A</td>
                      <td></td>
                    </tr>
                    
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

export default UserSenderIds;