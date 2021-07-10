import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
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
import Datetime from 'react-datetime';
import $ from "jquery";

import Datatable from "../../../Common/Datatable";
import { AuthService } from "../../../../services/auth.service";
import axios from '../../../../services/axios'


class SingleUserPage extends Component {
  state = {
    user: {}
  };
  componentDidMount() {
    axios.get("/users/me")
      .then(res => {
        const response = res.data;
        this.setState({ user: response })
        console.log(response);
      })
  }

 
  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  }

  render() {
    let index = 0;
    const {id,name,username,userMonthlySmsLimit,isActive}=this.state.user;
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Manage User
            <small>User management panel </small>
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
                  
                      {/* <td>
                        <span className="btn " style={this.AddActionButtonStyle}>Edit</span>
                      </td> */}
                     
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

export default SingleUserPage;
