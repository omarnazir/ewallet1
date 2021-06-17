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
import ReactDatatable from '@ashvin27/react-datatable';

class UserScheduledSms extends Component {
  state = {
    smsSchedules: []
  };

  formatDate = (date) => {
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

  columns = [
    {
      key: "id",
      text: "#",
      sortable: true,
      cell: (record, index) => {
        return index += 1;
      }
    },
    {
      key: "senderId",
      text: "Sender ID"
    },
    {
      key: "senderId",
      text: "MOBILE NUMBERS"
    },
    {
      key: "senderId",
      text: "CAMPAIGN"
    },
    {
      key: "createdAt",
      text: "SCHEDULED DATE",
      sortable: true,
      cell: (record, index) => {
        return (this.formatDate(record.createdAt))

      }
    },

    {
      key: "status",
      text: "STATUS",
      sortable: true,
      cell: (record, index) => {

        if (record.is_approved == 1) {
          return (<span className="badge badge-success">Approved</span>)
        }

        if (record.is_approved == 0) {
          return (<span className="badge badge-warning">Pending</span>)
        }
        if (record.is_approved == 2) {
          return (<span className="badge badge-danger">Rejected</span>)
        }
        if (record.is_approved == 3) {
          return (<span className="badge badge-danger">Disabled</span>)
        }

      }
    },
    {
      key: "is_approved",
      text: "ACTION",
      cell: (record, index) => {
        if (record.is_approved == 0) {
          return (
            <span className="btn bg-danger-dark" onClick={() => this.deleteSenderId(record.id)}>
              <i className="icon-trash mr-2"></i>
          CANCEL </span>
          )
        }
      }
    }
  ];


  config = {
    page_size: 10,
    length_menu: [10, 25, 50],
    show_filter: true,
    show_pagination: true,
    pagination: 'advance',
    filename: "Contact List",
    button: {

    },
    language: {
      loading_text: "Please be patient while data loads..."
    }
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

              {/* <tr className="gradeA">
                      <td>1</td>
                      <td>VODACOM</td>
                      <td>255656121885</td>
                      <td>TESTING SMS</td>
                      <td>Mar 20, 2021 at 22:03</td>
                      <td>
                        <span className="badge badge-warning">Pending</span>
                      </td>
                      <td> CANCEL WHEN PENDING</td>
                    </tr> */}




              <ReactDatatable
                extraButtons={this.extraButtons}
                config={this.config}
                records={this.state.senderIdList}
                columns={this.columns}

              />

            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default UserScheduledSms;
