import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
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
import $ from "jquery";
import Moment from 'moment';
import ReactDatatable from '@ashvin27/react-datatable';




class UserSenderIds extends Component {
  state = {
    senderIdList: []
  };


  componentDidMount() {
    axios.get("/sender-ids/my-sender-ids")
      .then(res => {
        const response = res.data;
        this.setState({ senderIdList: response })
        console.log(response);
      })
  }


  ViewRequestedSenders=()=>{
    return this.props.history.push('/senders-requested')
  }
  AddSenderId=()=>{
    return this.props.history.push('/add-senderid')
  }
  formatDate=(date)=>{
    return Moment(date).format('lll')
  }
  AddActionButtonStyle={
    color:'white',
    background:"#003366"
  }


  deleteSenderId = (id) => {
    axios.delete("/sender-ids/" + id)
      .then(res => {
        const response = res.data;
        const senderIdList = this.state.senderIdList.filter((template) => {
          return template.id !== id;
        });
        this.setState({ senderIdList })
      })
  }

  columns = [
    {
        key: "id",
        text: "#",
        sortable: true,
        cell: (record, index) => {
          return index+=1;
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
        key: "senderId",
        text: "Sender ID",
        sortable: true,
        record:(record,index)=>{
          return (<NumberFormat value={record.smsQuantity} displayType={'text'} thousandSeparator={true} prefix={''} />)
        }
    },
    {
      key: "createdAt",
      text: "DATE REGISTERED",
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

        if(record.is_approved==1){
          return (  <span className="badge badge-success">Approved</span>)
        }

        if(record.is_approved==0){
          return (  <span className="badge badge-warning">Pending</span>)
        }
        if(record.is_approved==2){
          return (   <span className="badge badge-danger">Rejected</span>)
        }
        if(record.is_approved==3){
          return (   <span className="badge badge-danger">Disabled</span>)
        }
      
      }
  },
{
  key: "is_approved",
  text: "ACTION",
  cell: (record, index) => {
    if(record.is_approved==0){
      return (
        <span className="btn bg-danger-dark" onClick={() => this.deleteSenderId(record.id)}>
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
  pagination:'advance',
  filename: "Contact List",
  button: {
   
  },
  language: {
    loading_text: "Please be patient while data loads..."
}
}
  render() {
    let index=0;
    return (
      <ContentWrapper>
       <div className="content-heading">
          <div className="mr-auto flex-row">
            Sender IDs
            <small>Showing all Sender IDs .</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.AddSenderId} style={this.AddActionButtonStyle} className="btn-pill-right">
              Add Sender ID
            </Button>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardBody>
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

export default UserSenderIds;
