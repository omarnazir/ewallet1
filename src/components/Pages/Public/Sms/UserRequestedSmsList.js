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

  AddActionButtonStyle={
    color:'white',
    background:"#003366"
  }
  AddSmsTemplates = () => {
    return this.props.history.push('/add-sms-request')
  }

  formatDate=(date)=>{
    return Moment(date).format('lll')
  }

  DeleteSmsRequest(id){
    axios.delete("/sms-request/" + id)
    .then(res => {
      const response = res.data;
      const smsTemplateList = this.state.smsTemplateList.filter((item) => {
        return item.id !== id;
      });
      this.setState({ smsTemplateList:smsTemplateList })
    })
  }



  render() {
    let index=0;
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
                        <td>{index+=1}</td>
                        {/* <td>SCANIA TANZANIA LTD</td> */}
                        <td>{row.customerEntity.fullname}</td>
                        <td>{row.messageTemplate}</td>
                        <td>{this.formatDate(row.dateCreated)}</td>
                        <td>
                          {row.status == "0" &&
                            <span className="badge badge-warning">Pending</span>
                          }
                          {
                            row.status == "1" &&
                            <span className="badge badge-success">Approved</span>
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
                        { row.status == "0" &&
                          <td>
                             <span className="btn bg-danger-dark" onClick={() => this.DeleteSmsRequest(row.id)}>
                            <i className="icon-trash mr-2"></i>
                              Delete</span>
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

export default UserRequestedSmsList;
