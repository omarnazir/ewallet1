import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import $ from "jquery";
import { AuthService } from '../../../../services';
import {Redirect} from 'react-router-dom';


class UsersManagement extends Component {
  state = {
    usersList: []
  };

  // Access to internal datatable instance for customizations
  dtInstance = (dtInstance) => {
    const inputSearchClass = "datatable_input_col_search";
    const columnInputs = $("tfoot ." + inputSearchClass);
    // On input keyup trigger filtering
    columnInputs.keyup(function () {
      dtInstance.fnFilter(this.value, columnInputs.index(this));
    });
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


EnableUser=(row)=>{
  console.log(row.id)
  axios.post("/users/enable/"+row.id)
  .then(res => {
    const response = res.data;
    console.log(response);
  })
  this.GetAllUser();
}


sayHello() {
  alert('Hello!');
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
              {/* <Datatable options={this.state.dtOptions}> */}
                <table className="table table-striped my-4 w-100">
                  <thead>
                    <tr>
                      <th data-priority="1">#</th>
                      <th>FULL NAME</th>
                      <th>USERNAME</th>
                      <th>STATUS</th>
                      <th>LAST LOGIN</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.usersList.map(row => (
                      <tr key={row.id}>
                        <td>{index+=1}</td>
                        <td>{row.name}</td>
                        <td>{row.username}</td>

                        <td>
                          {row.isActive == 1 &&
                            <span className="badge badge-success">Active</span>
                          }
                          {
                            row.isActive != 1 &&
                            <span className="badge badge-danger">Disabled</span>
                          }
                        </td>
                        <td>{row.lastLogin}</td>
                        <td> <span className="btn badge-success"onClick={()=>this.EditUser(row)}> <i className="icon-pencil mr-2"  ></i>Edit</span> <br />
                          {/* <span className="btn badge-danger mt-1"> <i className="icon-trash mr-2"></i>Delete</span> <br/> */}
                          {/* <span className="btn badge-danger mt-1"> <i className="icon-info mr-2"></i>Disable</span> */}
                          {row.isActive == 1 &&
                            <span className="btn badge-danger mt-1" onClick={()=>this.DisableUser(row)}> <i className="icon-info mr-2"></i>Disable</span>
                          }
                          {
                            row.isActive != 1 &&
                            <span className="btn badge-success mt-1" onClick={()=>this.EnableUser(row)}> <i className="icon-tick mr-2"></i>Enable</span>
                          }
                        </td>
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

export default UsersManagement;
