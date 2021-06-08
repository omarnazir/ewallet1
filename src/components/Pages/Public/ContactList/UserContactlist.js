import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from '../../../../services/axios'
import Datatable from "../../../Common/Datatable";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from "reactstrap";
import Datetime from "react-datetime";
import $ from "jquery";


class UserContactList extends Component {
  state = {
   contactList: []
  };

  componentDidMount() {
    axios.get("/contact-lists/me")
      .then(res => {
        const response = res.data;
        this.setState({ contactList: response })
        console.log(response);
      })
  }

  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
}
  ViewAddContactList = () => {
    return this.props.history.push("/add-contact-list");
  };

  

  DeleteUserContactList(id) {
    axios.delete("/contact-lists/" + id)
      .then(res => {
        const response = res.data;
        // this.setState({ tariffBandList: response })
        const tariffBandList = this.state.tariffBandList.filter((item) => {
          return item.id !== id;
        });
        this.setState({ tariffBandList })
      })
  }

  ViewContactListDetails(row) {
    return this.props.history.push('/view-contactlist/' + row.id, row)
  }

  render() {
    let index=0;
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Contact List
            <small>Showing all contact lists.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.ViewAddContactList} style={this.AddActionButtonStyle} className="btn-pill-right">
              Add New Contact list
            </Button>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardBody>
              {/* <Datatable options={this.state.dtOptions}> */}
                <table className="table table-striped my-4 w-100">
                  <thead>
                    <tr>
                      <th data-priority="1">ID</th>
                      <th className="" data-priority="2">
                        TITLE
                      </th>
                      <th>COUNT</th>
                      <th>DESCRIPTION</th>
                      <th>STATUS</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                  {this.state.contactList.map(row => (
                      <tr key={row.id}>
                        <td>{index+=1}</td>
                        <td>{row.title}</td>
                        <td>{row.count}</td>
                        <td>{row.description}</td>
                        {row.isActive== 1 &&
                        <td><span className="badge badge-success">Active</span></td>
                         }
                         {row.isActive!= 1 &&
                        <td><span className="badge badge-success">Disabled</span></td>
                         }
                        <td>
                        <span className="btn badge-success mr-1" onClick={()=>this.ViewContactListDetails(row)}>View</span>
                        <span className="btn badge-danger" onClick={() => this.DeleteUserContactList(row.id)}>Delete</span>
                         {/* N/A */}
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

export default UserContactList;
