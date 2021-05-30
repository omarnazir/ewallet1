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
  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
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
            <Button onClick={this.ViewComposeSms}  style={this.AddActionButtonStyle} className="btn-pill-right">
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
