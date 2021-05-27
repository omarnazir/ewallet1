import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle
} from "reactstrap";
import $ from "jquery";



class Transactions extends Component {
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
      dom: "Bfrtip",
      buttons: [
        { extend: "csv", className: "btn-info" },
        { extend: "excel", className: "btn-info", title: "XLS-File" },
        { extend: "pdf", className: "btn-info", title: $("title").text() },
        { extend: "print", className: "btn-info" },
      ],
    },
    smsTransactions: []
  };

  // Access to internal datatable instance for customizations
  dtInstance = (dtInstance) => {
    const inputSearchClass = "datatable_input_col_search";
    const columnInputs = $("tfoot ." + inputSearchClass);
    // On input keyup trigger filtering
    columnInputs.keyup(function () {
      dtInstance.fnFilter(this.value, columnInputs.index(this));
    });
  };

  componentDidMount() {
    this.fetchTxns();
  }

  fetchTxns = () => {
    axios.get(`http://localhost:8085/api/v1/sms`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then(res => {
        const response = res.data;
        this.setState({ smsTransactions: response })
        console.log(response);
      })
  }

  AddActionButtonStyle={
    color:'white',
    background:"#003366"
  }

  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div>
            Transactions
            <br />
            <small>Showing all transactions </small>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardHeader>
              {/* <CardTitle>
                Showing all transactions from <strong> MAR 29,2021  </strong> to <strong>  APR 29,2021 </strong>
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
                            <label>No of records: </label>
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
                          <button type="submit" style={this.AddActionButtonStyle} className="btn btn-info mt-2">
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
              <Datatable options={this.state.dtOptions}>
                <table className="table table-striped my-4 w-100">
                  <thead>
                    <tr>
                      <th data-priority="1">SNO</th>
                      <th>DATE</th>
                      <th className="sort-alpha">SENDER ID</th>
                      <th className="sort-alpha" data-priority="2">SMS</th>
                      <th>MSISDN</th>
                      <th>NETWORK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.smsTransactions.map(row => (
                      <tr>
                        <td>{row.id}</td>
                        <td>{row.date}</td>
                        <td>{row.sender}</td>
                        <td>{row.message}</td>
                        <td>{row.msisdn}</td>
                        <td>{row.network}</td> 
                      </tr>
                    ))}
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

export default Transactions;
