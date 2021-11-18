import React, { Component,Fragment } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";

import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import Moment from 'moment'
import ReactDatatable from '@ashvin27/react-datatable';
import { AuthService, UssdMenuService } from '../../../../services';
import { Redirect } from 'react-router-dom';
import axios from '../../../../services/axios'

class UssdMenu extends Component {
  state = {
    ussdMenuList: [],
    loading:true
  };

  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }

   this.getAllUssdMenu();
  }

  getAllUssdMenu(){
    return axios.get("/ussd-menus").then(res => {
      this.setState({loading:false})
      this.setState({ ussdMenuList: res.data })
    })

}

  formatDate = (date) => {
    return Moment(date).format('lll')
  }

  ViewCustomerDetails = (row) => {
    console.log(row.id)
    return this.props.history.push('/admin-customers-details/' + row.id, row)
  }

  ViewUsedDetails=(id)=>{
    return this.props.history.push('/admin-ussd-details/' + id)
  }

  EditUssdMenu=(row)=>{
    return this.props.history.push('/admin-edit-ussdmenu/' + row.id, row.id)
  }

  AddUssdMenu=()=>{
    return this.props.history.push("/admin-add-ussdmenu");
  }

  DeleteMenu=(id)=>{
    axios.delete("/ussd-menus/" +id)
    .then(res => {
      const response = res.data;
     this.getAllUssdMenu();
  })
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
      key: "title",
      text: "TITLE"
    },
    {
      key: "pageType",
      text: "PAGE TYPE",
    },
    {
      key: "dataSource",
      text: "DATA SOURCE"
    },
    {
      key: "pageLevel",
      text: "PAGE LEVEL",
      cell: (record, index) => {
        return  `${record.pageLevel}`;
      }
    },
    {
      key: "variableName",
      text: "VARIABLE NAME",
    },
    {
      key: "id",
      text: "ACTION",
      cell: (record, index) => {
        return (
          <Fragment>
            <span className="btn badge-success mr-2 px-4" onClick={() => this.EditUssdMenu(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
            <span className="btn bg-danger-dark mr-2  px-4" onClick={() => this.DeleteMenu(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
            <span className="btn px-4" style={{ color:'white',background:'#003366' }} onClick={() => this.ViewUsedDetails(record.id)}> <i className="fa fa-eye mr-2"></i>View</span>
          </Fragment>
        )
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
            Ussd Menu
            <small>Manage USSD Menu.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.AddUssdMenu} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
              Add Menu </Button>
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
                records={this.state.ussdMenuList}
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

export default UssdMenu;
