import React, { Component } from "react";
import ContentWrapper from "../../Layout/ContentWrapper";
import Datatable from "../../Common/Datatable";
import { Container, Card, CardHeader, CardBody, CardTitle ,Button} from "reactstrap";
import $ from "jquery";
import axios from "../../../services/axios";
import Moment from 'moment'

class CustomerList extends Component {
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
    },
    customersList: []
  };


  

  componentDidMount() {
    axios.get("/customers")
      .then(res => {
        const response = res.data;
        this.setState({ customersList: response })
        console.log(response);
      })
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

  formatDate=(date)=>{
    return Moment(date).format('DD-MM-YYYY')
  }

  ViewCustomerDetails=()=>{
    return this.props.history.push('/customers-details/1')
  }

  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div>
            Customers List
            <small>Showing all customers.</small>
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
                      <th>CUSTOMER NAME</th>
                      <th>EMAIL</th>
                      <th className="sort-numeric">PHONE</th>
                      <th className="sort-alpha" data-priority="2">
                        ADDRESS
                      </th>
                      <th>STATUS</th>
                      <th>DATE REGISTERED</th>
                      <th>PAYMENT TYPE</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.customersList.map(row => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.fullname}</td>
                        <td>{row.email}</td>
                        <td>{row.phonenumber}</td>
                        <td>{row.location}</td>
                        {/* <td>{row.isActive}</td> */}
                        <td>{row.isActive==1 &&
                           <span className="badge badge-success">Active</span>
                        }
                        {row.isActive!=1 && 
                          <span className="badge badge-danger">Disabled</span>
                        }
                        </td>

                        <td>{this.formatDate(row.startDate)}</td>
                        <td>{row.paymentType}</td>
                        <td> 
                        <Button className="btn btn-success"  onClick={this.ViewCustomerDetails}>
                        {/* <i className="fa fa-arrow-right"></i> */}
                        <i className="fa fa-eye"></i>
                        </Button>
                         </td>  
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

export default CustomerList;
