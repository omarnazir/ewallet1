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
import OrderService from "../../../../services/SystemSetup/order.service";
import {SuccessAlert,DeleteAlert} from "../../../Common/AppAlerts";


class ManageOrders extends Component {
  state = {
    orders: [],
    modal: false,
    mode: true,
    loading: true,
    editedOrder: {
      id: 0,
      name: "",
      msisdn: 0
    },
    order: {
      name: "",
      msisdn: 0
    },
    amcosList: []
  };

  initialState = {
    order: {
      name: "",
      msisdn: 0
    }
  }

  componentDidMount() {
    this.getAllOrders();
    // this.getAllAmcos();
  }
  getAllOrders() {
    OrderService.getAllOrders().then(res => {

      const orders = res.data;
      console.log(orders)
      this.setState({ loading: false })
      this.setState({ orders })

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
    const editedShop = {
      id: row.id,
      name: row.name,
      cropType
    }
    this.setState({ editedShop })
    this.setState({ mode: false })
    this.toggleModal();
  }

  DeclineOrder = (id) => {
    OrderService.declineOrder(id).then(res=>{
        console.log(res.data)
    }).catch(err=>{
        console.log(err)
    })
  }

  ApproveOrder = (id) => {
      OrderService.approveOrder(id).then(res=> {
          console.log(res.data)
      }).catch(err=>{
          console.log(err)
      })
  }

//   DeleteRole(id) {  
//     axios.delete("/shop-or-provider/delete")
//       .then(res => {
//         const response = res.data;
//         const shops = this.state.shops.filter((item) => {
//           return item.id !== id;
//         });
//         this.setState({ shops })
//       })
//   }


ViewTransaction = (id) => {
  this.props.history.push('/admin-manage-order/'+id)
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
      key: "shopMsisdn",
      text: "SHOP MSISDN",
      
    },
    {
        key: "farmerName",
        text: "FARMER NAME",
        cell: (record, index)=>{
            return `${record.farmer.firstName} ${record.farmer.surname}`
        }
      },
      {
        key: "farmerAmcos",
        text: "FARMER AMCOS",
        cell: (record, index)=>{
            return `${record.farmer.amcos.name}`
        }
      },
      {
        key: "farmerAmcos",
        text: "FARMER MSISDN",
        cell: (record, index)=>{
            return `${record.farmer.msisdn}`
        }
      },
      {
        key: "orderNumber",
        text: "ORDER NUMBER",
        
      },
    {
      key: "status",
      text: "STATUS",
      cell: (record, index) => {
          if (record.status=="DECLINED") {
            return <span disabled className="badge badge-pill badge-danger">Declined</span>
          }

          if (record.status=="APPROVED") {
            return <span disabled className="badge badge-pill badge-success">APPROVED</span>
          }
          if (record.status=="DELIVERED") {
            return <span disabled className="badge badge-pill badge-primary">DELIVERED</span>
          }
          if(record.status=='NOT_APPROVED'){
            return <span className="badge badge-pill badge-secondary" >PENDING</span>
          }
      }

    },
    {
      key: "id",
      text: "ACTION",
      cell: (record, index) => {
        return (
          <Fragment>
            <span className="btn badge-success mr-2" style={{ color: 'white', 'background': 'rgb(0, 51, 102) none repeat scroll 0% 0%' }} onClick={() => this.ViewTransaction(record.orderNumber)}><i className="fa fa-eye" ></i></span>
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
            Orders
            <small>Manage orders.</small>
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
                records={this.state.orders}
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

export default ManageOrders;
