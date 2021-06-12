import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import { Container, Card, CardHeader, CardBody, CardTitle,Button } from "reactstrap";
import $ from "jquery";
import 'datatables.net-dt/css/jquery.dataTables.css'
import 'datatables.net-bs/css/dataTables.bootstrap.css'
$.DataTable = require('datatables.net')


class ReservedNumbers extends Component {
  state = {
  };

  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Reserved Numbers
            <small>Sms should not be sent to these numbers.</small>
          </div>
          <div className="flex-row">
          <Button outline color="danger" className="btn-pill-right">Add New Number</Button>
          </div>
        </div>
        <Container fluid>
          <Card>
            <CardHeader>
            </CardHeader>
            <CardBody>
              <Datatable>
                <table className="table table-striped my-4 w-100">
                  <thead>
                    <tr>
                      <th data-priority="1">ID</th>
                      <th>NUMBER</th>
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

export default ReservedNumbers;
