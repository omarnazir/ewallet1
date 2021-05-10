import React, { Component } from "react";
import ContentWrapper from "../Layout/ContentWrapper";
import Datatable from "../Common/Datatable";
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



class SmsTemplates extends Component {
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
            <Button outline color="danger" className="btn-pill-right">Add New SMS Template</Button>
          </div>
        </div>
        <Container fluid>
          <Card>
          <CardHeader>
              <CardTitle>
              Showing all sms templates from <strong> MAR 29,2021 </strong> to <strong> APR 29,2021 </strong>
              </CardTitle>
              <div className="row">
                <Card className="col-sm-12">
                  <CardBody>
                    <form onSubmit={this.onSubmit}>
                      <div className="form-row align-items-center">
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label>From :</label>
                            <input className="form-control" type="date" />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label>To: </label>
                            <input className="form-control" type="date" />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div class="form-group">
                            <label for="exampleFormControlSelect1">No of records: </label>
                            <select class="form-control" id="exampleFormControlSelect1">
                              <option>All</option>
                              <option>100</option>
                              <option>200</option>
                              <option>500</option>
                              <option>1000</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <button type="submit" className="btn btn-info mt-2">
                            Search
                          </button>
                        </div>

                      </div>
                    </form>
                  </CardBody>
                </Card>
              </div>
            </CardHeader>
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
                    <tr className="gradeA">
                      <td>1</td>
                      <td>SCANIA TANZANIA LTD</td>
                      <td>Bidhaa na huduma zenye viwango vya kimataifa zipo karibu kukufikia Tunduma.
                         Kaa Tayari!. Kwa maelezo zaidi tupigie 0784722630</td>
                      <td>Apr 28, 2021 at 12:36</td>
                      <td>
                        <span className="badge badge-warning">Pending</span>
                        <span className="badge badge-danger">Rejected</span>
                        <span className="badge badge-success">Approved</span>
                      </td>
                      <td>N/A</td>
                      <td>
                        <span className="btn badge-success">Approved</span>
                        <br />
                        <span className="btn badge-danger mt-1">Reject</span>
                      </td>


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

export default SmsTemplates;
