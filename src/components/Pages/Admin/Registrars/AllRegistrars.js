import React, { Component,Fragment } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";

import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import Moment from 'moment'
import ReactDatatable from '@ashvin27/react-datatable';
import { AuthService, FarmersService,RegistarService } from '../../../../services';
import { Redirect } from 'react-router-dom';
import axios from '../../../../services/axios';
import { SuccessAlert, DeleteAlert } from "../../../Common/AppAlerts";

class AllRegistars extends Component {
  state = {
    farmersList: [],
    loading:true
  };

  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }
    this.getAllRegistars();
  }

  getAllRegistars(){
    RegistarService.getAllRegistars().then(res => {
      this.setState({loading:false})
      this.setState({ farmersList: res.data })
    })
  }

  formatDate = (date) => {
    return Moment(date).format('lll')
  }

  EditRegistrar = (row) => {
    return this.props.history.push('/admin-edit-registar/' + row.id, row)
  }
  AddRegistar=()=>{
    return this.props.history.push("/admin-add-registar");
  }

  DeleteRegistar=(id)=>{
    axios.delete("/registars/" + id).then(res =>this.getAllRegistars());
  }


  AlertDeleteRegistrar = (id) => {
    DeleteAlert().then((willDelete) => {
      if (willDelete) {
          this.DeleteRegistar(id);
          SuccessAlert("Deleted Successfully");
      }
  });
  }

  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  }

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

   ucFirst=(str)=> {
    if (!str) return str;
    if(str.trim()=="undefined") return "";
    return str[0].toUpperCase() + str.slice(1);
  }



  columns = [
    {
      key: "id",
      text: "#",
      sortable: true,
      cell: (record, index) => {
        return index + 1;
      }
    },
    {
      key: "name",
      text: "FULL NAME"
    },
    {
      key: "msisdn",
      text: "PHONE NUMBER"
    },
    {
      key: "address",
      text: "ADDRESS"
    },
    {
        key: "status",
        text: "STATUS",
        cell: (record, index) => {
         
            return (
              <span className="badge badge-success">Active</span>
            );
        }
      },
    {
      key: "dateCreated",
      text: "DATE REGISTERED",
      sortable: true,
      cell: (record, index) => {
        return (this.formatDate(record.dateCreated))
      }
    },
    {
        key: "id",
        text: "ACTION",
        cell: (record, index) => {
          return (
            <Fragment>
              <span className="btn badge-success mr-2 px-4" onClick={() => this.EditRegistrar(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
              <span className="btn bg-danger-dark  px-4" onClick={() => this.AlertDeleteRegistrar(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
            </Fragment>
          )
        }
      }

  ];


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Registars
            <small>Showing all registars.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.AddRegistar} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
              Add New Registar </Button>
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
                records={this.state.farmersList}
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

export default AllRegistars;
