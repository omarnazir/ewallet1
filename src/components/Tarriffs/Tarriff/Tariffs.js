import React, { Component } from "react";
import ContentWrapper from "../../Layout/ContentWrapper";
import Datatable from "../../Common/Datatable";
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import $ from "jquery";
import axios from "../../../services/axios";


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
    axios.get("/tariff")
      .then(res => {
        const response = res.data;
        this.setState({ tarrifsList: response })
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
  AddTarriff = () => {
    return this.props.history.push('/add-tariff')
  }

  ViewTarriffBand = () => {
    return this.props.history.push('/manage-tariff-bands')
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
            <Button onClick={this.AddTarriff} outline color="danger" className="btn-pill-right">Add New Tariff</Button>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardHeader>
            </CardHeader>
            <CardBody>
              <Datatable options={this.state.dtOptions}>
                <table className="table table-striped my-4 w-100">
                  <thead>
                    <tr>
                      <th data-priority="1">ID</th>
                      <th>TARIFF NAME</th>
                      <th>DEFAULT</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr className="gradeA">
                      <td>Gecko</td>
                      <td>Netscape 7.2</td>
                      <td>Win 95+ / Mac OS 8.6-9.2</td>
                      <td>1.7</td>
                      <td>A</td>
                    </tr> */}

                    {this.state.tarrifsList.map(row => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.tariffName}</td>
                        <td>{row.isDefault?(
                          <span className="badge badge-success">Default</span>
                        ):(
                          <span className="btn badge-success">Set Default</span>
                        )}</td>
                        <td>
                         
                            <span className="btn badge-success">Edit</span>
                            <span className="btn badge-danger mr-1 ml-1">Delete</span>
                            <button className="btn badge-success" onClick={this.ViewTarriffBand}>View Bandwidth</button>
                        

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Datatable>
            </CardBody>
          </Card>

        </Container>
      </ContentWrapper>
    );
  }
}

export default Tariffs;
