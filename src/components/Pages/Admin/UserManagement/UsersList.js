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
class UsersManagement extends Component {
  state = {
    usersList: []
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


GetAllUser=()=>{
  axios.get("/users")
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


EnableUser=(row)=>{
  console.log(row.id)
  axios.post("/users/enable/"+row.id)
  .then(res => {
    const response = res.data;
    console.log(response);
  })
  this.GetAllUser();
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
    key: "roleName",
    text: "ROLE"
},
  {
    key: "username",
    text: "USERNAME"
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
      key: "lastLogin",
      text: "LAST LOGIN",
      cell: (record, index) => {
        if(record.lastLogin == null){
          return "N/A"
        }else {
        return (this.formatDate(record.lastLogin))
        }
      }

  },
{
  key: "createdAt",
  text: "DATE CREATED",
  sortable: true,
  cell: (record, index) => {
    return (this.formatDate(record.registrationDate))
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
          <span className="btn badge-danger px-4" onClick={()=>this.DisableUser(record)}> <i className="fa fa-power-off mr-2"></i>Disable</span>
       </Fragment>
     )
    }else {
     return ( 
       <Fragment>
    <span className="btn badge-success mr-2 px-4"onClick={()=>this.EditUser(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
     <span className="btn badge-success  px-4" onClick={()=>this.EnableUser(record)}> <i className="fa fa-power-off mr-2"></i>Enable</span>
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
            <small>Showing all post paid customers.</small>
          </div>
          <div className="flex-row">
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

export default UsersManagement;
