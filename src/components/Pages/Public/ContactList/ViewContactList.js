import React, { Component,Fragment } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button, Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,FormGroup } from "reactstrap";
import Moment from 'moment'
import { AuthService } from '../../../../services';
import {Redirect} from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';

class ViewContactList extends Component {
  state = {
    customersList: [],
    field: null,
    order: null,
    index:0,
    id:0,
    mode:false,
    addContactListNumbers:{
      phoneNumber:"",
      column1:"",
      column2:"",
      column3:"",
      column4:"",
      column5:"",
      contactlistFk:""
    }
  };


  initialState={
    addContactListNumbers:{
      phoneNumber:"",
      column1:"",
      column2:"",
      column3:"",
      column4:"",
      column5:"",
      contactlistFk:""
    }
  }

  componentDidMount() {

    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }

    const { state } = this.props.history.location;
    
   
    if (state == undefined) {
        return this.props.history.push('/contact-lists')
    }
    this.setState({id:state.id})
    console.log(state)
    console.log("from id" +state.id)
    console.log(this.state.id)

    this.getAllContactListNumbers(state.id);
  }

  getAllContactListNumbers(id){
    axios.get("/contact-lists/numbers/"+id)
    .then(res => {
      const response = res.data;
      this.setState({ customersList: response })
      console.log(response);
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.toggleModal();
    const data={...this.state.addContactListNumbers,contactlistFk:this.state.id}
    console.log(data);
    
    axios.post("/contact-lists-numbers",data).then(res => {
        const response = res.data;
        this.setState({addContactListNumbers:this.initialState.addContactListNumbers})
        this.getAllContactListNumbers(this.state.id);
    })
    
}


handleChange = event => {       
  this.setState({addContactListNumbers:Object.assign({},
      this.state.addContactListNumbers,{[event.target.name]:event.target.value})
  })
}
  
 DeleteContactListNumber(id){
  axios.delete("/contact-lists-numbers/" + id)
    .then(res => {
      const response = res.data;
      const customersList = this.state.customersList.filter((item) => {
        return item.id !== id;
      });
      this.setState({ customersList })
    })
}

  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
}

  formatDate = (date) => {
    return Moment(date).format('DD-MM-YYYY')
  }

  ViewAddContactList = () => {
    return this.props.history.push("/contact-lists");
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  columns = [
    {
        key: "id",
        text: "Id",
        sortable: true,
        cell: (record, index) => {
          return index+=1;
        }
    },
    {
        key: "phoneNumber",
        text: "Phone Number",
        sortable: true
    },
    {
        key: "column1",
        text: "Column 1",
        sortable: true
    },
    {
        key: "column2",
        text: "Column 2",
        sortable: true
    },
    {
        key: "column3",
        text: "Column 3",
        sortable: true
    },

    {
        key: "column4",
        text: "Column 4",
        sortable: true
    },
    {
        key: "column5",
        text: "Column 5",
        sortable: true
    },
    {
      key: "id",
      text: "ACTION",
      cell: (record, index) => {
        return (
            <span className="btn badge-danger px-4" onClick={() => this.DeleteContactListNumber(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
          
        )
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
            Contact list details
            <small>Showing all contact lists.</small>
          </div>
          <div className="flex-row">
          <Button onClick={this.toggleModal} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
              Add Contactlist Number
            </Button>
          <Button onClick={this.ViewAddContactList} style={this.AddActionButtonStyle} className="btn-pill-right">
              View all Contact lists
            </Button>


            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Add Contact List Number</ModalHeader>
              <form onSubmit={this.handleSubmit}>

                <ModalBody>
                  <FormGroup>
                    <label>Phone Number :</label>
                    <input className="form-control" name="phoneNumber"
                     value={this.state.addContactListNumbers.phoneNumber}
                     onChange={this.handleChange}type="text" required></input>
                  </FormGroup>

                  <FormGroup>
                    <label>Column 1 :</label>
                    <input className="form-control" name="column1"
                    value={ this.state.addContactListNumbers.column1}
                     onChange={this.handleChange} type="text"></input>
                  </FormGroup>
                  <FormGroup>
                    <label>Column 2 :</label>
                    <input className="form-control" name="column2"
                    value={ this.state.addContactListNumbers.column2}
                     onChange={this.handleChange} type="text" ></input>
                  </FormGroup>
                  <FormGroup>
                    <label>Column 3 :</label>
                    <input className="form-control" name="column3"
                     value={ this.state.addContactListNumbers.column3}
                     onChange={this.handleChange} type="text"></input>
                  </FormGroup>
                  <FormGroup>
                    <label>Column 4 :</label>
                    <input className="form-control" name="column4"
                    value={ this.state.addContactListNumbers.column4}
                     onChange={this.handleChange} type="text"></input>
                  </FormGroup>
                  <FormGroup>
                    <label>Column 5 :</label>
                    <input className="form-control" name="column5"
                    value={this.state.addContactListNumbers.column5}
                     onChange={this.handleChange} type="text"></input>
                  </FormGroup>
                 
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-sm btn-success mr-3  px-5" type="submit">
                    Save
                    </button>
                </ModalFooter>
              </form>
            </Modal>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardHeader>
            </CardHeader>
            <CardBody>
            <ReactDatatable 
                config={this.config}
                records={this.state.customersList}
                columns={this.columns}/>
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default ViewContactList;
