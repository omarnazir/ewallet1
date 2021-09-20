import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import {
    Container, Card, CardHeader, CardBody, CardTitle, Button, ModalHeader, Modal,
    ModalBody,
    ModalFooter,
    FormGroup
} from "reactstrap";
import $ from "jquery";
import ReactDatatable from '@ashvin27/react-datatable';
import { Fragment } from "react";
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class MobileOperator extends Component {
    state = {
        operators: [],
        operator:{
            code:"",
            network:""
        },
        editedOperator:{},
        AddMode:true
    };

    componentDidMount() {
        this.GetMobileOperators();
       }

  handleSubmit = event => {
    event.preventDefault();
    this.toggleModal();

    if(this.state.AddMode){
    axios.post("/operators", this.state.operator).then(res => {
      console.log(res);
      this.GetMobileOperators();
      this.showSweetAlert('Added Mobile Operator Successfully');
    })

  }else{
    axios.put("/operators", this.state.editedOperator).then(res => {
      console.log(res);
      this.GetMobileOperators();
      this.showSweetAlert('Updated Mobile Operator Successfully');
    })
  }
  }

  toggleModal = () => {
    this.setState({
        modal: !this.state.modal
    });
}
    GetMobileOperators(){
        axios.get("/operators")
        .then(res => {
            const operators = res.data;
            this.setState({ operators })
            console.log(operators);
        })
    }

    DeleteOperator(id) {
        axios.delete("/operators/" + id)
          .then(res => {
            const response = res.data;
            const operators = this.state.operators.filter((item) => {
              return item.id !== id;
            });
            this.setState({ operators })
          })
      }

      showSweetAlert(message){
        return MySwal.fire({position: 'center',
        icon: 'success',
        title: message,
        text:"",
        showConfirmButton: false,
        timer: 1500})
      }


  EditOperator(row){
    const editedOperator={
        id:row.id,
        code:row.code,
        network:row.network,
    }
    this.setState({editedOperator:editedOperator})
    this.setState({AddMode:false})
    this.toggleModal()
  }



    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

    handleChange = event => {       
        if(this.state.AddMode){
        this.setState({operator:Object.assign({},
            this.state.operator,{[event.target.name]:event.target.value})})
        }else {
            this.setState({editedOperator:Object.assign({},this.state.editedOperator,
                {[event.target.name]:event.target.value})})
        }
      }

    setAddOperatorMode =()=>{
        this.setState({AddMode:true})
        this.toggleModal();
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
            key: "network",
            text: "NETWORK"
        },
        {
            key: "code",
            text: "CODE"
        },
        {
            key: "id",
            text: "ACTION",
            cell: (record, index) => {
                return (
                    <Fragment>
                        <span className="btn badge-success mr-2 px-4" onClick={() => this.EditOperator(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
                        <span className="btn badge-danger  px-4" onClick={() => this.DeleteOperator(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
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
        pagination:'advance',
        filename: "Contact List",
        button: {
         
        },
        language: {
          loading_text: "Please be patient while data loads..."
      }
      }


    render() {
        return (
            <ContentWrapper>

                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Mobile Operator
            <small>Showing all mobile operators.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.setAddOperatorMode} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">Add New Operator</Button>

                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>{this.state.AddMode ? "Add Mobile operator" : "Edit Mobile operator"}</ModalHeader>
                            <form onSubmit={this.handleSubmit}>
                                <ModalBody>

                                    <div className="form-group px-md-2 px-1">
                                        <label>Network Name :</label>
                                        <input className="form-control" name="network" onChange={this.handleChange}
                                            value={ this.state.AddMode? this.state.network :this.state.editedOperator.network}
                                            required ></input>
                                    </div>

                                    <div className="form-group px-md-2 px-1">
                                        <label>Code :</label>
                                        <input className="form-control" name="code" onChange={this.handleChange}
                                            value={ this.state.AddMode? this.state.code :this.state.editedOperator.code}
                                            required ></input>
                                    </div>

                                </ModalBody>
                                <ModalFooter>
                                    <button className="btn btn-sm  mr-3 px-4" style={this.AddActionButtonStyle}>
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
                                records={this.state.operators}
                                columns={this.columns}
                            />
                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
        );
    }
}

export default MobileOperator;
