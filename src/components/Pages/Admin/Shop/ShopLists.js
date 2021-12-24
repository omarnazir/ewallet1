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
import ShopsService from "../../../../services/SystemSetup/shop.service";
import { SuccessAlert, DeleteAlert } from "../../../Common/AppAlerts";


class ManageShops extends Component {
  state = {
    shops: [],
    modal: false,
    mode: true,
    loading: true,
    editedShop: {
      id: 0,
      name: "",
      msisdn: 0
    },
    shop: {
      name: "",
      msisdn: 0
    },
    amcosList: [],
    amcos: [], 
    amcosNames: []
  };

  initialState = {
    shop: {
      name: "",
      msisdn: 0
    }
  };

  componentDidMount() {
    this.getAllShops();
    this.GetAmcosByVillage(5195);
    // this.getAllAmcos();
  }
  getAllShops() {
    ShopsService.getAllShops().then(res => {
      const shops = res.data;
      console.log(shops);
      this.setState({ loading: false });
      this.setState({ shops });

    });
  }

  ViewAllShops = () =>{
    return this.props.history.push('admin-manage-shops')
  }

  ViewShopDetails = (id) => {
    console.log(id)
    return this.props.history.push("/admin-shop-details/"+id);
  }

  GetAmcosByVillage = (id) => {
    axios.get('/amcos').then(res => {
      this.setState({ amcosList: res.data });
    });
  };

  HandleOnSelect = (e) => {
    e.preventDefault();
    let newList = [];
    let amcosNames =[]

    amcosNames.push(e.target.options[e.target.selectedIndex].text)
    this.setState({ amcos: newList });
    this.setState({amcosNames: amcosNames})
    console.log(this.state.amcos);
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  AddShopModal = () => {
    this.setState({ mode: true });
    this.toggleModal();
  };

  EditRole(row) {
    console.log(row);
    const cropType = row.cropType == null ? 0 : Number(row.cropType.id);
    const editedShop = {
      id: row.id,
      name: row.name,
      // cropType
    };
    this.setState({ editedShop });
    this.setState({ mode: false });
    this.toggleModal();
  }

  AlertDeleteItem(id) {
    DeleteAlert().then((willDelete) => {
      if (willDelete) {
        this.DeleteShop(id);
        SuccessAlert("Deleted Shop Successfully");
        this.ViewAllShops()
      }
    });
  }

  DeleteShop = (id) => {
    let data = {
      id: id
    }
    axios.delete("/shop-or-provider/delete", { data })
  }

  handleChange = event => {
    if (this.state.mode) {
      this.setState({
        shop: Object.assign({},
          this.state.shop, { [event.target.name]: event.target.value })
      });
    } else {
      this.setState({
        editedShop: Object.assign({}, this.state.editedShop,
          { [event.target.name]: event.target.value })
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.toggleModal();
    if (this.state.mode) {
      console.log("Add mode");
      const data = {
        name: this.state.shop.name,
        amcosIDs: this.state.amcos,
        msisdn: this.state.shop.msisdn
      };
      axios.post("/shop-or-provider/add", data).then(res => {
        console.log(res.data);
        SuccessAlert("Added Shop Successfully");
        this.setState({ shop: this.initialState.shop });
        this.getAllShops();
      });
    } else {
      console.log("Edit mode");
      console.log(this.state.editedShop);
      axios.put("/shop-or-provider/update", this.state.editedShop).then(res => {
        console.log(res.data);
        SuccessAlert("Updated Shop Successfully");
        this.getAllShops();
      });
    }
  };

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
      key: "msisdn",
      text: "PHONE NUMBER",

    },
    {
      key: "id",
      text: "ACTION",
      cell: (record, index) => {
        return (
          <Fragment>
            <span className="btn badge-success mr-2 px-4" onClick={()=>this.ViewShopDetails(record.id)}> <i className="fa fa-eye"  ></i></span>
            {/* <span className="btn bg-danger-dark  px-4" onClick={() => this.AlertDeleteItem(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span> */}
          </Fragment>
        );
      }
    }
  ];

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
  };

  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  };



  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Shops
            <small>Manage shops.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.AddShopModal} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
              <i className="fa fa-plus mr-2"></i>
              Add Shop</Button>

            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add Shop" : "Edit Shop"}</ModalHeader>
              <form onSubmit={this.handleSubmit}>
                <ModalBody>
                  <div className="form-group">
                    <label>Name :</label>
                    <input className="form-control" name="name" onChange={this.handleChange}
                      value={this.state.mode ? this.state.shop.name : this.state.editedShop.name}
                      type="text" required></input>
                  </div>

                  <div className="form-group">
                    <label>Phone :</label>
                    <input className="form-control" name="msisdn" onChange={this.handleChange}
                      value={this.state.mode ? this.state.shop.msisdn : this.state.editedShop.msisdn}
                      type="tel" required></input>
                  </div>

                  <div className="form-group">
                    <label>Amcos :</label>
                    <select name="amcosIDs" onChange={this.HandleOnSelect} className="form-control">
                      <option>Select AMCOS</option>
                      {
                        this.state.amcosList.map(row => {
                          { console.log(row); }
                          return <option value={row.id}>{row.name}</option>;
                        })
                      }
                    </select>
                  </div>

                  <div>
                    <h5>Selected AMCOS</h5>
                    <ul class="list-group">
                      
                        
                      
                      {this.state.amcosNames.map((row, i) => {
                        return <li class="list-group-item">{i + 1}. {row}</li>;
                      })}
                    </ul>
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
                records={this.state.shops}
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

export default ManageShops;
