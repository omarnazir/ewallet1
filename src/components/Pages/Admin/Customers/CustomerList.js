import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle ,Button} from "reactstrap";
import $ from "jquery";
import Moment from 'moment'


import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

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

  formatDate=(date)=>{
    return Moment(date).format('DD-MM-YYYY')
  }

  ViewCustomerDetails=(id)=>{
    console.log(id)
    // return this.props.history.push('/admin/customers-details/1')
  }
  handleSort = (field, order) => {
    this.setState({
      field,
      order
    });
  }

   rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`clicked on row with index: ${rowIndex}`);
      let getCurrentCellIndex = e.target.cellIndex;
      let getLastCellIndex = document.querySelector('table tr:last-child td:last-child').cellIndex
      
    
      if (getCurrentCellIndex !== getLastCellIndex && getCurrentCellIndex !== undefined) {
        e.stopPropagation();
        
          // console.log(`----> ${JSON.stringify(row)} |||| ${rowIndex}`)
      }
    }
  };


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
  },{
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
    formatter: (cellContent, row) => {
      if (row.isActive == 1) {
        return (
          <span className="badge badge-success">Active</span>
        );
      }else {
        return (
          <span className="badge badge-danger">Disabled</span>
        );
      }
    }
  }
  ,{
    dataField: 'startDate',
    text: 'DATE REGISTERED',
    isDummyField: true,
    formatter:(cellContent,row)=>{
      return (this.formatDate(row.startDate))
    }
  }, {
    dataField: 'paymentType',
    text: 'PAYMENT TYPE'
  }, {
    dataField: 'id',
    text: 'ACTION',
    isDummyField: true,
    formatter:(cellContent,row)=>{
      return (
      <Button color="success" className="btn btn-success">
      <i className="fa fa-eye"></i>
      </Button>)
    }
    
  }

]

 



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
            <BootstrapTable bootstrap4 striped keyField='id' 
              data={this.state.customersList} columns={this.columns}
               pagination={paginationFactory()} 
               sort={ {
                dataField: this.state.field,
                order: this.state.order
              } }
              noDataIndication="No senders added"
              rowEvents={this.rowEvents}
               />
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default CustomerList;
