import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import {
  Container, Card, CardHeader, CardBody, CardTitle, Button, Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import ReactDatatable from '@ashvin27/react-datatable';
import { Fragment } from "react";
import { CropsService, CropsTypeService } from "../../../../services";
import {SuccessAlert,DeleteAlert} from "../../../Common/AppAlerts";

class ManageCrop extends Component {
  state = {
    crops: [],
    modal: false,
    mode: true,
    loading: true,
    editedCrop: {
      id: 0,
      name: "",
      cropType: 0
    },
    crop: {
      name: "",
      cropType: 0
    },
    cropTypeList: []
  };

  initialState = {
    crop: {
      name: "",
      cropType: 0
    }
  }

  componentDidMount() {
    this.getAllCrops();
    this.getAllCropTypes();
  }
  getAllCrops() {
    CropsService.getAllCrops().then(res => {
      const crops = res.data;
      this.setState({ loading: false })
      this.setState({ crops })

    })
  }

  getAllCropTypes() {
    CropsTypeService.getAllCropTypes().then(res => {
      this.setState({ cropTypeList: res.data })
    })
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  AddRoleMode = () => {
    this.setState({ mode: true })
    this.toggleModal();
  }

  EditRole(row) {
    console.log(row)
    const cropType = row.cropType == null ? 0 : Number(row.cropType.id);
    const editedCrop = {
      id: row.id,
      name: row.name,
      cropType
    }
    this.setState({ editedCrop })
    this.setState({ mode: false })
    this.toggleModal();
  }

  AlertDeleteItem(id){
    DeleteAlert().then((willDelete)=>{
      if(willDelete){
        this.DeleteRole(id);
        SuccessAlert("Deleted Crop Successfully")
      }
    })
  }

  DeleteRole(id) {  
    axios.delete("/crops/" + id)
      .then(res => {
        const response = res.data;
        const crops = this.state.crops.filter((item) => {
          return item.id !== id;
        });
        this.setState({ crops })
      })
  }


  handleChange = event => {
    if (this.state.mode) {
      this.setState({
        crop: Object.assign({},
          this.state.crop, { [event.target.name]: event.target.value })
      })
    } else {
      this.setState({
        editedCrop: Object.assign({}, this.state.editedCrop,
          { [event.target.name]: event.target.value })
      })
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    this.toggleModal();
    if (this.state.mode) {
      console.log("Add mode")
      const data= {
        name: this.state.crop.name,
        cropType: Number(this.state.crop.cropType)
      }
      axios.post("/crops",data).then(res => {
        console.log(res.data);
        this.getAllCrops();
        SuccessAlert("Added Crop Successfully");
        this.setState({ crop: this.initialState.crop })
      })
    } else {
      console.log("Edit mode")
      console.log(this.state.editedCrop);
      axios.put("/crops", this.state.editedCrop).then(res => {
        console.log(res.data);
        SuccessAlert("Updated Crop Successfully")
        this.getAllCrops();
      })
    }
  }

  columns = [
    {
      key: "id",
      text: "ID",
      cell: (record, index) => {
        return index + 1;
      }
    },
    {
      key: "name",
      text: "NAME"
    },
    {
      key: "type",
      text: "TYPE",
      cell: (record, index) => {
        if (record.cropType != null) {
          return record.cropType.name;
        }
        return "";
      }
    },
    {
      key: "id",
      text: "ACTION",
      cell: (record, index) => {
        return (
          <Fragment>
            <span className="btn badge-success mr-2 px-4" onClick={() => this.EditRole(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
            <span className="btn bg-danger-dark  px-4" onClick={() => this.AlertDeleteItem(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
          </Fragment>
        )
      }
    }
  ]

  config = {
    page_size: 10,
    length_menu: [10, 25, 50],
    show_filter: true,
    show_pagination: true,
    pagination: 'advance',
    filename: "Contact List",
    button: {

    },
    language: {
      loading_text: "Please be patient while data loads..."
    }
  }

  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  }

  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Crops
            <small>Manage crops.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.AddRoleMode} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
              <i className="fa fa-plus mr-2"></i>
              Add Crop</Button>

            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add Crop" : "Edit Crop"}</ModalHeader>
              <form onSubmit={this.handleSubmit}>
                <ModalBody>
                  <FormGroup>
                    <label>Name :</label>
                    <input className="form-control" name="name"
                      value={this.state.mode ? this.state.crop.name : this.state.editedCrop.name}
                      onChange={this.handleChange} type="text" required></input>
                  </FormGroup>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Crop Type : </label>
                    <select className="form-control" id="exampleFormControlSelect1" name="cropType"
                      onChange={this.handleChange}
                      value={this.state.mode ? this.state.crop.cropType : this.state.editedCrop.cropType}
                    >
                      <option value="0">Select type</option>
                      {this.state.cropTypeList.map(row => (
                        <option key={row.id} value={row.id} >
                          {row.name}
                        </option>
                      ))}

                    </select>
                  </div>
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
                extraButtons={this.extraButtons}
                config={this.config}
                records={this.state.crops}
                columns={this.columns}
                loading={this.state.loading}
              />
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default ManageCrop;
