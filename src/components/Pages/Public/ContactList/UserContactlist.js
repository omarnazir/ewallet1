import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from '../../../../services/axios'
import Datatable from "../../../Common/Datatable";
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


class UserContactList extends Component {
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
    }, contactList: []
  };

  componentDidMount() {
    axios.get("/contact-lists/me")
      .then(res => {
        const response = res.data;
        this.setState({ contactList: response })
        console.log(response);
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

  ViewAddContactList = () => {
    return this.props.history.push("/add-contact-list");
  };

  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Contact List
            <small>Showing all contact lists.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.ViewAddContactList} outline color="danger" className="btn-pill-right">
              Add New Contact list
            </Button>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardBody>
              {/* <Datatable options={this.state.dtOptions}> */}
                <table className="table table-striped my-4 w-100">
                  <thead>
                    <tr>
                      <th data-priority="1">ID</th>
                      <th className="" data-priority="2">
                        TITLE
                      </th>
                      <th>COUNT</th>
                      <th>DESCRIPTION</th>
                      <th>STATUS</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                  {this.state.contactList.map(row => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.title}</td>
                        <td>{row.count}</td>
                        <td>{row.description}</td>
                        {row.isActive== 1 &&
                        <td><span className="badge badge-success">Active</span></td>
                         }
                         {row.isActive!= 1 &&
                        <td><span className="badge badge-success">Disabled</span></td>
                         }
                        <td>
                        {/* <span className="btn badge-success mr-1">Edit</span> */}
                      {/* <span className="btn badge-danger">Delete</span> */}
                         N/A
                        </td>
                      </tr>
                    ))}  
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

export default UserContactList;
