import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";

import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import Moment from 'moment'
import ReactDatatable from '@ashvin27/react-datatable';
import { AuthService, HarvestsService } from '../../../../services';
import { Redirect } from 'react-router-dom';

class FarmersHarvests extends Component {
  state = {
    harvestsList: []
  };

  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }

    HarvestsService.getAllFarmersHarvests().then(res => {
      this.setState({ harvestsList: res.data })
    })
  }

  formatDate = (date) => {
    return Moment(date).format('lll')
  }

  ViewCustomerDetails = (row) => {
    console.log(row.id)
    return this.props.history.push('/admin-customers-details/' + row.id, row)
  }

  ucFirst=(str)=> {
    if (!str) return str;
    if(str.trim()=="undefined") return "";
    return str[0].toUpperCase() + str.slice(1);
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
      key: "farmer",
      text: "FULL NAME",
      cell: (record, index) => {
        const firstName=record.farmer.firstName;
        const middleName=record.farmer.middleName=="undefined"?" ":record.farmer.middleName;
        const lastName=record.farmer.surname;
        // return (record.firstName +" "+record.middleName+" "+record.surname)
        return this.ucFirst(firstName)+" "+this.ucFirst(middleName)+" "+this.ucFirst(lastName);
        // return this.ucFirst(record.firstName)
      }
    },
    // {
    //   key: "middleName",
    //   text: "MIDDLE NAME"
    // },
    // {
    //   key: "surname",
    //   text: "LAST NAME"
    // },
    {
      key: "farmerMsisdn",
      text: "PHONE NUMBER",
    },
    {
      key: "crop",
      text: "CROP",
      cell: (record, index) => {
        return record.crop.name;
      }
    },
    {
      key: "weight",
      text: "WEIGHT",
    },
    {
      key: "cropUnitPrice",
      text: "UNIT PRICE",
    },
    {
      key: "cropsValue",
      text: "CROP VALUE",
    },
    // {
    //   key: "memberID",
    //   text: "AMCOS",
    // },
    {
      key: "collectionCenter",
      text: "COLLECTION CENTER",
      cell: (record, index) => {
        return record.collectionCenter.name;
      }
    },
    {
      key: "status",
      text: "STATUS",
      cell: (record, index) => {
        return record.status;
      }
    },
    {
      key: "date",
      text: "RECEIVED AT",
      sortable: true,
      cell: (record, index) => {
        return (this.formatDate(record.date))
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
            Harvests
            <small>Showing all farmers harvests.</small>
          </div>
          <div className="flex-row">
            {/* <Button onClick={this.AddSenderId} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
              Register Farmer </Button> */}
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
                records={this.state.harvestsList}
                columns={this.columns}

              />
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default FarmersHarvests;
