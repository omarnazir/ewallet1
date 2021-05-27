import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import $ from "jquery";
import update from 'immutability-helper';

class Tariffs extends Component {
  state = {
    dtOptions: {
      paging: true, // Table pagination
      ordering: true, // Column ordering
      info: true, // Bottom left status text
      responsive: true,
      oLanguage: {
        sSearch: '<em class="fa fa-search"></em>',
        sLengthMenu: "_MENU_ records per page",
        info: "Showing page _PAGE_ of _PAGES_",
        zeroRecords: "Nothing found - sorry",
        infoEmpty: "No records available",
        infoFiltered: "(filtered from _MAX_ total records)",
        oPaginate: {
          sNext: '<em class="fa fa-caret-right"></em>',
          sPrevious: '<em class="fa fa-caret-left"></em>',
        },
      },
      // Datatable Buttons setup
      dom: "Bfrtip",
      buttons: [
        { extend: "csv", className: "btn-info" },
        { extend: "excel", className: "btn-info", title: "XLS-File" },
        { extend: "pdf", className: "btn-info", title: $("title").text() },
        { extend: "print", className: "btn-info" },
      ],
    },
    tarrifsList: []
  };

  componentDidMount() {
    this.GetAllTariffs()
  }

  GetAllTariffs=()=>{
    axios.get("/tariff")
    .then(res => {
      const response = res.data;
      this.setState({ tarrifsList: response })
      console.log(response);
    })
  }
  DeleteTariff(id){
    axios.delete("/tariff/" + id)
    .then(res => {
      const response = res.data;
      const tarrifsList = this.state.tarrifsList.filter((tarrif) => {
        return tarrif.id !== id;
      });
      this.setState({ tarrifsList })
    })
  }

  DefualtTariff(id){
    axios.put("/tariff/set-default/" + id)
    .then(res => {
      const response = res.data;
      this.GetAllTariffs();
      // const index = this.state.tarrifsList.findIndex((tarriff) => tarriff.id === id);
      // const updateTarriffList = update(this.state.tarrifsList, {$splice: [[index, 1, res.data]]});  // array.splice(start, deleteCount, item1)
      // this.setState({tarrifsList: updateTarriffList});
    })
  }

  ViewTariffBand(row){
    console.log(row.id)
    return this.props.history.push('/admin/manage-tariff-bands/'+row.id,row)
  }

  // Access to internal datatable instance for customizations
  dtInstance = (dtInstance) => {
    const inputSearchClass = "datatable_input_col_search";
    const columnInputs = $("tfoot ." + inputSearchClass);
    // On input keyup trigger filtering
    columnInputs.keyup(function () {
      dtInstance.fnFilter(this.value, columnInputs.index(this));
    });
  };
  AddTarriff = () => {
    return this.props.history.push('/admin/add-tariff')
  }

  AddActionButtonStyle={
    color:'white',
    background:"#003366"
  }

  TableActionButtonStyle={
    color:'white',
    background:"#33414e"
  }




  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Manage Tariffs
            <small>Showing all tariffs.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.AddTarriff} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
                Add New Tariff</Button>
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
                      <th data-priority="1">ID</th>
                      <th>TARIFF NAME</th>
                      <th>DEFAULT</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tarrifsList.map(row => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.tariffName}</td>
                        <td>{row.isDefault?(
                          <span className="badge badge-success">Default</span>
                        ):(
                          <span className="btn bg-success-light" style={this.TableActionButtonStyle} onClick={() => this.DefualtTariff(row.id)}>Set Default</span>
                        )}</td>
                        <td>
                            <span className="btn badge-success mr-2" style={this.TableActionButtonStyle}>
                             <i className="icon-pencil mr-2"></i>
                              Edit</span>
                            <span className="btn bg-danger-dark" onClick={() => this.DeleteTariff(row.id)}>
                            <i className="icon-trash mr-2"></i>
                              Delete</span>
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
