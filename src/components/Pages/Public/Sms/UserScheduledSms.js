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
    this.getSmsSchedules();
  }

  getSmsSchedules=()=>{
    axios.get("/sms-schedules/customer")
    .then(res => {
      const response = res.data;
      this.setState({ smsSchedules: response })
      console.log(response);
    })
  }
  CancelScheduled(id) {
    axios.post("/sms-schedules/cancel/" + id)
      .then(res => {
        const response = res.data;
       this.getSmsSchedules();
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
      text: "SENDER ID"
    },
    // {
    //   key: "senderId",
    //   text: "MOBILE NUMBERS"
    // },
    {
      key:"contactType",
      text:"METHOD",
      cell: (record, index) => {

        if (record.contactType == "numbers") {
          return ("Phone Numbers")
        }

        if (record.contactType == "contactList") {
          return ("Contact List")
        }
        if (record.contactType == "file") {
          return ("Contacts File")
        }
      }
    },
    // {
    //   key: "senderId",
    //   text: "CAMPAIGN"
    // },
    {
      key: "runDate",
      text: "RUN DATE",
      sortable: true,
      cell: (record, index) => {
        return (this.formatDate(record.runDate))

      }
    },
    {
      key: "createdAt",
      text: "CREATED DATE",
      sortable: true,
      cell: (record, index) => {
        return (this.formatDate(record.createdAt))

      }
    },

    {
      key: "isExecuted",
      text: "STATUS",
      sortable: true,
      cell: (record, index) => {

        if (record.isExecuted == 1) {
          return (<span className="badge badge-success">Runned</span>)
        }

        if (record.isExecuted == 0) {
          return (<span className="badge badge-warning">Pending</span>)
        }
        if (record.isExecuted == 2) {
          return (<span className="badge badge-danger">Cancelled</span>)
        }
      }
    },
    {
      key: "is_approved",
      text: "ACTION",
      cell: (record, index) => {
        if (record.isExecuted == 0) {
          return (
            <span className="btn bg-danger-dark" onClick={() => this.CancelScheduled(record.id)}>
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
              <ReactDatatable
                extraButtons={this.extraButtons}
                config={this.config}
                records={this.state.smsSchedules}
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
