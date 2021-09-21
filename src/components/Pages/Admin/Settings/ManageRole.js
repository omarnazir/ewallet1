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


class ManageRole extends Component {
  state = {
    roles:[],
    modal: false,
    mode: true,
    loading:true,
    editedRole:{
      id:0,
      name:"",
      description:"",
      type:""
    },
    role:{
      name:"",
      description:"",
      type:""
    }
  };

  initialState={
    role:{
      name:"",
      description:"",
      type:""
    }
  }

  componentDidMount(){
   this.getAllRoles();
}
getAllRoles(){
  axios.get("/roles")
  .then(res => {
      const roles = res.data;
      this.setState({loading:false})
      this.setState({ roles })
     
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
  const editedRole={
    id:row.id,
    name:row.name,
    description:row.description,
    type:row.type
   }
   this.setState({editedRole})
   this.setState({ mode: false })
   this.toggleModal();
 }


 DeleteRole(id) {
  axios.delete("/roles/" + id)
    .then(res => {
      const response = res.data;
      const roles = this.state.roles.filter((item) => {
        return item.id !== id;
      });
      this.setState({ roles })
    })
}


 handleChange = event => {       
  if(this.state.mode){
  this.setState({role:Object.assign({},
      this.state.role,{[event.target.name]:event.target.value})})
  }else {
      this.setState({editedRole:Object.assign({},this.state.editedRole,
          {[event.target.name]:event.target.value})})
  }
}



handleSubmit = event => {
  event.preventDefault();
  this.toggleModal();
  if (this.state.mode) {
    console.log("Add mode")
    axios.post("/roles",this.state.role ).then(res => {
      console.log(res.data);
      this.getAllRoles();
      this.setState({role:this.initialState.role})
    })
  } else {
    console.log("Edit mode")
    axios.put("/roles",this.state.editedRole).then(res => {
      console.log(res.data);
      this.getAllRoles();

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
      key: "description",
      text: "DESCRIPTION"
    },
    {
      key: "type",
      text: "TYPE"
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
            Manage Role
            <small>Manage roles in the system.</small>
          </div>
          <div className="flex-row">
          <Button onClick={this.AddRoleMode} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
          <i className="fa fa-plus mr-2"></i>
            Add New Role</Button>

          <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add Role" : "Edit Role"}</ModalHeader>
              <form onSubmit={this.handleSubmit}>
                <ModalBody>
                  <FormGroup>
                    <label>Role Name :</label>
                    <input className="form-control" name="name"
                    value={this.state.mode? this.state.role.name:this.state.editedRole.name}
                     onChange={this.handleChange} type="text" required></input>
                  </FormGroup>

                  <FormGroup>
                    <label>Description :</label>
                    <input className="form-control" name="description"
                    value={this.state.mode? this.state.role.description:this.state.editedRole.description}
                     onChange={this.handleChange} type="text" required></input>
                  </FormGroup>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Role Type : </label>
                    <select className="form-control" id="exampleFormControlSelect1" name="type"
                      onChange={this.handleChange}
                      value={this.state.mode? this.state.role.type:this.state.editedRole.type}
                    >
                      <option value="0">Select role</option>
                      <option value="Admin">Admin</option>
                      <option value="Customer_Admin">Customer Admin</option>
                      <option value="User">Normal User</option>
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
                records={this.state.roles}
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

export default ManageRole;
