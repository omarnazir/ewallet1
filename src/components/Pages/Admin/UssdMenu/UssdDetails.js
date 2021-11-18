import React, { Component,Fragment } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";

import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import Moment from 'moment'
import ReactDatatable from '@ashvin27/react-datatable';
import { AuthService, UssdMenuService } from '../../../../services';
import { Redirect } from 'react-router-dom';
import axios from '../../../../services/axios'

class UssdDetails extends Component {
  state = {
    ussdMenuList: [],
    loading:true,
    id:''
  };

  componentDidMount() {

    const { state } = this.props.history.location;
    console.log(state)
    if (state == undefined) {
        return this.props.history.push('/admin-ussd-menu')
    }
    this.setState({id:state})

    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }

   this.getAllUssdMenu(state);
  }

  getAllUssdMenu(id){
    return axios.get("/ussd-menu-data/byPage/"+id).then(res => {
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
    const data={
        id:row.id,
        parent:this.state.id
    }
    return this.props.history.push('/admin-edit-menu-data/' + row.id, data)
  }

  AddUssdMenu=()=>{
    return this.props.history.push("/admin-add-menu-data/"+this.state.id,this.state.id);
  }

  DeleteMenu=(id)=>{
    axios.delete("/ussd-menu-data/" +id)
    .then(res => {
      const response = res.data;
      const ussdMenuList = this.state.ussdMenuList.filter((item) => {
          return item.id !== id;
      });
      this.setState({ ussdMenuList });
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
      key: "name",
      text: "NAME"
    },
    {
      key: "value",
      text: "VALUE",
    },
    {
      key: "pageId",
      text: "PAGE ID"
    },
    {
      key: "priority",
      text: "PRIORITY",
      cell: (record, index) => {
        return  `${record.priority}`;
      }
    },
    {
      key: "nextPageId",
      text: "NEXT PAGE ID",
      cell: (record, index) => {
        return  `${record.nextPageId}`;
      }
    },
    {
        key: "role",
        text: "ROLE",
      },
    {
      key: "id",
      text: "ACTION",
      cell: (record, index) => {
        return (
          <Fragment>
            <span className="btn badge-success mr-2 px-4" onClick={() => this.EditUssdMenu(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
            <span className="btn bg-danger-dark mr-2  px-4" onClick={() => this.DeleteMenu(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
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
            Ussd Menu Data
            <small>Manage USSD Menu Data.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.AddUssdMenu} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
              Add Menu Data</Button>
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

export default UssdDetails;
