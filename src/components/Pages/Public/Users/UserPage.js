import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
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

import Datatable from "../../../Common/Datatable";
import { AuthService } from "../../../../services";
import axios from '../../../../services/axios'


class UserPage extends Component {
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
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }

    axios.get("/users/list")
      .then(res => {
        const response = res.data;
        this.setState({ usersList: response })
        console.log(response);
      })
  }

  ViewAddNormalUser = () => {
    return this.props.history.push('/add-user')
  }
  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  }

  render() {
    let index = 0;
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Manage User
            <small>User management panel </small>
          </div>
          <div className="flex-row">
            <Button onClick={this.ViewAddNormalUser} style={this.AddActionButtonStyle} className="btn-pill-right">Add User</Button>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardBody>
              {/* <Datatable options={this.state.dtOptions}> */}
              <table className="table table-striped my-4 w-100">
                <thead>
                  <tr>
                    <th data-priority="1">#</th>
                    <th>FULL NAME</th>
                    <th>USERNAME</th>
                    <th>SMS MONTHLY LIMIT</th>
                    <th>STATUS</th>
                    <th>LAST LOGIN</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.usersList.map(row =>
                    <tr className="gradeA" key={row.id}>
                      <td>{index += 1}</td>
                      <td>{row.name}</td>
                      <td>{row.username}</td>
                      <td>{row.userMonthlySmsLimit}</td>
                      <td>
                        {row.isActive == 1 &&

                          <span className="badge badge-success">Active</span>
                        }
                        {
                          row.isActive !=1 &&
                             <span className="badge badge-danger">Disabled</span>
                        }
                       
                      {/* <span className="badge badge-danger">Rejected</span> */}

                      </td>
                      <td>N/A</td>
                      <td>
                        <span className="btn " style={this.AddActionButtonStyle}>Edit</span>
                        <br />
                        {/* <span className="btn badge-danger mt-1">Delete</span> */}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* </Datatable> */}
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default UserPage;
