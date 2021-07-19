import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import $ from "jquery";
import { AuthService } from '../../../../services';
import {Redirect} from 'react-router-dom';
import Moment from "moment"
import { Fragment } from "react";
class UserSelfManagement extends Component {
  state = {
    user: {}
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
  axios.get("/users/me")
  .then(res => {
    const response = res.data;
    this.setState({ user: response })
    console.log(response);
  })
}


AddActionButtonStyle={
  color:'white',
  background:"#003366"
}



EditUser=(id)=>{
  console.log("am here")
  return this.props.history.push('/admin-self-edit/' + id,id)
}

formatDate = (date) => {
  return Moment(date).format('lll')
}


  render() {
    let index=0;
    const {id,name,username,userMonthlySmsLimit,isActive}=this.state.user;

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
           
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardBody>
              <table className="table table-striped my-4 w-100">
                <thead>
                  <tr>
                    <th data-priority="1">#</th>
                    <th>FULL NAME</th>
                    <th>USERNAME</th>
                    <th>SMS MONTHLY LIMIT</th>
                    <th>STATUS</th>
                    <th>LAST LOGIN</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  
                    <tr className="gradeA" key={id}>
                      <td>{index += 1}</td>
                      <td>{name}</td>
                      <td>{username}</td>
                      <td>{userMonthlySmsLimit}</td>
                      <td>
                        {isActive == 1 &&

                          <span className="badge badge-success">Active</span>
                        }
                        {
                          isActive !=1 &&
                             <span className="badge badge-danger">Disabled</span>
  }
                      </td>
                      <td>N/A</td>
                  
                      <td>
                        <span className="btn " style={this.AddActionButtonStyle} onClick={()=>this.EditUser(id)} >Edit</span>
                      </td>
                     
                    </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default UserSelfManagement;
