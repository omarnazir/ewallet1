import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import Datatable from "../../../Common/Datatable";
import { Container, Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import $ from "jquery";
import Moment from "moment"
import NumberFormat from 'react-number-format'

class Transactions extends Component {
  state = {
    billsList:[]
  };

  componentDidMount() {
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
        return this.props.history.push('/admin/invoices/' + row.id, row)
      }

      AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

  render() {
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
              {/* <Datatable options={this.state.dtOptions}> */}
                <table className="table table-striped my-4 w-100">
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
                  <tbody>

                    {
                      this.state.billsList.map((bill)=>(

                        <tr className="gradeX" key={bill.id}>
                        <td>{index+=1}</td>
                        <td>{bill.billNumber}</td>
                        <td><NumberFormat value={bill.smsQuantity} displayType={'text'} thousandSeparator={true} prefix={''} /></td>
                        <td><NumberFormat value={bill.billAmount} displayType={'text'} thousandSeparator={true} prefix={''} /></td>
                        {/* <td>{bill.billAmount}</td> */}
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
                    }
                  
                  </tbody>
                </table>
              {/* </Datatable> */}
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default Transactions;
