import React, { Component,Fragment } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, Button, Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter, } from "reactstrap";
import ReactDatatable from '@ashvin27/react-datatable';
import Moment from "moment";

class ManageSmsc extends Component {
  state = {
    smscList:[],
    modal: false,
    mode: true,
    editedSmsc:{
      id:0,
      smscUsername:"",
      smscPassword:"",
      isPublic:-1
    },
    smsc:{
      smscUsername:"",
      smscPassword:"",
      isPublic:-1
    }
  };

  initialState={
    smsc:{
      smscUsername:"",
      smscPassword:"",
      isPublic:-1
    }
  }

  componentDidMount(){
   this.getAllSmsc();
}
getAllSmsc(){
  axios.get("/smsc")
  .then(res => {
      const smscList = res.data;
      this.setState({ smscList })
     
  })
}

toggleModal = () => {
  this.setState({
    modal: !this.state.modal
  });
}

AddSmscMode = () => {
  this.setState({ mode: true })
  this.toggleModal();
}

EditSmsc(row) {
  console.log(row)
 const editedSmsc={
    id:row.id,
    smscUsername:row.smscUsername,
    smscPassword:row.smscPassword,
    isPublic:row.isPublic
  }
   this.setState({editedSmsc})
   this.setState({ mode: false })
   this.toggleModal();
 }


 DeleteSmsc(id) {
  axios.delete("/smsc/" + id)
    .then(res => {
      const response = res.data;
      const smscList = this.state.smscList.filter((item) => {
        return item.id !== id;
      });
      this.setState({ smscList })
    })
}


 handleChange = event => {       
  if(this.state.mode){
  this.setState({smsc:Object.assign({},
      this.state.smsc,{[event.target.name]:event.target.value})})
  }else {
      this.setState({editedSmsc:Object.assign({},this.state.editedSmsc,
          {[event.target.name]:event.target.value})})
  }
}



handleSubmit = event => {
  event.preventDefault();
  this.toggleModal();
  if (this.state.mode) {
    console.log("Add mode")
    const data=this.state.smsc;
    console.log("smsc",this.state.smsc)

    axios.post("/smsc",this.state.smsc ).then(res => {
      console.log(res.data);
      this.getAllSmsc();
      this.setState({smsc:this.initialState.smsc})
    })

  } else {
    console.log("Edit mode")
    axios.put("/smsc",this.state.editedSmsc).then(res => {
      console.log(res.data);
      this.getAllSmsc();

    })
  }
}

formatDate = (date) => {
  return Moment(date).format('lll')
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
      key: "smscUsername",
      text: "SMSC USERNAME"
    },
    {
      key: "smscPassword",
      text: "SMSC PASSWORD"
    },
    {
      key: "isPublic",
      text: "TYPE",
      cell: (record, index) => {
        if (record.isPublic == 1) {
          return (
           <span>Shared</span>
          );
        }
         if(record.isPublic == 0){
          return  (<span>Dedicated</span>);
        }
      }
    },
    {
      key: "status",
      text: "STATUS",
      cell: (record, index) => {
        if (record.status == "Pending") {
          return (
            <span className="badge badge-warning">Not Assigned</span>
          );
        }
        if(record.status == "Active"){
          return  (<span className="badge badge-success">Assigned</span>)
        }
        if(record.status == null){
          return (
            <span className="badge badge-warning">Not Assigned</span>
          );
        }
      }
    },
    {
      key: "createdAt",
      text: "CREATED AT",
      cell: (record, index) => {
      return    this.formatDate(record.createdAt)
      
    }
    },
    {
      key: "id",
      text: "ACTION",
      cell: (record, index) => {
        return (
          <Fragment>
            <span className="btn badge-success mr-2 px-4" onClick={() => this.EditSmsc(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
            <span className="btn bg-danger-dark  px-4" onClick={() => this.DeleteSmsc(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
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
          Manage Smsc
            <small>Manage all smsc public & private .</small>
          </div>
          <div className="flex-row">
          <Button onClick={this.AddSmscMode} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">Add New Smsc</Button>

          <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add New Smsc" : "Edit Smsc"}</ModalHeader>
              <form onSubmit={this.handleSubmit}>
                <ModalBody>
                  <FormGroup>
                    <label>Smsc Username :</label>
                    <input className="form-control" name="smscUsername"
                    value={this.state.mode? this.state.smsc.smscUsername:this.state.editedSmsc.smscUsername}
                     onChange={this.handleChange} type="text" required></input>
                  </FormGroup>

                  <FormGroup>
                    <label>Smsc Password :</label>
                    <input className="form-control" name="smscPassword"
                    value={this.state.mode? this.state.smsc.smscPassword:this.state.editedSmsc.smscPassword}
                     onChange={this.handleChange} type="text" required></input>
                  </FormGroup>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Smsc Type : </label>
                    <select className="form-control" id="exampleFormControlSelect1" name="isPublic"
                      onChange={this.handleChange}
                      value={this.state.mode? this.state.smsc.isPublic:this.state.editedSmsc.isPublic}
                    >
                      <option value="-1">Select type</option>
                      <option value="1">Shared</option>
                      <option value="0">Dedicated</option>
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
                records={this.state.smscList}
                columns={this.columns}
              />
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default ManageSmsc;
