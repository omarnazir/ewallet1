import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable"
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import $ from "jquery";



class TarriffBand extends Component {
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
    tariffBandList: [],
    tariffId:0,
    tariff:{}
  };

  componentDidMount() {
    const { state } = this.props.history.location;
    this.setState({tariff:state})
    this.setState({tariffId:state.id})
    console.log('id', state.id);
    console.log("name",state.tariffName)

    axios.get("/tariff-bands/tariff/"+state.id)
      .then(res => {
        const response = res.data;
        this.setState({ tariffBandList: response })
        console.log(response);
      })
    
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
  AddTariffBand = () => {
    return this.props.history.push('/admin/add-tariff-band/'+this.state.tariff.id,this.state.tariff)
  }
  ViewTarriffBand = () => {
    return this.props.history.push('/admin/manage-tariff-bands')
  }

  ViewTarrifs=()=>{
    return this.props.history.push('/admin/manage-tariffs') 
  }

  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Manage Tarriff Band
            <small>Showing all tarriff bands.</small>
          </div>
          <div className="flex-row">
          <Button onClick={this.ViewTarrifs} outline color="danger" className="btn-pill-right mr-2">View All Tarrifs</Button>
          <Button onClick={this.AddTariffBand} outline color="danger" className="btn-pill-right">Add New Tariff Band</Button>
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
                        <td>{row.id}</td>
                        <td>{this.state.tariff.tariffName}</td>
                        <td>{row.pricePerSms}</td>
                        <td>{row.smsVolume}</td>
                        <td>{row.expireDurationDays}</td>
                        <td>
                        <span className="btn badge-success mr-2" style={this.TableActionButtonStyle}>
                             <i className="icon-pencil mr-2"></i>
                              Edit</span>
                            <span className="btn bg-danger-dark" onClick={() => this.DeleteTariff(row.id)}>
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
