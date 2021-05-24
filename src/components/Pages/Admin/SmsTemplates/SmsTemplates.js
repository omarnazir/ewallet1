import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
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
  Button
} from "reactstrap";
import Datetime from 'react-datetime';
import $ from "jquery";
import axios from "../../../../services/axios";
import Moment from 'moment';
import update from 'immutability-helper';

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
    axios.get("/sms-request")
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

  disableTemplate(id){
    axios.put("/sms-request/disable/" + id)
    .then(res => {
      const response = res.data;
      // const tarrifsList = this.state.tarrifsList.filter((tarrif) => {
      //   return tarrif.id !== id;
      // });
      // this.setState({ tarrifsList })

      const index = this.state.smsTemplateList.findIndex((item) => item.id === id);
      const smsTemplateList = update(this.state.smsTemplateList, {$splice: [[index, 1, res.data]]});  // array.splice(start, deleteCount, item1)
      this.setState({smsTemplateList});
    })
  }

  ViewRequestedTemplates = () => {
    return this.props.history.push('/admin/sms-requested-templates')
  }


  formatDate = (date) => {
    return Moment(date).format('lll')
  }

  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            <br />
            <small>Showing all sms templates </small>
          </div>
          <div className="flex-row">
            <Button onClick={this.ViewRequestedTemplates} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
              View Requested Sms Templates</Button>
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
              {/* <Datatable options={this.state.dtOptions}> */}
                <table className="table table-striped my-4 w-100">
                  <thead>
                    <tr>
                      <th data-priority="1">#</th>
                      <th>Customer Name</th>
                      <th>MESSAGE</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                      <th>Reason for rejection</th>
                      <th>ACTION</th>
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
                           {
                            row.status == "3" &&
                            <span className="badge badge-danger">Disabled</span>
                          }
                        </td>
                        <td>N/A</td>
                        <td> {row.status == "1" &&
                          <button className="btn badge-danger" onClick={() => this.disableTemplate(row.id)}>
                          <i className="icon-info mr-2"></i>
                            Disable</button>
                        }
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

export default SmsTemplates;
