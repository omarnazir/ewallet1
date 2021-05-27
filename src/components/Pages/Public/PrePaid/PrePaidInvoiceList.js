import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import Datatable from "../../../Common/Datatable";
import { Container, Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import $ from "jquery";
import Moment from "moment"
import NumberFormat from 'react-number-format'

class PrePaidInvoiceList extends Component {
  state = {
    dtOptions: {
      paging: true, // Table pagination
      ordering: true, // Column ordering
      info: true, // Bottom left status text
      responsive: true,
      oLanguage: {
        sSearch: '<em class="fa fa-search"></em>',
        sLengthMenu: "_MENU_ records per page",
        info: "Showing page _PAGE_ of _PAGES_",
        zeroRecords: "Nothing found - sorry",
        infoEmpty: "No records available",
        infoFiltered: "(filtered from _MAX_ total records)",
        oPaginate: {
          sNext: '<em class="fa fa-caret-right"></em>',
          sPrevious: '<em class="fa fa-caret-left"></em>',
        },
      },
      // Datatable Buttons setup
      dom: "Bfrtip",
      buttons: [
        { extend: "csv", className: "btn-info" },
        { extend: "excel", className: "btn-info", title: "XLS-File" },
        { extend: "pdf", className: "btn-info", title: $("title").text() },
        { extend: "print", className: "btn-info" },
      ],
    },billsList:[]
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


  // Access to internal datatable instance for customizations
  dtInstance = (dtInstance) => {
    const inputSearchClass = "datatable_input_col_search";
    const columnInputs = $("tfoot ." + inputSearchClass);
    // On input keyup trigger filtering
    columnInputs.keyup(function () {
      dtInstance.fnFilter(this.value, columnInputs.index(this));
    });
  };

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
              <Datatable options={this.state.dtOptions}>
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

                        <tr className="gradeX">
                        <td>{bill.id}</td>
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
                        <td> <span className="btn badge-success">VIEW</span> </td>                   
                      </tr> 
                      ))
                    }
                  
                  </tbody>
                </table>
              </Datatable>
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default PrePaidInvoiceList;
