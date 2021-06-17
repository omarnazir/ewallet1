import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap";
import { AuthService } from "../../../../services"
import { Redirect } from 'react-router-dom';
import axios from '../../../../services/axios'
import Moment from "moment";
import ReactDatatable from '@ashvin27/react-datatable';

class UserOutbox extends Component {
  state = {
    isAuthenticated: false,
    smsList: []
  };

  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }

    axios.get("/sms/customer")
      .then(res => {
        const response = res.data;
        this.setState({ smsList: response })
        console.log(response);
      })
  }
  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  }

  formatDate = (date) => {
    return Moment(date).format('lll')
  }

  //GO TO COMPOSE SMS
  ViewComposeSms = () => {
    return this.props.history.push("/send-sms");
  };





  columns = [
    {
      key: "id",
      text: "ID",
      cell: (record, index) => {
        return index + 1;
      }
    },
    {
      key: "senderId",
      text: "Sender"
    },
    {
      key: "msisdn",
      text: "SENT TO"
    },
    {
      key: "network",
      text: "NETWORK"
    },
    {
      key: "message",
      text: "MESSAGE"
    },
    {
      key: "smsCount",
      text: "UNITS"
    },
    {
      key: "createdAt",
      text: "DATE",
      cell:(record,index)=>{
        return (this.formatDate(record.createdAt))
      }

    },
    {
      key: "message",
      text: "STATUS",
      cell: (record, index) => {
        if (record.status == "Delivered") {
          return (<span className="badge badge-success">{record.status}</span>)
        }
        if (record.status == "Failed") {
          return (<span className="badge badge-danger">{record.status}</span>)
        }
        if (record.status == "PENDING") {
          return (<span className="badge badge-warning">Pending</span>)
        }
      }
    },

  ]

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
    if (this.state.redirect) {
      return <Redirect to="/login" />
    }
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Sent Sms
            <small>Showing all sent messages.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.ViewComposeSms} style={this.AddActionButtonStyle} className="btn-pill-right">
              Compose SMS
            </Button>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardBody>
              <ReactDatatable
                extraButtons={this.extraButtons}
                config={this.config}
                records={this.state.smsList}
                columns={this.columns}
              />

            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default UserOutbox;
