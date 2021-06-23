import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import {
  Container,
  Card,
  CardBody,
  Button, Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import $ from "jquery";
import Moment from 'moment';
import ReactDatatable from '@ashvin27/react-datatable';
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2"
const MySwal = withReactContent(Swal)



class UserSenderIds extends Component {
  state = {
    senderIdList: [],
    formSenderId:"",
    moda:false
  };


  componentDidMount() {
   this.ViewAllSenderIds()
  }

  ViewAllSenderIds(){
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

  showSweetAlert() {
    return MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Added SenderId Sucessfully',
        text: "",
        showConfirmButton: false,
        timer: 2000
    })
}

showFailedSweetAlert() {
  return MySwal.fire({
      position: 'center',
      icon: 'info',
      title: 'Sender ID is already taken',
      text: "",
      showConfirmButton: false,
      timer: 2000
  })
}

  handleSubmit = event => {

    event.preventDefault();
    const sender = {
        "senderId": this.state.formSenderId,
   
    }
  
  
    axios.post("/sender-ids",sender).then(res=>{
      this.toggleModal();
        console.log(res);
        console.log(res.data);
        this.showSweetAlert()
        this.ViewAllSenderIds();
      },err =>{
        this.toggleModal();
        this.showFailedSweetAlert()
      })
  }

  handleChange = event =>{
    this.setState({ [event.target.name]: event.target.value});
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

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
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
        text: "Sender ID"
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
    return (
      <ContentWrapper>
       <div className="content-heading">
          <div className="mr-auto flex-row">
            Sender IDs
            <small>Showing all Sender IDs . *(You can send message with public sender ids without approval.
              For personalized sender Ids requires approval from VODACOM)</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.toggleModal} style={this.AddActionButtonStyle} className="btn-pill-right">
              Add Sender ID
            </Button>

            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Add Sender ID</ModalHeader>
              <form onSubmit={this.handleSubmit}>
              <ModalBody>
               
                  <div className="form-group px-md-2 px-1">
                    <label>Sender Id :</label>
                    <input className="form-control" name="formSenderId" onChange={this.handleChange}
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
