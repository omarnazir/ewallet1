import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import $ from "jquery";
import Moment from 'moment'


import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';


class CustomerList extends Component {
  state = {
    customersList: [],
    field: null,
    order: null
  };

  componentDidMount() {
    axios.get("/customers")
      .then(res => {
        const response = res.data;
        this.setState({ customersList: response })
        console.log(response);
      })
  }

  formatDate = (date) => {
    return Moment(date).format('DD-MM-YYYY')
  }

  ViewCustomerDetails = (row) => {
    console.log(row.id)
    return this.props.history.push('/admin/customers-details/' + row.id, row)
  }
  handleSort = (field, order) => {
    this.setState({
      field,
      order
    });
  }

  pagination = paginationFactory({
    page: 2,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });

  columns = [{
    dataField: 'id',
    text: '#',
    sort: true,
    onSort: this.handleSort
  },
  {
    dataField: 'fullname',
    text: 'CUSTOMER NAME'
  },
  {
    dataField: 'email',
    text: 'EMAIL'
  }, {
    dataField: 'phonenumber',
    text: 'PHONE'
  }, {
    dataField: 'location',
    text: 'ADDRESS'
  },
  {
    dataField: 'isActive',
    text: 'STATUS',
    isDummyField: true,
    sort: true,
    formatter: (cellContent, row) => {
      if (row.isActive == 1) {
        return (
          <span className="badge badge-success">Active</span>
        );
      } else {
        return (
          <span className="badge badge-danger">Disabled</span>
        );
      }
    }
  }
    , {
    dataField: 'startDate',
    text: 'DATE REGISTERED',
    isDummyField: true,
    formatter: (cellContent, row) => {
      return (this.formatDate(row.startDate))
    }
  }, {
    dataField: 'paymentType',
    text: 'PAYMENT TYPE'
  }, {
    dataField: 'id',
    text: 'ACTION',
    isDummyField: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <Button color="success" className="btn btn-success"
          onClick={() => {
            this.ViewCustomerDetails(row);
          }}
        >
          <i className="fa fa-eye"></i>
        </Button>
      );
    }

  }

  ]



  render() {
    const { SearchBar, ClearSearchButton } = Search;
    const MyExportCSV = (props) => {
      const handleClick = () => {
        props.onExport();
      };
      return (
        <div>
          <button className="btn btn-success" onClick={handleClick}>Export to CSV</button>
        </div>
      );
    };

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


              <ToolkitProvider
                bootstrap4
                keyField='id'
                data={this.state.customersList}
                columns={this.columns}
                search
              >
                {
                  props => (
                    <div>
                      <h6>Input something at below input field:</h6>
                      <SearchBar {...props.searchProps} />
                      <ClearSearchButton {...props.searchProps} />
                      <hr />
                      <MyExportCSV {...props.csvProps} />
                      <BootstrapTable bootstrap4 striped keyField='id'
                        data={this.state.customersList} columns={this.columns} condensed
                        pagination={paginationFactory()}
                        sort={{
                          dataField: this.state.field,
                          order: this.state.order
                        }}
                        noDataIndication="Customr Table Empty"
                        rowEvents={this.rowEvents}
                      />
                    </div>
                  )
                }
              </ToolkitProvider>
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default CustomerList;
