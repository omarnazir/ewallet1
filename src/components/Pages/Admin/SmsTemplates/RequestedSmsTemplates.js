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
import ReactDatatable from '@ashvin27/react-datatable';
import NumberFormat from 'react-number-format';
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2"
const MySwal = withReactContent(Swal)

class SmsTemplatesRequested extends Component {
  state = {
    smsTemplateList: []
  };

  componentDidMount() {
    axios.get("/sms-request/pending")
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

  // Access to internal datatable instance for customizations
  dtInstance = (dtInstance) => {
    const inputSearchClass = "datatable_input_col_search";
    const columnInputs = $("tfoot ." + inputSearchClass);
    // On input keyup trigger filtering
    columnInputs.keyup(function () {
      dtInstance.fnFilter(this.value, columnInputs.index(this));
    });
  };

  AddSmsTemplates = () => {
    return this.props.history.push('/admin-add-sms-templates')
  }

  formatDate = (date) => {
    return Moment(date).format('lll')
  }
  ViewAllSmsTemplates = () => {
    return this.props.history.push('/admin-sms-templates')
  }

  // ApproveTemplate(row){
  //   console.log("clicked")
  //   // const value=e.target.value;
  //   // console.log(value)
  // }

  RejectTemplate = (e) => {
    const value = e.target.value;
    console.log(value)
  }

  ApproveTemplate = (id) => {
    // setBooks(books.filter((book) => book.id !== id));
    console.log("clicked" + id)
  };

  ApproveTemplate = (record) => {
    axios.put("/sms-request/approve/" + record.id)
      .then(res => {
        const response = res.data;
        const smsTemplateList = this.state.smsTemplateList.filter((template) => {
          return template.id !== record.id;
        });
        this.setState({ smsTemplateList })
        this.showSweetAlert('success','Approved SMS Template Sucessfully');
      })
  }


  showSweetAlert(icon,message) {
    return MySwal.fire({
        position: 'center',
        icon: icon,
        title: message,
        text: "",
        showConfirmButton: false,
        timer: 2000
    })
}

  RejectTemplate = (record) => {
    axios.put("/sms-request/reject/" + record.id)
      .then(res => {
        const response = res.data;
        const smsTemplateList = this.state.smsTemplateList.filter((template) => {
          return template.id !== record.id;
        });
        this.setState({ smsTemplateList })
      })
  }


  columns = [
    {
        key: "id",
        text: "#",
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
      key: "dateCreated",
      text: "DATE ",
      sortable: true,
      cell: (record, index) => {
        return (this.formatDate(record.dateCreated))
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
        }
    },
 {
      key: "paymentType",
      text: "Reason for rejection",
      sortable: true
  },
{
  key: "status",
  text: "ACTION",
  cell: (record, index) => {
  
      if(record.status ==0){
        return ( 
          <div>
        <span className="btn badge-success mr-1 mb-1" style={this.AddActionButtonStyle} onClick={() => this.ApproveTemplate(record)}>Approve</span>
        <span className="btn badge-danger" onClick={() => this.RejectTemplate(record)}>Reject</span>
        </div>
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

    let index=0;
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Requested SMS Templates
          <br />
            <small>Showing all sms templates </small>
          </div>
          <div className="flex-row">
            <Button onClick={this.ViewAllSmsTemplates} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Sms Templates</Button>
            <Button onClick={this.AddSmsTemplates} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
              Add New SMS Template</Button>
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
                          <button type="submit" className="btn btn-info mt-2">
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
           
                  {/* {this.state.smsTemplateList.map(row => (
                    <tr key={row.id}>
                      <td>{index+=1}</td>
                     
                      <td>{row.customerEntity.fullname}</td>
                      <td>{row.messageTemplate}</td>
                      <td>{this.formatDate(row.dateCreated)}</td>
                      <td>
                        {row.status == "1" &&
                          <span className="badge badge-success">Approved</span>
                        }
                        {
                          row.status == "0" &&
                          <span className="badge badge-warning">Pending</span>
                        }
                        {
                          row.status == "2" &&
                          <span className="badge badge-danger">Rejected</span>
                        }
                      </td>
                      <td>N/A</td>
                      { row.status == "0" &&

                        <td>
                          <span className="btn badge-success mr-1" style={this.AddActionButtonStyle} onClick={() => this.ApproveTemplate(row.id)}>Approve</span>
                          <span className="btn badge-danger" onClick={() => this.RejectTemplate(row.id)}>Reject</span>
                        </td>
                      }
                      {
                        row.status != "0" &&
                        <td>
                          N/A
                          </td>
                      }
                    </tr>
                  ))} */}


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

export default SmsTemplatesRequested;
