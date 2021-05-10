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



class Senders extends Component {
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
          Manage Customers Sender id's
            <small>Showing all customers sender id's.</small>
          </div>
          <div className="flex-row">
          <Button outline color="danger" className="btn-pill-right mr-2">View Requested SenderId's</Button>
          <Button outline color="danger" className="btn-pill-right">Add New SenderId</Button>
          </div>
        </div>
        <Container fluid>
          <Card>
          <CardHeader>
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
                      <th data-priority="1">ID</th>
                      <th>Customer/Organization</th>
                     
                      <th className="" data-priority="2">
                        Sender
                      </th>
                      <th>DATE REGISTERED</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="gradeA">
                      <td>1</td>
                      <td>TANZANIA BREWERIES PUBLIC LIMITED</td>
                      <td>TBL Info</td>
                      <td>2021-04-27 08:33:37</td>
                      <td>
                        <span className="badge badge-success">Approved</span>
                      </td>
                    </tr>

                    <tr className="gradeA">
                      <td>2</td>
                      <td>HTT Infranco Ltd</td>
                      <td>HTT</td>
                      <td>2021-04-27 08:33:37</td>
                      <td>
                        <span className="badge badge-success">Approved</span>
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

export default Senders;
