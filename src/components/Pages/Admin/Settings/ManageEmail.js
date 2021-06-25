import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button, Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter } from "reactstrap";
import ReactDatatable from '@ashvin27/react-datatable';
import { Fragment } from "react";

class ManageEmail extends Component {
  state = {
    emailList:[],
    modal: false,
    mode: true,
    editedAlertMail:{
      id:0,
      name:"",
      email:"",
      module:""
    },
    alertMail:{
      name:"",
      email:"",
      module:""
    }
  };

  initialState={
    alertMail:{
      name:"",
      email:"",
      module:""
    }
  }


  componentDidMount(){
  this.getAlertMails();
}

getAlertMails(){
  axios.get("/alert-mails")
  .then(res => {
      const emailList = res.data;
      this.setState({ emailList })
     
  })
}

  columns = [
    {
      key: "id",
      text: "ID",
      cell: (record, index) => {
        return index + 1;
      }
    },
    {
      key: "name",
      text: "NAME"
    },
    {
      key: "email",
      text: "EMAIL"
    },  {
      key: "module",
      text: "MODULE"
    },
    {
      key: "id",
      text: "ACTION",
      cell: (record, index) => {
        return (
          <Fragment>
            <span className="btn badge-success mr-2 px-4" onClick={() => this.EditAlertMail(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
            <span className="btn bg-danger-dark  px-4" onClick={() => this.DeleteAlertMail(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
          </Fragment>
        )
      }
    }
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

  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
}

toggleModal = () => {
  this.setState({
    modal: !this.state.modal
  });
}

AddAlertMailMode = () => {
  this.setState({ mode: true })
  this.toggleModal();
}
handleChange = event => {       
  if(this.state.mode){
  this.setState({alertMail:Object.assign({},
      this.state.alertMail,{[event.target.name]:event.target.value})})
  }else {
      this.setState({editedAlertMail:Object.assign({},this.state.editedAlertMail,
          {[event.target.name]:event.target.value})})
  }
}

EditAlertMail(row) {
  console.log(row)
  const editedAlertMail={
    id:row.id,
    name:row.name,
    email:row.email,
    module:row.module
   }
   this.setState({editedAlertMail})
   this.setState({ mode: false })
   this.toggleModal();
 }

 DeleteAlertMail(id) {
  axios.delete("/alert-mails/" + id)
    .then(res => {
      const response = res.data;
      const emailList = this.state.emailList.filter((item) => {
        return item.id !== id;
      });
      this.setState({ emailList })
    })
}


handleSubmit = event => {
  event.preventDefault();
  this.toggleModal();
  if (this.state.mode) {
    console.log("Add mode")
    axios.post("/alert-mails",this.state.alertMail ).then(res => {
      console.log(res.data);
      this.getAlertMails();
      this.setState({alertMail:this.initialState.alertMail})
    })
  } else {
    console.log("Edit mode")
    axios.put("/alert-mails",this.state.editedAlertMail).then(res => {
      console.log(res.data);
      this.getAlertMails();

    })
  }
}

  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Manage Email
            <small>Manage all send emails.</small>
          </div>
          <div className="flex-row">
          <Button onClick={this.AddAlertMailMode} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">Add New Email</Button>

          <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add Alert Mail" : "Edit Alert Mail"}</ModalHeader>
              <form onSubmit={this.handleSubmit}>
                <ModalBody>
                  <FormGroup>
                    <label>Name :</label>
                    <input className="form-control" name="name"
                    value={this.state.mode? this.state.alertMail.name:this.state.editedAlertMail.name}
                     onChange={this.handleChange} type="text" required></input>
                  </FormGroup>

                  <FormGroup>
                    <label>Email :</label>
                    <input className="form-control" name="email"
                    value={this.state.mode? this.state.alertMail.email:this.state.editedAlertMail.email}
                     onChange={this.handleChange} type="email" required></input>
                  </FormGroup>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Module : </label>
                    <select className="form-control" id="exampleFormControlSelect1" name="module"
                      onChange={this.handleChange}
                      value={this.state.mode? this.state.alertMail.module:this.state.editedAlertMail.module}
                    >
                      <option value="0">Select module</option>
                      <option value="SMS_REQUEST">SMS REQUEST</option>
                      <option value="REGISTRATION">REGISTRATION</option>
                      <option value="SENDER_IDS">SENDER ID</option>
                    </select>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-sm btn-success mr-3  px-5" type="submit">
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
            </CardHeader>
            <CardBody>
              <ReactDatatable
                extraButtons={this.extraButtons}
                config={this.config}
                records={this.state.emailList}
                columns={this.columns}
              />
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default ManageEmail;
