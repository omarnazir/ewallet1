import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import {
  Container,
  Card,
  CardBody,
  Button
} from "reactstrap";
import axios from '../../../../services/axios';
import { AuthService } from '../../../../services';
import {Redirect} from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';
import Moment from "moment"
import { Fragment } from "react";
import NumberFormat from 'react-number-format'

class UserPage extends Component {
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

  GetAllUser(){
    axios.get("/users/list")
    .then(res => {
      const response = res.data;
      this.setState({ usersList: response })
      console.log(response);
    })
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

  EnableUser=(row)=>{
    console.log(row.id)
    axios.post("/users/enable/"+row.id)
    .then(res => {
      const response = res.data;
      console.log(response);
    })
    this.GetAllUser();
  }



  formatDate = (date) => {
    return Moment(date).format('lll')
  }

  EditUser=(row)=>{
    return this.props.history.push('/edit-user/' + row.id, row)
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
      key: "userMonthlySmsLimit",
      text: "SMS MONTHLY LIMIT",
      cell:(record,index)=>{
        return (<NumberFormat value={record.userMonthlySmsLimit} displayType={'text'} thousandSeparator={true} prefix={''} />)
      }
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
  

  ViewAddNormalUser = () => {
    return this.props.history.push('/add-user')
  }
  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}/>
  }
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Manage User
            <small>User management panel </small>
          </div>
          <div className="flex-row">
            <Button onClick={this.ViewAddNormalUser} style={this.AddActionButtonStyle} className="btn-pill-right">Add User</Button>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardBody>
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

export default UserPage;
