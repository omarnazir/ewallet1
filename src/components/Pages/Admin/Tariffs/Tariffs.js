import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
// import Swal from "../../../Common/Swal";
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import { AuthService } from '../../../../services';
import {Redirect} from 'react-router-dom';

const MySwal = withReactContent(Swal)
import {
  Container, Card, CardHeader, CardBody, CardTitle, Button, Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup
} from "reactstrap";
import $ from "jquery";
import update from 'immutability-helper';

class Tariffs extends Component {
  state = {
    tarrifsList: [],
    modal: false,
    name: "",
    AddTariffMode:true,
    editedTariff:{},
    swalSuccesOption: {
      title: "Added Tariff Successfully",
      text: "",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
  }
  };

  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" })
    }
    this.GetAllTariffs()
  }

  GetAllTariffs = () => {
    axios.get("/tariff")
      .then(res => {
        const response = res.data;
        this.setState({ tarrifsList: response })
        console.log(response);
      })
  }
  DeleteTariff(id) {
    axios.delete("/tariff/" + id)
      .then(res => {
        const response = res.data;
        const tarrifsList = this.state.tarrifsList.filter((tarrif) => {
          return tarrif.id !== id;
        });
        this.setState({ tarrifsList })
      })
  }

  DefualtTariff(id) {
    axios.put("/tariff/set-default/" + id)
      .then(res => {
        const response = res.data;
        this.GetAllTariffs();
        // const index = this.state.tarrifsList.findIndex((tarriff) => tarriff.id === id);
        // const updateTarriffList = update(this.state.tarrifsList, {$splice: [[index, 1, res.data]]});  // array.splice(start, deleteCount, item1)
        // this.setState({tarrifsList: updateTarriffList});
      })
  }

  EditTariff(row){
    console.log(row.tariffName)
    const editedTariff={
      id:row.id,
      tariffName:row.tariffName
    }
    this.setState({name:row.tariffName})
    this.setState({editedTariff:editedTariff})
    this.setState({AddTariffMode:false})
    this.toggleModal()
  }



  ViewTariffBand(row) {
    console.log(row.id)
    return this.props.history.push('/admin-manage-tariff-bands/' + row.id, row)
  }

  AddTarriff = () => {
    return this.props.history.push('/admin-add-tariff')
  }

  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  }

  TableActionButtonStyle = {
    color: 'white',
    background: "#33414e"
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.toggleModal();

    const mode=this.state.AddTariffMode;
    if(mode){
    const tarriff = {
      "tariffName": this.state.name
    }

    axios.post("/tariff", tarriff).then(res => {
      console.log(res);
      console.log(res.data);
      this.GetAllTariffs();
      this.showSweetAlert('Added Tariff Successfully');
    })
  }else{
    console.log(this.state.editedTariff)
    const tariff={
      id:this.state.editedTariff.id,
      tariffName:this.state.name
    }
    axios.put("/tariff", tariff).then(res => {
      console.log(res);
      console.log(res.data);
      this.GetAllTariffs();
      this.setState({name:''})
      this.showSweetAlert('Updated Tariff Successfully');
    })
  }
  }

  showSweetAlert(message){
    return MySwal.fire({position: 'center',
    icon: 'success',
    title: message,
    text:"",
    showConfirmButton: false,
    timer: 1500})
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  hideToggelModal=()=>{
    this.setState({
      modal:!this.state.modal,
    })
    // this.setState(this.setState({AddTariffMode:true}))
  }

  AddTariffMode=()=>{
    this.setState({AddTariffMode:true})
    this.toggleModal();
  }

  

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}/>
  }
    let index = 0;
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Manage Tariffs
            <small>Showing all tariffs.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.AddTariffMode} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
                Add New Tariff</Button>
                

            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>{this.state.AddTariffMode?"Add Tariff":"Edit Tariff"}</ModalHeader>
              <form onSubmit={this.handleSubmit}>
              <ModalBody>
               
                  <div className="form-group px-md-2 px-1">
                    <label>Tarriff Name :</label>
                    <input className="form-control" name="name" onChange={this.handleChange}
                    value={this.state.name}
                     required ></input>
                  </div>
               
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-sm  mr-3 px-4" style={this.AddActionButtonStyle}>
                  Save
                  </button>
                {/* <button onClick={this.hideToggelModal} className="btn btn-sm btn-danger px-4">
                  Cancel
                  </button> */}
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
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th data-priority="1">S/N</th>
                    <th>TARIFF NAME</th>
                    <th>DEFAULT</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tarrifsList.map(row => (
                    <tr key={row.id}>
                      <td>{index += 1}</td>
                      <td>{row.tariffName}</td>
                      <td>{row.isDefault ? (
                        <span className="btn badge-success w-75">Default</span>
                      ) : (
                        <span className="btn bg-success-light w-75 " style={this.TableActionButtonStyle} onClick={() => this.DefualtTariff(row.id)}>Set Default</span>
                      )}</td>
                      <td>
                        <span className="btn badge-success mr-2" style={this.TableActionButtonStyle} onClick={() => this.EditTariff(row)} >
                          <i className="icon-pencil mr-2"></i>
                              Edit</span>
                              { row.isDefault!=1 &&
                        <span className="btn bg-danger-dark" onClick={() => this.DeleteTariff(row.id)}>
                          <i className="icon-trash mr-2"></i>
                              Delete</span> }
                        <button className="btn badge-success ml-2" onClick={() => this.ViewTariffBand(row)} style={this.TableActionButtonStyle}>
                          <i className="icon-info mr-2"></i>
                              View Bandwidth</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </CardBody>
          </Card>

        </Container>
      </ContentWrapper>
    );
  }
}

export default Tariffs;
