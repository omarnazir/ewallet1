import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";

import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import Moment from 'moment'
import ReactDatatable from '@ashvin27/react-datatable';
import { AuthService, FarmersService } from '../../../../services';
import { Redirect } from 'react-router-dom';

class AllFarmers extends Component {
  state = {
    farmersList: [],
    loading: true
  };

  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }

    FarmersService.getAllFarmers().then(res => {
      this.setState({ loading: false })
      this.setState({ farmersList: res.data })
    })
  }

  formatDate = (date) => {
    return Moment(date).format('lll')
  }

  ViewCustomerDetails = (row) => {
    console.log(row.id)
    return this.props.history.push('/admin-customers-details/' + row.id, row)
  }

  AddFarmer=()=>{
    return this.props.history.push("/admin-add-farmer");
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
      // excel: true,
      // print: true,
      // csv: true
    },
    language: {
      loading_text: "Please be patient while data loads..."
    }
  }

  ucFirst = (str) => {
    if (!str) return str;
    if (str.trim() == "undefined") return "";
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
      key: "firstName",
      text: "FULL NAME",
      cell: (record, index) => {
        // const firstName=record.firstName;
        // const middleName=record.middleName=="undefined"?" ":record.middleName;
        // const lastName=record.surname;
        // return (record.firstName +" "+record.middleName+" "+record.surname)
        // return this.ucFirst(firstName)+" "+this.ucFirst(middleName)+" "+this.ucFirst(lastName);
        return this.ucFirst(record.firstName)
      }
    },
    {
      key: "middleName",
      text: "MIDDLE NAME",
      cell: (record, index) => {
        return this.ucFirst(record.middleName)
      }
    },
    {
      key: "surname",
      text: "LAST NAME",
      cell: (record, index) => {
        return this.ucFirst(record.surname)
      }
    },
    {
      key: "sex",
      text: "GENDER",
    },
    {
      key: "dateOfBirth",
      text: "AGE",
    },
    {
      key: "msisdn",
      text: "PHONE NUMBER",
    },
    {
      key: "memberID",
      text: "MEMBER ID",
    },
    {
      key: "mainCrop",
      text: "MAIN CROP",
      cell: (record, index) => {
        return (record.mainCrop.name)
      }
    },
    {
      key: "registrationDate",
      text: "DATE REGISTERED",
      sortable: true,
      cell: (record, index) => {
        return (this.formatDate(record.registrationDate))
      }
    },
    {
      key: "id",
      text: "ACTION",
      cell: (record, index) => {
        return (
          <Button style={{
            color: 'white',
            background: "#003366"
          }} className="btn btn-success"
            onClick={() => {
              this.ViewCustomerDetails(record);
            }}
          >
            <i className="fa fa-eye"></i>
          </Button>
        );
      }
    }

  ];


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    let index = 0

    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Farmers List
            <small>Showing all farmers.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.AddFarmer} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
              Register Farmer </Button>
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

export default AllFarmers;
