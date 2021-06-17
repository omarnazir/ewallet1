import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import Datatable from "../../../Common/Datatable";
import { Container, Card, CardHeader, CardBody, CardTitle,Button } from "reactstrap";
import $ from "jquery";
import Moment from "moment"
import NumberFormat from 'react-number-format'
import { AuthService } from '../../../../services';
import ReactDatatable from '@ashvin27/react-datatable';
class PrePaidInvoiceList extends Component {

  
  state = {
    billsList:[]
  };

  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }
    axios.get("/bills/customer")
        .then(res => {
            const response = res.data;
            this.setState({ billsList: response })

        })
      }


      columns = [
        {
            key: "id",
            text: "#",
            sortable: true,
            cell: (record, index) => {
              return index+=1;
            }
        },
        {
            key: "billNumber",
            text: "INVOICE"
        },
        {
          key: "paymentMsisdn",
          text: "MSISDN",
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
            if (record.status == "Pending") {
              return (
                <span className="badge badge-warning">Not Paid</span>
              );
            }
             if(record.status == "Success"){
              return  (<span className="badge badge-success px-3">Paid</span>);
            }
          }
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
          <Button style={{color: 'white',
          background: "#003366"  }} className="btn "
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


  
      formatDate = (date) => {
        return Moment(date).format('lll')
      }

      ViewPrePaidInvoice(row){
        console.log(row)
        return this.props.history.push('/invoice/' + row.id, row)
      }

      AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

  render() {
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
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default PrePaidInvoiceList;
