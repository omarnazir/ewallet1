import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button,Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter } from "reactstrap";
import $ from "jquery";
import { AuthService } from '../../../../services';
import {Redirect} from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';
import Moment from "moment"
import { Fragment } from "react";

import Swal from "sweetalert2"
const MySwal = withReactContent(Swal)
import withReactContent from 'sweetalert2-react-content'

class UserAccountExpiration extends Component {
  state = {
    usersList: [],
    modal: false,
    mode: true,
    expiration:{
      id:0,
      expirationDate:""
    },
    editExpiration:{
      id:0,
      expirationDate:""
    },
  };


  initialState={
    expiration:{
      id:0,
      expirationDate:""
    }
  }

  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }

  this.GetAllUser();
  }

  AddNewUser = () => {
    return this.props.history.push('/admin-manage-users')
}


GetAllUser=()=>{
  axios.get("/users/admin")
  .then(res => {
    const response = res.data;
    this.setState({ usersList: response })
    console.log(response);
  })
}


AddActionButtonStyle={
  color:'white',
  background:"#003366"
}
DisableUser=(row)=>{
  console.log(row.id)

  axios.post("/users/disable/"+row.id)
  .then(res => {
    const response = res.data;
  
    console.log(response);
  })
    this.GetAllUser();

}


EditUser=(row)=>{
  return this.props.history.push('/admin-manage-edit-user/' + row.id, row)
}

formatDate = (date) => {
  return Moment(date).format('lll')
}

formatToCalendarDate = (date) => {
  // 2021-07-24
  return Moment(date).format('YYYY-MM-DD')
}

formatDateToDB = (date) => {
  //07/19/2021 10:49:10
  // YYYY-MM-DD HH:mm:ss
  return Moment(date).format('MM/DD/YYYY HH:mm:ss')
}


EnableUser=(row)=>{
  console.log(row.id)
  axios.post("/users/enable/"+row.id)
  .then(res => {
    const response = res.data;
    console.log(response);
  })
  this.GetAllUser();
}
toggleModal = () => {
  this.setState({
    modal: !this.state.modal
  });
}

AddAccountExpiration = (record) => {
  this.setState({expiration:Object.assign({},
    this.state.expiration,{id:record.id})})
  this.setState({ mode: true })
  this.toggleModal();
}

EditAccountExpiration = (record) => {
 const editExpiration={
    id:record.id,
    expirationDate:this.formatToCalendarDate(record.accountExpiration)
  }
  this.setState({editExpiration})
  this.setState({ mode: false })
  this.toggleModal();
}

deleteCurrentUser(row){
  axios.post("/users/delete/"+ row.id).then(res => {
      console.log(res);
      this.showSweetAlert('success','User deleted Sucessfully')
      this.GetAllUser();
  })
}

showSweetAlert(icon,title) {
  return MySwal.fire({
      position: 'center',
      icon: icon,
      title: title,
      text: "",
      showConfirmButton: false,
      timer: 2000
  })
}

handleChange = event => {       
  if(this.state.mode){
  this.setState({expiration:Object.assign({},
      this.state.expiration,{[event.target.name]:event.target.value})})
  }else {
      this.setState({editExpiration:Object.assign({},this.state.editExpiration,
          {[event.target.name]:event.target.value})})
  }
}

handleSubmit = event => {
  event.preventDefault();
  this.toggleModal();
  if (this.state.mode) {
    console.log("Add mode")
    const data ={
      userId:this.state.expiration.id,
      expirationDate:this.formatDateToDB(this.state.expiration.expirationDate)
    }
  
    axios.put("/users/expiration",data ).then(res => {
      this.GetAllUser()
      this.setState({expiration:this.initialState.expiration})
    })
  } else {
    console.log("Edit mode")   
    const data ={
      userId:this.state.editExpiration.id,
      expirationDate:this.formatDateToDB(this.state.editExpiration.expirationDate)
    }
  
    axios.put("/users/expiration",data ).then(res => {
      this.GetAllUser()
      this.setState({expiration:this.initialState.expiration})
    })
  }
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
      key: "name",
      text: "FULL NAME"
  },

  {
    key: "username",
    text: "USERNAME"
},
{
  key: "roleName",
  text: "ROLE"
},
  {
    key: "isActive",
    text: "STATUS",
    sortable: true,
    cell: (record, index) => {
      if (record.isActive == 1) {
        return (
          <span className="badge badge-success">Active</span>
        );
      }
       if(record.isActive != 1){
        return  (<span className="badge badge-danger">Disabled</span>);
      }
    }
},
{
  key: "accountExpiration",
  text: "EXPIRY DATE",
  sortable: true,
  cell: (record, index) => {
    if(record.accountExpiration!=null){
      return (this.formatDate(record.accountExpiration))
    }else{
      return "N/A";
    }
    
  }
},
{
key: "isActive",
text: "ACTION",
cell: (record, index) => {

  if(record.accountExpiration!=null && record.id!=1){
    return <span className="btn badge-success mr-2 px-4"onClick={()=>this.EditAccountExpiration(record)}> <i className="icon-pencil mr-2"  ></i>Change Expiration</span>
  }else{
    return <span className="btn badge-warning mr-2 px-4"onClick={()=>this.AddAccountExpiration(record)}> <i className="icon-pencil mr-2"  ></i>Set Expiration</span>;
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
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}/>
  }
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Manage Account Expiration
            <small>Manage Admin User account expiration .</small>
          </div>
          <div className="flex-row">
          <Button onClick={this.AddNewUser} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
              <i className="fa fa-clock mr-2"></i>
              Manage Accounts</Button>


            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add Expiration Date" : "Edit Expiration Date"}</ModalHeader>
              <form onSubmit={this.handleSubmit}>
                <ModalBody>
                  <FormGroup>
                    <label>Expiration Date :</label>
                    <input className="form-control" name="expirationDate"
                    value={this.state.mode? this.state.expiration.expirationDate:this.state.editExpiration.expirationDate}
                     onChange={this.handleChange} type="date" required></input>
                  </FormGroup>                 
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
            {/* <span className="btn badge-danger mt-1"> <i className="icon-trash mr-2"></i>Delete</span> <br/>  */}
              <ReactDatatable 
              extraButtons={this.extraButtons}
                config={this.config}
                records={this.state.usersList}
                columns={this.columns}
                 />
                
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default UserAccountExpiration;
