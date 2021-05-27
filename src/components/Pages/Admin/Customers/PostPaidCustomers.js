import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import $ from "jquery";
import Moment from "moment"

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
    }, customersPostPaidList: []
  };


  componentDidMount() {
    axios.get("/customers/post-paid")
      .then(res => {
        const response = res.data;
        this.setState({ customersPostPaidList: response })
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
  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  }

  formatDate = (date) => {
    return Moment(date).format('DD-MM-YYYY')
  }

  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Post Paid Customers
            <small>Showing all post paid customers.</small>
          </div>
          <div className="flex-row">
            
            {/* <Button className="btn-pill-right" style={this.AddActionButtonStyle}>
              <i className="fa fa-plus mr-2"></i>
              Add Post Paid Customer</Button> */}


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
              {/* <Datatable options={this.state.dtOptions}> */}
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

                    {this.state.customersPostPaidList.map(row => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.fullname}</td>
                        <td>{row.email}</td>
                        <td>{row.phonenumber}</td>
                        <td>{row.location}</td>
                        <td>{row.vaccount}</td>
                        {row.monthlyLimit != null && 
                        <td>{row.monthlyLimit}</td>
                        }
                         {row.monthlyLimit == null && 
                        <td>N/A</td>
                        }
                        {/* <td>{row.isActive}</td> */}
                        <td>{row.isActive == 1 &&
                          <span className="badge badge-success">Active</span>
                        }
                          {row.isActive != 1 &&
                            <span className="badge badge-danger">Disabled</span>
                          }
                        </td>

                        <td>{this.formatDate(row.createdAt)}</td>
                        <td>  <Button color="success" className="btn btn-success"
                          onClick={() => {
                            this.ViewCustomerDetails(row);
                          }}
                        >
                          <i className="fa fa-eye"></i>
                        </Button></td>
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

export default PostPaidCustomers;
