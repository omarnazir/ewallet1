import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle,Button } from "reactstrap";
import $ from "jquery";
import ReactDatatable from '@ashvin27/react-datatable';
import Moment from "moment"
import { Fragment } from "react";


class RestrictedWords extends Component {
  state = {
   words:[]
  };

  componentDidMount(){
      axios.get("/reserved-words")
          .then(res => {
              const words = res.data;
              this.setState({ words })
             
          })
  }

  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
}

  columns = [
    {
      key: "id",
      text: "ID",
      cell:(record,index)=>{
        return index+1;
      }
    },
    {
      key: "customerEntity",
      text: "WORD"
    },
    {
      key: "customerEntity",
      text: "ACTION",
      cell: (record, index) => {
        return (
        <Fragment>
        <span className="btn badge-success mr-2 px-4"onClick={()=>this.EditUser(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
         <span className="btn badge-success  px-4" onClick={()=>this.EnableUser(record)}> <i className="fa fa-power-off mr-2"></i>Enable</span>
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
            Restricted words
            <small>These words should not be inside sms templates.</small>
          </div>
          <div className="flex-row">
          <Button onClick={this.ViewSenders} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">Add Word</Button>
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
                records={this.state.words}
                columns={this.columns}
                 />
            </CardBody>
          </Card>
        </Container>
      </ContentWrapper>
    );
  }
}

export default RestrictedWords;
