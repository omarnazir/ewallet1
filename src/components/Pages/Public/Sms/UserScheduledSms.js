import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable";

import axios from "../../../../services/axios"
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
import Moment from "moment"


class UserScheduledSms extends Component {
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
    smsSchedules:[]
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

  //GO TO COMPOSE SMS
  addSenderId = () => {
    return this.props.history.push("/user/add-senderId");
  };

  formatDate=(date)=>{
    return Moment(date).format('lll')
  }


  componentDidMount() {
    axios.get("/sms-schedules/customer")
      .then(res => {
        const response = res.data;
        this.setState({ smsSchedules: response })
        console.log(response);
      })
  }

  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
          Scheduled SMS
            <small>Showing all scheduled messages.</small>
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
                      SENDER ID
                      </th>
                      <th>MOBILE</th>
                      <th>MESSAGE</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr className="gradeA">
                      <td>1</td>
                      <td>VODACOM</td>
                      <td>255656121885</td>
                      <td>TESTING SMS</td>
                      <td>Mar 20, 2021 at 22:03</td>
                      <td>
                        <span className="badge badge-warning">Pending</span>
                      </td>
                      <td></td>
                    </tr> */}
                    

                    {this.state.smsSchedules.map(row => (
                      <tr key={row.id} className="gradeA">
                        <td>{row.id}</td>
                        <td>{row.SENDER_ID}</td>
                        {/* total mobile numbers */}
                        <td></td> 
                        {/* template */}
                        <td>{row.SMS_REQUEST_FK}</td> 
                        <td>{this.formatDate(row.RUN_DATE)}</td>
                        <td>
                          {row.status == "0" &&
                            <span className="badge badge-warning">Pending</span>
                          }
                          {
                            row.status == "1" &&
                            <span className="badge badge-success">Sent</span>
                          }
                          {
                            row.status == "2" &&
                            <span className="badge badge-danger">Cancelled</span>
                          }
                        
                        </td>
                        
                        { row.status == "0" &&
                          <td>
                             <span className="btn bg-danger-dark" onClick={() => this.DeleteSmsRequest(row.id)}>
                              Cancel</span>
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
              {/* </Datatable> */}
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default UserScheduledSms;
