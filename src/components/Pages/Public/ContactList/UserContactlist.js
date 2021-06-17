import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from '../../../../services/axios'
import {
  Container,
  Card,
  CardBody,
  Button,
} from "reactstrap";
import ReactDatatable from '@ashvin27/react-datatable';
import { Fragment } from "react";

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

  columns = [
    {
      key: "id",
      text: "#",
      sortable: true,
      cell: (record, index) => {
        return index += 1;
      }
    },
    {
      key: "title",
      text: "TITLE"
    },
    {
      key: "description",
      text: "DESCRIPTION"
    },
    {
      key: "count",
      text: "COUNT"
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
        if (record.isActive != 1) {
          return (<span className="badge badge-danger">Disabled</span>);
        }
      }
    },
    {
      key: "isActive",
      text: "ACTION",
      cell: (record, index) => {

        return (
          <Fragment>
            <span className="btn badge-success mr-2 px-4" onClick={() => this.ViewContactListDetails(record)}> <i className="fa fa-eye mr-2"  ></i>View</span>
            <span className="btn badge-danger px-4" onClick={() => this.DeleteUserContactList(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
          </Fragment>
        )



      }
    }
  ];

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
              <ReactDatatable
                extraButtons={this.extraButtons}
                config={this.config}
                records={this.state.contactList}
                columns={this.columns}
              />

            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default UserContactList;
