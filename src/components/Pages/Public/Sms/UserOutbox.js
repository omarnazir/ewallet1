import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import Datatable from "../../../Common/Datatable";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from "reactstrap";
import Datetime from "react-datetime";
import $ from "jquery";
import {AuthService} from "../../../../services"
import {Redirect} from 'react-router-dom';
import axios from '../../../../services/axios'

class UserOutbox extends Component {
  state = {
    dtOptions: {
      paging: true, // Table pagination
      ordering: true, // Column ordering
      info: true, // Bottom left status text
      responsive: true,
      // Text translation options
      // Note the required keywords between underscores (e.g _MENU_)
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
    isAuthenticated:false,
    smsList:[]
  };

  // Access to internal datatable instance for customizations
  dtInstance = (dtInstance) => {
    const inputSearchClass = "datatable_input_col_search";
    const columnInputs = $("tfoot ." + inputSearchClass);
    // On input keyup trigger filtering
    columnInputs.keyup(function () {
      dtInstance.fnFilter(this.value, columnInputs.index(this));
    });
  };

  componentDidMount(){
    const isAuthenticated=AuthService.isAuthenticated();
    if(!isAuthenticated){
    this.setState({redirect: "/login"})
    }

    axios.get("/sms")
    .then(res => {
      const response = res.data;
      this.setState({ smsList: response })
      console.log(response);
    })
  }

  //GO TO COMPOSE SMS
  ViewComposeSms = () => {
    return this.props.history.push("/send-sms");
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/login"/>
  }
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Sent Sms
            <small>Showing all sent messages.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.ViewComposeSms} outline color="danger" className="btn-pill-right">
              Compose SMS
            </Button>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardBody>
              {/* <Datatable options={this.state.dtOptions}> */}
                <table className="table table-striped my-4 w-100">
                  <thead>
                    <tr>
                      <th data-priority="1">ID</th>
                      <th className="" data-priority="2">
                        Sender
                      </th>
                      <th>SENT TO</th>
                      <th>NETWORK</th>
                      <th>MESSAGE</th>
                      <th>UNITS</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.smsList.map(row => (
                    <tr className="gradeA">
                      <td>{row.id}</td>
                      <td>{row.senderId}</td>
                      <td>{row.msisdn}</td>
                      <td>{row.network}</td>
                      <td>{row.message}</td>
                      <td>{1}</td>
                      <td>{row.createdAt}</td>
                      {row.status=="Delivered" && 
                      <td>
                        <span className="badge badge-success">Delivered</span>
                      </td>
                       }
                        {row.status!="Delivered" && 
                      <td>
                        <span className="badge badge-danger">{row.status}</span>
                      </td>
                       }
                    </tr>
                  ))}
                    
                    
                  </tbody>
                </table>
              {/* </Datatable> */}
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default UserOutbox;
