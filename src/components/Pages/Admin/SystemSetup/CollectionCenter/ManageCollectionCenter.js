import React, { Component } from "react";
import ContentWrapper from "../../../../Layout/ContentWrapper";
import axios from "../../../../../services/axios";
import {
    Container, Card, CardHeader, CardBody, Button} from "reactstrap";
import ReactDatatable from '@ashvin27/react-datatable';
import { Fragment } from "react";

class ManageCollectionCenter extends Component {
    state = {
        collectionCenterList: [],
        loading:true,
       
    };
    componentDidMount() {
        this.getAllCollectionCenters();
    }

    getAllCollectionCenters() {
        axios.get("/collection-centers")
            .then(res => {
                const collectionCenterList = res.data;
                this.setState({loading:false})
                this.setState({ collectionCenterList })

            })
    }

    EditCollectionCenter = (id) => {
        return this.props.history.push('/admin-edit-center/' + id,id)
      }

    columns = [
        {
            key: "id",
            text: "ID",
            cell: (record, index) => {
                return index + 1;
            }
        },
        {
            key: "name",
            text: "NAME"
        },
        {
            key: "district",
            text: "AMCOS",
            cell: (record, index) => {
                return (record.amcos.name);
            }
        },
        {
            key: "district",
            text: "MCU",
            cell: (record, index) => {
                return (record.amcos.mcos.name);
            }
        },
        {
            key: "ward",
            text: "REGISTRAR",
            cell: (record, index) => {
                return (record.amcos.registrarId.name);
            }
        },
        {
            key: "village",
            text: "VILLAGE",
            cell: (record, index) => {
                return (record.amcos.village.name);
            }
        },
        {
            key: "id",
            text: "ACTION",
            cell: (record, index) => {
                return (
                    <Fragment>
                        <span className="btn badge-success mr-2 px-4" onClick={() => this.EditCollectionCenter(record.id)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
                        <span className="btn bg-danger-dark  px-4" onClick={() => this.DeleteRegion(record.id)}> <i className="fa fa-trash mr-2"></i>Delete</span>
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
        pagination: 'advance',
        filename: "Contact List",
        button: {

        },
        language: {
            loading_text: "Please be patient while data loads..."
        }
    }

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

    AddCollectionCenter = () => {
        return this.props.history.push('/admin-add-center')
      }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Amcos Collection Centers
                        <small>Manage collection centers.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.AddCollectionCenter} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
                        <i className="fa fa-plus mr-2"></i>
                            Add Collection Center</Button>
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
                                records={this.state.collectionCenterList}
                                columns={this.columns}
                                loading={this.state.loading}
                            />
                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
        );
    }
}

export default ManageCollectionCenter;
