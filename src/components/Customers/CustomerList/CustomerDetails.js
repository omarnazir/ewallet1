import React, { Component } from "react";
import ContentWrapper from "../../Layout/ContentWrapper";
import Datatable from "../../Common/Datatable";
import {
    Container, Card, CardHeader, CardBody, CardTitle, Button, FormGroup,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import classnames from 'classnames';
import $ from "jquery";
import axios from "../../../services/axios";


class CustomerDetails extends Component {
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
        customersList: [],
        contactLists: [],
        activeTab: '1',
    };

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    handleClickActiveTab = event => {
        const newActiveTab = event.target.tab;
        this.setState({
            activeTab: newActiveTab,
        })
    }

    componentDidMount() {
        axios.get("/customers")
            .then(res => {
                const response = res.data;
                this.setState({ customersList: response })
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
                         Customer Details : Wilson Kifua
            <small>Showing all customer details.</small>
                    </div>
                    <div className="flex-row d-block d-md-flex">
                        <Button onClick={this.ViewRequestedSenders} className="btn btn-pill mr-2 bg-danger">Disable Customer</Button>
                        <Button onClick={this.AddSenderId} style={this.AddActionButtonStyle} className="btn-pill-right">View All Customers</Button>
                    </div>
                </div>
                <Container fluid>
                

                            <div role="tabpanel card card-body">
                                {/* Nav tabs */}
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggleTab('1'); }}>
                                            <span className="icon-people mr-2"></span>
                                             Customer Details
                                            </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggleTab('2'); }}>
                                            <span className="icon-wallet mr-2"></span>
                                              Transactions
                                            </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '3' })}
                                            onClick={() => { this.toggleTab('3'); }}>
                                            <span className="fa fa-users mr-2"></span>
                                                 User Accounts
                                            </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                       
                                            <table className="table table-striped my-4 w-100">
                                                <thead>
                                                    <tr>
                                                        <th data-priority="1">#</th>
                                                        <th>CUSTOMER NAME</th>
                                                        <th>EMAIL</th>
                                                        <th className="sort-numeric">PHONE</th>
                                                        <th className="sort-alpha" data-priority="2">
                                                            ADDRESS
                      </th>
                                                        <th>STATUS</th>
                                                        <th>DATE REGISTERED</th>
                                                        <th>SMSC ID</th>
                                                        <th>ACTION</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.customersList.map(row => (
                                                        <tr key={row.id}>
                                                            <td>{row.id}</td>
                                                            <td>{row.fullname}</td>
                                                            <td>{row.email}</td>
                                                            <td>{row.phonenumber}</td>
                                                            <td>{row.location}</td>
                                                            {/* <td>{row.isActive}</td> */}
                                                            <td>{row.isActive == 1 &&
                                                                <span className="badge badge-success">Active</span>
                                                            }
                                                                {row.isActive != 1 &&
                                                                    <span className="badge badge-danger">Disabled</span>
                                                                }
                                                            </td>

                                                            <td>{row.startDate}</td>
                                                            <td>VODAPORTAL</td>
                                                            <td>
                                                                <a className="btn btn-success" href="#" role="button">
                                                                    {/* <i className="fa fa-arrow-right"></i> */}
                                                                    <i className="fa fa-eye"></i>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                      

                                    </TabPane>
                                    <TabPane tabId="2"> 
                                    <table className="table table-striped my-4 w-100">
                                                <thead>
                                                    <tr>
                                                        <th data-priority="1">#</th>
                                                        <th>DATE</th>
                                                        <th>TXN ID</th>
                                                        <th>TYPE</th>
                                                        <th>SMS</th>
                                                        <th>RECEIPT</th>
                                                        <th>MSISDN</th>
                                                        <th>AMOUNT</th> 
                                                        <th>STATUS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                   

                                                </tbody>
                                            </table>
                                        
                                    </TabPane>
                                    <TabPane tabId="3">
                                       
                                    <table className="table table-striped my-4 w-100">
                                                <thead>
                                                    <tr>
                                                        <th data-priority="1">#</th>
                                                        <th>FULL NAME</th>
                                                        <th>USERNAME</th>
                                                        <th className="sort-numeric">SMS MONTHLY LIMIT</th>
                                                        
                                                        <th>STATUS</th>
                                                        <th>LAST LOGIN</th>
                                                      
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                   

                                                </tbody>
                                            </table>
                                    </TabPane>

                                </TabContent>
                            </div>


                      
                </Container>
            </ContentWrapper>
        );
    }
}

export default CustomerDetails;
