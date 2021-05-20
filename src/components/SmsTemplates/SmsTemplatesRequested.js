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
import axios from "../../services/axios";
import Moment from 'moment';

class SmsTemplatesRequested extends Component {
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
    axios.get("/sms-request/pending")
      .then(res => {
        const response = res.data;
        this.setState({ smsTemplateList: response })
        console.log(response);
      })

  }

  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
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
    return this.props.history.push('/admin/add-sms-templates')
  }

  formatDate = (date) => {
    return Moment(date).format('lll')
  }
  ViewAllSmsTemplates = () => {
    return this.props.history.push('/admin/sms-templates')
  }

  // ApproveTemplate(row){
  //   console.log("clicked")
  //   // const value=e.target.value;
  //   // console.log(value)
  // }

  RejectTemplate = (e) => {
    const value = e.target.value;
    console.log(value)
  }

  ApproveTemplate = (id) => {
    // setBooks(books.filter((book) => book.id !== id));
    console.log("clicked" + id)
  };

  ApproveTemplate = (id) => {
    axios.put("/sms-request/approve/" + id)
      .then(res => {
        const response = res.data;
        const smsTemplateList = this.state.smsTemplateList.filter((template) => {
          return template.id !== id;
        });
        this.setState({ smsTemplateList })
      })
  }
  RejectTemplate = (id) => {
    axios.put("/sms-request/reject/" + id)
      .then(res => {
        const response = res.data;
        const smsTemplateList = this.state.smsTemplateList.filter((template) => {
          return template.id !== id;
        });
        this.setState({ smsTemplateList })
      })
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
            <Button onClick={this.ViewAllSmsTemplates} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Sms Templates</Button>
            <Button onClick={this.AddSmsTemplates} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
              Add New SMS Template</Button>
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
                          <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">No of records: </label>
                            <select className="form-control" id="exampleFormControlSelect1">
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
                        {row.status == "1" &&
                          <span className="badge badge-success">Approved</span>
                        }
                        {
                          row.status == "0" &&
                          <span className="badge badge-warning">Pending</span>
                        }
                        {
                          row.status == "2" &&
                          <span className="badge badge-danger">Rejected</span>
                        }
                      </td>
                      <td>N/A</td>
                      { row.status == "0" &&

                        <td>
                          <span className="btn badge-success mr-1" style={this.AddActionButtonStyle} onClick={() => this.ApproveTemplate(row.id)}>Approved</span>
                          <span className="btn badge-danger" onClick={() => this.RejectTemplate(row.id)}>Rejected</span>
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
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default SmsTemplatesRequested;
