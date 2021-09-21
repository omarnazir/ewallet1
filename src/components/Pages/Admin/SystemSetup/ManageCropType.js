import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button, Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter, } from "reactstrap";
import ReactDatatable from '@ashvin27/react-datatable';
import { Fragment } from "react";
import { CropsTypeService } from "../../../../services";

class ManageCropType extends Component {
  state = {
    crops:[],
    modal: false,
    mode: true,
    loading:true,
    editedCropType:{
      id:0,
      name:""
    },
    cropType:{
      name:""
    }
  };

  initialState={
    cropType:{
      name:"",
      description:"",
      type:""
    }
  }

  componentDidMount(){
   this.getAllCropTypes();
}
getAllCropTypes(){
  CropsTypeService.getAllCropTypes().then(res => {
      this.setState({loading:false})
      this.setState({ crops:res.data })
     
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
  const editedCropType={
    id:row.id,
    name:row.name,
    description:row.description,
    type:row.type
   }
   this.setState({editedCropType})
   this.setState({ mode: false })
   this.toggleModal();
 }


 DeleteRole(id) {
  axios.delete("/crop-types/" + id)
    .then(res => {
      const response = res.data;
      const crops = this.state.crops.filter((item) => {
        return item.id !== id;
      });
      this.setState({ crops })
    })
}


 handleChange = event => {       
  if(this.state.mode){
  this.setState({cropType:Object.assign({},
      this.state.cropType,{[event.target.name]:event.target.value})})
  }else {
      this.setState({editedCropType:Object.assign({},this.state.editedCropType,
          {[event.target.name]:event.target.value})})
  }
}



handleSubmit = event => {
  event.preventDefault();
  this.toggleModal();
  if (this.state.mode) {
    console.log("Add mode")
    axios.post("/crop-types",this.state.cropType ).then(res => {
      console.log(res.data);
      this.getAllCropTypes();
      this.setState({cropType:this.initialState.cropType})
    })
  } else {
    console.log("Edit mode")
    axios.put("/crop-types",this.state.editedCropType).then(res => {
      console.log(res.data);
      this.getAllCropTypes();

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
      key: "id",
      text: "ACTION",
      cell: (record, index) => {
        return (
          <Fragment>
            <span className="btn badge-success mr-2 px-4" onClick={() => this.EditRole(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
            <span className="btn bg-danger-dark  px-4" onClick={() => this.DeleteRole(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
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
            Crops Types
            <small>Manage crops types.</small>
          </div>
          <div className="flex-row">
          <Button onClick={this.AddRoleMode} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
          <i className="fa fa-plus mr-2"></i>
              Add Crop Type</Button>

          <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add Crop Type" : "Edit Crop Type"}</ModalHeader>
              <form onSubmit={this.handleSubmit}>
                <ModalBody>
                  <FormGroup>
                    <label>Name :</label>
                    <input className="form-control" name="name"
                    value={this.state.mode? this.state.cropType.name:this.state.editedCropType.name}
                     onChange={this.handleChange} type="text" required></input>
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

export default ManageCropType;
