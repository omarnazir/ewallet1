import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
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
  Button
} from "reactstrap";
import Datetime from 'react-datetime';
import $ from "jquery";
import Moment from 'moment';
import ReactDatatable from '@ashvin27/react-datatable';


class UserRequestedSmsList extends Component {
  state = {
    smsTemplateList: []
  };

  componentDidMount() {
    axios.get("/sms-request/me")
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
  AddSmsTemplates = () => {
    return this.props.history.push('/add-sms-request')
  }

  formatDate = (date) => {
    return Moment(date).format('lll')
  }

  DeleteSmsRequest(id) {
    axios.delete("/sms-request/" + id)
      .then(res => {
        const response = res.data;
        const smsTemplateList = this.state.smsTemplateList.filter((item) => {
          return item.id !== id;
        });
        this.setState({ smsTemplateList: smsTemplateList })
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
      key: "customerEntity",
      text: "Customer/Organization",
      cell: (record, index) => {
        return record.customerEntity.fullname
      }
    },
    {
      key: "messageTemplate",
      text: "MESSAGE"
    },
    {
      key: "createdAt",
      text: "DATE    ",
      cell: (record, index) => {
        return (this.formatDate(record.createdAt))

      }
    },

    {
      key: "status",
      text: "STATUS",
      cell: (record, index) => {
        if (record.status == 1) {
          return (<span className="badge badge-success">Approved</span>)
        }

        if (record.status == 0) {
          return (<span className="badge badge-warning">Pending</span>)
        }
        if (record.status == 2) {
          return (<span className="badge badge-danger">Rejected</span>)
        }
        if (record.status == 3) {
          return (<span className="badge badge-danger">Disabled</span>)
        }

      }
    },
    {
      key: "id",
      text: "Reason for rejection",
      cell: (record, index) => {
        return ("N/A")

      }
    },
    {
      key: "status",
      text: "ACTION",
      cell: (record, index) => {
        if (record.status == 0) {
          return (
            <span className="btn bg-danger-dark" onClick={() => this.DeleteSmsRequest(record.id)}>
              <i className="icon-trash mr-2"></i>
          Delete</span>
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
            Requested SMS Templates
          <br />
            <small>Showing all sms templates </small>
          </div>
          <div className="flex-row">
            <Button onClick={this.AddSmsTemplates} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
              Add New SMS Template</Button>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardBody>



              <ReactDatatable
                extraButtons={this.extraButtons}
                config={this.config}
                records={this.state.smsTemplateList}
                columns={this.columns}

              />
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default UserRequestedSmsList;
