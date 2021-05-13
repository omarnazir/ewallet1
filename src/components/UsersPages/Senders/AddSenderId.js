import React, { Component } from "react";
import ContentWrapper from "../../Layout/ContentWrapper";
import {
  Container,
  Card,
  Col,
  CardHeader,
  CardBody,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Input,
  Textarea,
  FormGroup,
  Button,
} from "reactstrap";
import Datetime from "react-datetime";
import $ from "jquery";
import { Link, Redirect } from "react-router-dom";



class AddUserSenderId extends Component {
  state = {
    displayColorPicker: false,
    displayColorPickerInput: false,
    colorSelected: "#00AABB",

    selectedOption: "",
    selectedOptionMulti: [],
  };

  ViewSenderIds = () => {
    return this.props.history.push("/user/senderId");
  };

  render() {
    const { editorState } = this.state;
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Add Sender Id
            <small>Create a sender id .</small>
          </div>
          <div className="flex-row">
            <Button
              onClick={this.ViewSenderIds}
              outline
              color="danger"
              className="btn-pill-right"
            >
              View Sender Ids
            </Button>
          </div>
        </div>
        <Container fluid>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <Card className="card-default">
                <CardBody>
                  <form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <label>Sender Id:</label>
                      <Input type="text" placeholder="" />
                    </FormGroup>
                    
                    <button className="btn btn-sm btn-secondary mr-3 outline" type="submit">
                      Save Sender Id
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={this.ViewSenderIds}>
                      Cancel
                    </button>
                  </form>
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      </ContentWrapper>
    );
  }
}

export default AddUserSenderId;
