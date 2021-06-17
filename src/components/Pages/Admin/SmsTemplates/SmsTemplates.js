import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
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
  Button
} from "reactstrap";
import Datetime from 'react-datetime';
import $ from "jquery";
import axios from "../../../../services/axios";
import Moment from 'moment';
import update from 'immutability-helper';
import { AuthService } from '../../../../services';
import {Redirect} from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';
import NumberFormat from 'react-number-format';
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2"
const MySwal = withReactContent(Swal)

class SmsTemplates extends Component {
  state = {
    smsTemplateList: []
  };

  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }
    axios.get("/sms-request")
      .then(res => {
        const response = res.data;
        this.setState({ smsTemplateList: response })
        console.log(response);
      })
  }

  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  }

  AddSmsTemplates = () => {
    return this.props.history.push('/admin-add-sms-templates')
  }

  disableTemplate(id){
    axios.put("/sms-request/disable/" + id)
    .then(res => {
      const response = res.data;
      const index = this.state.smsTemplateList.findIndex((item) => item.id === id);
      const smsTemplateList = update(this.state.smsTemplateList, {$splice: [[index, 1, res.data]]});  // array.splice(start, deleteCount, item1)
      this.setState({smsTemplateList});
    })
  }

  ViewRequestedTemplates = () => {
    return this.props.history.push('/admin-sms-requested-templates')
  }


  formatDate = (date) => {
    return Moment(date).format('lll')
  }

  columns = [
    {
        key: "id",
        text: "#",
        sortable:true,
       cell:(record,index)=>{
         return index+=1;
       }

    },
    {
        key: "fullname",
        text: "CUSTOMER NAME",
        sortable: true,
        cell: (record, index) => {
          return (record.customerEntity.fullname)
        }
    },
    {
        key: "messageTemplate",
        text: "MESSAGE",
        sortable: true
    },
    {
      key: "createdAt",
      text: "DATE ",
      sortable: true,
      cell: (record, index) => {
        return (this.formatDate(record.createdAt))
      }
  },

    {
        key: "isActive",
        text: "STATUS",
        sortable: true,
        cell: (record, index) => {
          if (record.status == 0) {
            return (
              <span className="badge badge-warning">Pending</span>
            );
          }
           if(record.status == 1){
            return  (<span className="badge badge-success">Approved</span>);
          }
    
           if(record.status==2) {
            return (
              <span className="badge badge-danger">Rejected</span>
            );
          }

          if(record.status==3) {
            return (
              <span className="badge badge-danger">Disabled</span>
            );
          }
        }
    },
{
  key: "status",
  text: "ACTION",
  cell: (record, index) => {
  
      if(record.status ==1){
        return ( 
          <button className="btn badge-danger" onClick={() => this.disableTemplate(record.id)}>
          <i className="icon-info mr-2"></i>
          Disable</button>
        )
      }

    
  }
}

];

config = {
  page_size: 10,
  length_menu: [10, 25, 50],
  show_filter: true,
  show_pagination: true,
  pagination:'advance',
  filename: "Contact List",
  button: {
   
  },
  language: {
    loading_text: "Please be patient while data loads..."
}
}

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}/>
  }
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Requested Sms Templates
            <br />
            <small>Showing all sms templates </small>
          </div>
          <div className="flex-row">
            <Button onClick={this.ViewRequestedTemplates} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
              View Requested Sms Templates</Button>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardHeader>
              {/* <CardTitle>
                Showing all sms templates from <strong> MAR 29,2021 </strong> to <strong> APR 29,2021 </strong>
              </CardTitle> */}
              <div className="row">
                <Card className="col-sm-12">
                  <CardBody>
                    <form onSubmit={this.onSubmit}>
                      <div className="form-row align-items-center">
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label>From :</label>
                            <input className="form-control" type="date" />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label>To: </label>
                            <input className="form-control" type="date" />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">No of records: </label>
                            <select className="form-control" id="exampleFormControlSelect1">
                              <option>All</option>
                              <option>100</option>
                              <option>200</option>
                              <option>500</option>
                              <option>1000</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <button type="submit" className="btn btn-info mt-2" style={this.AddActionButtonStyle}>
                            Search
                          </button>
                        </div>

                      </div>
                    </form>
                  </CardBody>
                </Card>
              </div>
            </CardHeader>
            <CardBody>
                <ReactDatatable
                config={this.config}
                records={this.state.smsTemplateList}
                columns={this.columns}
                />
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default SmsTemplates;
