import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import Datatable from "../../../Common/Datatable";
import { Container, Card, CardHeader, CardBody, CardTitle,Button } from "reactstrap";
import $ from "jquery";
import Moment from "moment"
import NumberFormat from 'react-number-format'
import { AuthService } from '../../../../services';
import {Redirect} from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';
class Transactions extends Component {
  state = {
    billsList:[]
  };

  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }
    axios.get("/bills")
        .then(res => {
            const response = res.data;
            this.setState({ billsList: response })

        })
      }
  
      formatDate = (date) => {
        return Moment(date).format('DD-MM-YYYY')
      }

      ViewPrePaidInvoice(row){
        console.log(row)
        return this.props.history.push('/admin-invoices/' + row.id, row)
      }

      AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }


    columns = [
      {
          key: "id",
          text: "#",
          sortable: true,
          // cell: (record, index) => {
          //   return index;
          // }
      },
      {
          key: "billNumber",
          text: "INVOICE",
          sortable: true
      },
      {
          key: "smsQuantity",
          text: "QUANTITY",
          sortable: true,
          record:(record,index)=>{
            return (<NumberFormat value={record.smsQuantity} displayType={'text'} thousandSeparator={true} prefix={''} />)
          }
      },
      {
        key: "billAmount",
        text: "AMOUNT",
        sortable: true,
        cell:(record,index)=>{
          return (<NumberFormat value={record.billAmount} displayType={'text'} thousandSeparator={true} prefix={''} />)
        }
    },
      {
        key: "status",
        text: "PAYMENT STATUS",
        sortable: true,
        cell: (record, index) => {
          if (record.status == 0) {
            return (
              <span className="badge badge-warning">Not Paid</span>
            );
          }
           if(record.status == 1){
            return  (<span className="badge badge-success">Paid</span>);
          }
        }
    },
      {
          key: "paymentMethod",
          text: "METHOD",
          sortable: true
      },
      {
        key: "paymentDate",
        text: "PAYMENT DATE",
        sortable: true,
        cell: (record, index) => {
            if(record.paymentDate==null){
              return ("N/A")
            }else {
          return    this.formatDate(record.createdAt)
            }
           
        }
    },
    {
      key: "createdAt",
      text: "DATE CREATED",
      sortable: true,
      cell: (record, index) => {
        return (this.formatDate(record.createdAt))
      }
  },
  {
    key: "id",
    text: "ACTION",
    cell: (record, index) => {
      return (
        <Button color="success" className="btn btn-success"
          onClick={() => {
            this.ViewPrePaidInvoice(record);
          }}
        >
          VIEW
        </Button>
      );
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
    let index=0;
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div>
            Invoices
            <small>Showing all invoices.</small>
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
                records={this.state.billsList}
                columns={this.columns}
                
                />


                {/* <table className="table table-striped my-4 w-100">
                  <thead>
                    <tr>
                      <th data-priority="1">#</th>
                      <th>INVOICE</th>
                      <th>QUANTITY</th>
                      <th>AMOUNT</th>
                      <th>PAYMENT STATUS</th>
                      <th>METHOD</th>
                      <th>PAYMENT DATE</th>
                      <th>DATE CREATED</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody> */}
{/* 
                    {
                      this.state.billsList.map((bill)=>(

                        <tr className="gradeX" key={bill.id}>
                        <td>{index+=1}</td>
                        <td>{bill.billNumber}</td>
                        <td><NumberFormat value={bill.smsQuantity} displayType={'text'} thousandSeparator={true} prefix={''} /></td>
                        <td><NumberFormat value={bill.billAmount} displayType={'text'} thousandSeparator={true} prefix={''} /></td>
                      
                        {bill.status==0 &&
                        <td> <span className="badge badge-danger">Not Paid</span> </td>  
                        }
                        {bill.status==1 && 
                        <td> <span className="badge badge-success">Paid</span> </td>  
                        }
                        <td>{bill.paymentMethod}</td> 
                        <td>N/A</td> 
                        <td>{this.formatDate(bill.createdAt)}</td>
                        <td> <span className="btn" style={this.AddActionButtonStyle} onClick={() => {
                            this.ViewPrePaidInvoice(bill);
                          }}>
                          VIEW
                          </span> </td>                   
                      </tr> 
                      ))
                    } */}

                  
                  {/* </tbody>
                </table> */}
              {/* </Datatable> */}
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default Transactions;
