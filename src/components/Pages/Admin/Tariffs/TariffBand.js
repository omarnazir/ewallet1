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
import $ from "jquery";

class TarriffBand extends Component {
  state = {
    tariffBandList: [],
    tariffId: 0,
    tariff: {},
    tariffName: "",
    modal: false,
    AddTariffBandMode: true,
    bandAmount: '',
    smsQuantity: '',
    expireDurationDays: '',
    vatAmount: '',
    AddTariffBandMode: true,
    tariffBandId: 0,
  };

  componentDidMount() {
    const { state } = this.props.history.location;
    if (state == undefined) {
      return this.props.history.push('/admin/manage-tariff-bands')
    }
    this.setState({ tariff: state })
    this.setState({ tariffId: state.id })
    this.setState({ tariffName: state.tariffName })


    this.getTariffBands(state.id)
  }

  getTariffBands(id) {
    axios.get("/tariff-bands/tariff/" + id)
      .then(res => {
        const response = res.data;
        this.setState({ tariffBandList: response })
        console.log(response);
      })
  }

  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  }

  handleSubmit = event => {
    event.preventDefault();
    this.toggleModal();

    const mode = this.state.AddTariffBandMode;

    const tariffBands = {
      "id": this.state.tariffBandId,
      "tariffId": this.state.tariffId,
      "bandAmount": this.state.bandAmount,
      "smsQuantity": this.state.smsQuantity,
      "expireDurationDays": this.state.expireDurationDays,
      "vatAmount": this.state.vatAmount
    }

    if (mode) {
      console.log("Add mode")
      axios.post("/tariff-bands", tariffBands).then(res => {
        console.log(res.data);
        this.getTariffBands(this.state.tariffId)

      })
    } else {
      console.log("Edit mode")
      axios.put("/tariff-bands", tariffBands).then(res => {
        console.log(res.data);
        this.getTariffBands(this.state.tariffId)

      })
    }
  }

  EditTariffBand(row) {
    console.log("Clicked here" + row)
    this.setState({ AddTariffBandMode: false })
    this.setState({ tariffBandId: row.id })
    this.setState({ tariffId: row.tariffId })
    this.setState({ bandAmount: row.bandAmount })
    this.setState({ smsQuantity: row.smsQuantity })
    this.setState({ expireDurationDays: row.expireDurationDays })
    this.setState({ vatAmount: row.vatAmount })

    this.toggleModal();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }


  ViewTarriffBand = () => {
    return this.props.history.push('/admin-manage-tariff-bands')
  }

  DeleteTariffBand(id) {
    axios.delete("/tariff-bands/" + id)
      .then(res => {
        const response = res.data;
        const tariffBandList = this.state.tariffBandList.filter((tarrif) => {
          return tarrif.id !== id;
        });
        this.setState({ tariffBandList })
      })
  }

  ViewTarrifs = () => {
    return this.props.history.push('/admin-manage-tariffs')
  }
  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  AddTariffBandMode = () => {
    this.setState({ AddTariffBandMode: true })
    this.setState({ tariffBandsId: 0 })
    this.setState({ bandAmount: '' })
    this.setState({ smsQuantity: '' })
    this.setState({ expireDurationDays: '' })
    this.setState({ vatAmount: '' })
    this.toggleModal();
  }

  hideToggelModal = () => {
    this.setState({
      modal: false,
    })
  }

  render() {
    let index = 0;
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Manage Tarriff Band
            <small>Showing all tarriff bands.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.ViewTarrifs} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Tarrifs</Button>
            <Button onClick={this.AddTariffBandMode} style={this.AddActionButtonStyle} className="btn-pill-right">Add New Tariff Band</Button>

            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>{this.state.mode == "add" ? "Add Tariff Band" : "Edit Tariff Band"}</ModalHeader>
              <form onSubmit={this.handleSubmit}>
                <ModalBody>
                  <FormGroup>
                    <label>Amount :</label>
                    <input className="form-control" name="bandAmount" value={this.state.bandAmount} onChange={this.handleChange} type="number" required></input>
                  </FormGroup>
                  <FormGroup>
                    <label>Vat Amount :</label>
                    <input className="form-control" name="vatAmount" value={this.state.vatAmount} onChange={this.handleChange} type="number" required></input>
                  </FormGroup>
                  <FormGroup>
                    <label>Number of SMS :</label>
                    <input className="form-control" name="smsQuantity" value={this.state.smsQuantity} onChange={this.handleChange} type="number" required></input>
                  </FormGroup>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Expire Time (Days): </label>
                    <select className="form-control" id="exampleFormControlSelect1" name="expireDurationDays"
                      onChange={this.handleChange}
                      value={this.state.expireDurationDays}
                    >
                      <option value="0">Select number days</option>
                      <option value="30">30 Days</option>
                      <option value="60">60 Days</option>
                      <option value="90">90 Days</option>
                      <option value="180">180 Days</option>
                      <option value="365">365 Days</option>
                      <option value="1000000000">Never</option>
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

              <table className="table table-striped my-4 w-100">
                <thead>
                  <tr>
                    <th data-priority="1">ID</th>
                    <th>TARIFF NAME</th>
                    <th>TARIFF (Tshs)</th>
                    <th>SMS VOLUME</th>
                    <th>EXPIRATION (Days)</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tariffBandList.map(row => (
                    <tr key={row.id}>
                      <td>{index += 1}</td>
                      <td>{this.state.tariff.tariffName}</td>
                      <td>{row.bandAmount}</td>
                      <td>{row.smsQuantity}</td>
                      <td>{row.expireDurationDays}</td>
                      <td>
                        <span className="btn badge-success mr-2" style={this.TableActionButtonStyle}
                          onClick={() => this.EditTariffBand(row)}
                        >
                          <i className="icon-pencil mr-2"></i>
                              Edit</span>

                        <span className="btn bg-danger-dark" onClick={() => this.DeleteTariffBand(row.id)}>
                          <i className="icon-trash mr-2"></i>
                              Delete</span>
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

export default TarriffBand;
