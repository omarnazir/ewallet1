import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import $ from "jquery";
import { AuthService } from '../../../../services';
import {Redirect} from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';
import Moment from "moment"
import { Fragment } from "react";

import Swal from "sweetalert2"
const MySwal = withReactContent(Swal)
import withReactContent from 'sweetalert2-react-content'
import { SuccessAlert, DeleteAlert } from "../../../Common/AppAlerts";

class UsersManagement extends Component {
  state = {
    usersList: [],
    loading:true
  };

  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }

  this.GetAllUser();
  }

  AddNewUser = () => {
    return this.props.history.push('/admin-add-new-user')
}

ViewAccountExpiration =()=>{
  return this.props.history.push('/admin-account-expiration')
}


GetAllUser=()=>{
  axios.get("/users")
  .then(res => {
    const response = res.data;
    this.setState({loading:false})
    this.setState({ usersList: response })
  })
}


AddActionButtonStyle={
  color:'white',
  background:"#003366"
}
DisableUser=(row)=>{
  console.log(row.id)

  axios.put("/users/disable/"+row.id)
  .then(res => {
    const response = res.data;
    this.GetAllUser();
  })

}


EditUser=(row)=>{
  return this.props.history.push('/admin-manage-edit-user/' + row.id, row)
}

formatDate = (date) => {
  return Moment(date).format('lll')
}


EnableUser=(row)=>{
  console.log(row.id)
  axios.put("/users/enable/"+row.id)
  .then(res => {
    const response = res.data;
    console.log(response);
    this.GetAllUser();
  })

}

deleteCurrentUser(row){
  axios.delete("/users/"+ row.id).then(res => {
      console.log(res);
      this.showSweetAlert('success','User deleted Sucessfully')
      this.GetAllUser();
  })
}

AlertDeleteItem(row) {
  DeleteAlert().then((willDelete) => {
      console.log(willDelete);
      if (willDelete) {
          this.deleteCurrentUser(row);
      }
  });
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
  key: "dateCreated",
  text: "REGISTRATION DATE",
  sortable: true,
  cell: (record, index) => {
    return (this.formatDate(record.dateCreated))
  }
},
{
key: "isActive",
text: "ACTION",
cell: (record, index) => {
    if(record.isActive == 1){
     return (
       <Fragment>
          <span className="btn badge-success mr-2 px-4"onClick={()=>this.EditUser(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
          <span className="btn badge-warning px-4 mr-2" onClick={()=>this.DisableUser(record)}> <i className="fa fa-power-off mr-2"></i>Disable</span>
          <span className="btn badge-danger  px-4" onClick={()=>this.AlertDeleteItem(record)}> <i className="icon-trash mr-2"></i>Delete</span>
       </Fragment>
     )
    }else {
     return ( 
       <Fragment>
    <span className="btn badge-success mr-2 px-4"onClick={()=>this.EditUser(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
     <span className="btn badge-primary  px-4 mr-2" onClick={()=>this.EnableUser(record)}> <i className="fa fa-power-off mr-2"></i>Enable</span>
     <span className="btn badge-danger  px-4" onClick={()=>this.deleteCurrentUser(record)}> <i className="icon-trash mr-2"></i>Delete</span>
       </Fragment>
     )}
    
  
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
            Manage User
            <small>Showing all users.</small>
          </div>
          <div className="flex-row">
          {/* <Button onClick={this.ViewAccountExpiration} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
              <i className="fa fa-clock mr-2"></i>
              Manage Account Expiration</Button> */}
            <Button onClick={this.AddNewUser} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
              Add User</Button>
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
                records={this.state.usersList}
                columns={this.columns}
                loading={this.state.loading}
                 />
                
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default UsersManagement;
