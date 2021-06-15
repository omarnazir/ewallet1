import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import $ from "jquery";
import Moment from 'moment';
import { SenderIdService } from "../../../../services"

import ReactDatatable from '@ashvin27/react-datatable';
import { AuthService } from '../../../../services';
import { Redirect } from 'react-router-dom';

class Senders extends Component {
  state = {
    senderIdList: [],
    senderId:'',
    modal: false,
  };


  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }
    this.GetAllSenderIds();

  }

  GetAllSenderIds = () => {
    SenderIdService.GetAllSenderIds().then(res => {
      const response = res.data;
      this.setState({ senderIdList: response })
    })
  }


  columns = [
    {
      key: "id",
      text: "ID",
      cell:(record,index)=>{
        return index+1;
      }
    },
    {
      key: "customerEntity",
      text: "Customer/Organization",
      sortable: true,
      cell: (record, index) => {
        return (record.customerEntity.fullname)
      }
    },
    {
      key: "senderId",
      text: "SENDER",
      sortable: true
    },
    {
      key: "createdAt",
      text: "DATE REGISTERED",
      cell: (record, index) => {
        return (this.formatDate(record.createdAt))
      }
    },
    {
      key: "is_approved",
      text: "STATUS",
      sortable: true,
      cell: (record, index) => {
        if (record.is_approved == 1) {
          return (
            <span className="badge badge-success">Approved</span>
          );
        } else if (record.is_approved == 0) {
          return (<span className="badge badge-warning">Pending</span>)
        } else if (record.is_approved == 2) {
          return (<span className="badge badge-danger">Rejected</span>)
        }
        else {
          return (
            <span className="badge badge-danger">Disabled</span>
          );
        }
      }
    },
    {
      key: "id",
      text: "ACTION",
      cell: (record, index) => {
        if (record.is_approved == 1) {
          return (
            <span className="btn badge-danger" onClick={() => {
              this.DisableSenderId(record);
            }}>Disable</span>
          );
        }
      }
    },



  ]



  ViewRequestedSenders = () => {
    return this.props.history.push('/admin-senders-requested')
  }
  // AddSenderId = () => {
  //   return this.props.history.push('/admin-add-senderid')
  // }
  AddSenderId=()=>{
    this.toggleModal();
  }


  handleSubmit = event => {
    event.preventDefault();
    const sender = {
        senderId: this.state.senderId,

    }
    SenderIdService.AddDefaultSenderId(sender).then(
        res => {
            console.log(res);
            console.log(res.data);
            console.log("saved")
            this.toggleModal();
            this.GetAllSenderIds();
        }
    )
}

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  formatDate = (date) => {
    return Moment(date).format('lll')
  }
  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  }
  
  DisableSenderId = (row) => {
    SenderIdService.DisableSenderId(row.id).then(res => {
      const response = res.data;
      this.GetAllSenderIds();
    })
  }

  config = {
    page_size: 10,
    length_menu: [10, 25, 50],
    show_filter: true,
    show_pagination: true,
    pagination:'advance',
    filename: "Contact List",
    button: {
     
    },
    language: {
      loading_text: "Please be patient while data loads..."
  }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            <h3 style={{ fontWeight: 500 }}>Manage Customers Sender id's</h3>
            <small>Showing all customers sender id's.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.ViewRequestedSenders} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View Requested SenderId's</Button>
            <Button onClick={this.AddSenderId} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
              Add New Default SenderId </Button>

              <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Add New Default Sender Id</ModalHeader>
              <form onSubmit={this.handleSubmit}>
              <ModalBody>
               
                  <div className="form-group px-md-2 px-1">
                    <label>Sender Id :</label>
                    <input className="form-control" name="senderId" onChange={this.handleChange}
                    value={this.state.name}
                     required ></input>
                  </div>
               
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-sm  mr-3 px-4" style={this.AddActionButtonStyle}>
                  Save
                  </button>
              </ModalFooter>
              </form>
            </Modal>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardHeader>
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
            
              <ReactDatatable
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

export default Senders;
