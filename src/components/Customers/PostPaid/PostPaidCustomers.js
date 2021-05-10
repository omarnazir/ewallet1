import React, { Component } from "react";
import ContentWrapper from "../../Layout/ContentWrapper";
import Datatable from "../../Common/Datatable";
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import $ from "jquery";



class PostPaidCustomers extends Component {
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
            Post Paid Customers
            <small>Showing all post paid customers.</small>
          </div>
          <div className="flex-row">
            {/* <Button outline color="danger" className="btn-pill-right">Add Post Paid Customer</Button> */}
            {/* <Link outline color="danger" className="btn-pill-right">Add Post Paid Customer</Link> */}
            {/* <Link to="dashboard" className="btn btn-pill-right">
            <span outline color="danger" className="btn-pill-right">Add Post Paid Customer</span>
              </Link> */}
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardHeader>
              {/* <CardTitle>Export Buttons</CardTitle> */}
            </CardHeader>
            <CardBody>
              <Datatable options={this.state.dtOptions}>
                <table className="table table-striped my-4 w-100">
                  <thead>
                    <tr>
                      <th data-priority="1">#</th>
                      <th>CUSTOMER NAME</th>
                      <th>EMAIL</th>
                      <th className="sort-numeric">PHONE</th>
                      <th className="sort-alpha" data-priority="2">
                        ADDRESS
                      </th>
                      <th>V_ACCOUNT</th>
                      <th>MONTHLY SMS LIMIT</th>
                      <th>STATUS</th>
                      <th>DATE REGISTERED</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr className="gradeA">
                      <td>Gecko</td>
                      <td>Netscape 7.2</td>
                      <td>Win 95+ / Mac OS 8.6-9.2</td>
                      <td>1.7</td>
                      <td>A</td>
                    </tr> */}


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

export default PostPaidCustomers;
