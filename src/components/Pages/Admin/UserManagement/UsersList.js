import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import $ from "jquery";



class UsersManagement extends Component {
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
    usersList: []
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


  componentDidMount() {
    axios.get("/users")
      .then(res => {
        const response = res.data;
        this.setState({ usersList: response })
        console.log(response);
      })
  }

  AddNewUser = () => {
    return this.props.history.push('/admin/add-new-user')
}

AddActionButtonStyle={
  color:'white',
  background:"#003366"
}
  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Manage User
            <small>Showing all post paid customers.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.AddNewUser} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
              Add User</Button>
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
                      <th data-priority="1">#</th>
                      <th>FULL NAME</th>
                      <th>USERNAME</th>
                      <th>STATUS</th>
                      <th>LAST LOGIN</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.usersList.map(row => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.username}</td>

                        <td>
                          {row.status == 1 &&
                            <span className="badge badge-success">Active</span>
                          }
                          {
                            row.status != 1 &&
                            <span className="badge badge-danger">Disabled</span>
                          }
                        </td>
                        <td>{row.lastLogin}</td>
                        <td> <span className="btn badge-success"> <i className="icon-pencil mr-2"></i>Edit</span> <br />
                          <span className="btn badge-danger mt-1"> <i className="icon-trash mr-2"></i>Delete</span> <br/>
                          <span className="btn badge-danger mt-1"> <i className="icon-info mr-2"></i>Disable</span>
                        </td>
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

export default UsersManagement;