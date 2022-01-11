import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";
import axios from "../../../../services/axios";
import {
    Container, Card, CardHeader, CardBody, CardTitle, Button, Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";
import ReactDatatable from '@ashvin27/react-datatable';
import { Fragment } from "react";


class ManageUserType extends Component {
    state = {
        selectedRoles: [],
        role: 0,
        roleList: [],
        roleNames: [],
        userTypes: [],
        modal: false,
        mode: true,
        modal2: false,
        loading: true,
        openedUserType: 0,
        editedUserType: {
            id: 0,
            name: "",
            description: ""
        },
        userType: {
            name: "",
            description: ""
        },
        userTypeRoles: []
    };

    initialState = {
        userType: {
            name: "",
            description: ""
        }
    };

    componentDidMount() {
        this.getAllUserTypes();
        this.getAllRoles();
    }
    getAllUserTypes() {
        axios.get("/manage-roles/user-types")
            .then(res => {
                const userTypes = res.data;
                this.setState({ loading: false });
                this.setState({ userTypes });

            });
    }

    getAllRoles = () => {
        axios.get("/roles").then(res => {
            this.setState({ roleList: res.data });
        });
    };

    getRolesByUserType = (id) => {
        axios.get("/manage-roles/roles/" + id).then(res => {
            this.setState({ userTypeRoles: res.data });
            let roleNames = this.state.userTypeRoles.map(row => {
                return row.name;
                // this.setState({selectedRoles:row.id})
            });
            this.setState({ roleNames: [...roleNames] });
        });
    };

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    };


    toggleModal2 = () => {
        this.setState({ modal2: !this.state.modal2 });
    };


    AssignRoles = (row) => {
        console.log(row);
        this.setState({
            modal2: !this.state.modal2
        });

        this.setState({ openedUserType: row.id });
        this.getRolesByUserType(this.state.openedUserType);
        this.toggleModal2();
        
    };

    AddUserTypeMode = () => {
        this.setState({ mode: true });
        this.toggleModal();
    };

    EditUserType(row) {
        console.log(row);
        const editedUserType = {
            id: row.id,
            name: row.name,
            description: row.description
        };
        this.setState({ editedUserType: editedUserType });
        this.setState({ mode: false });
        this.toggleModal();
    }


    handleChange = event => {
        if (this.state.mode) {
            this.setState({
                userType: Object.assign({},
                    this.state.userType, { [event.target.name]: event.target.value })
            });
        } else {
            this.setState({
                editedUserType: Object.assign({}, this.state.editedUserType,
                    { [event.target.name]: event.target.value })
            });
        }
    };


    AssignRoleToUserType = (e) => {
        e.preventDefault();
        const data = {
            userTypeId: +this.state.openedUserType,
            roleId: [...new Set(this.state.selectedRoles)]
        };

        axios.post("/manage-roles/assign-role-to-user-type", data).then(res => {
            console.log("Done");
            
            this.setState({ selectedRoles: [] });
            this.setState({ roleNames: [] });
            setTimeout(() => {
                this.toggleModal2();
            }, 1000);
        }).catch(err => {
            console.log(err);
        });
    };

    // AssignRoles = (id) => {
    //     this.setState({openedUserType: id})
    // }

    HandleOnSelect = (e) => {
        e.preventDefault();

        let selected = e.target.options[e.target.selectedIndex].text;
        let selectedID = e.target.value;

        let roleNames = [...this.state.roleNames, selected];
        let roleIds = [...this.state.selectedRoles, +selectedID];
        this.setState({ selectedRoles: [...new Set(roleIds)] });
        this.setState({ roleNames: [...new Set(roleNames)] });
        console.log(this.state.selectedRoles);
    };



    handleSubmit = event => {
        event.preventDefault();
        this.toggleModal();
        if (this.state.mode) {
            axios.post("/manage-roles/add-user-type", this.state.userType).then(res => {
                console.log(res.data);
                this.getAllUserTypes();
                this.setState({ userType: this.initialState.userType });
            });
        } else {
            axios.put("/manage-roles/update-user-type", this.state.editedUserType).then(res => {
                console.log(res.data);
                this.getAllUserTypes();

            });
        }
    };

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
            key: "description",
            text: "DESCRIPTION"
        },
        {
            key: "id",
            text: "ACTION",
            cell: (record, index) => {
                return (
                    <Fragment>
                        <span className="btn badge-success mr-2 px-4" onClick={() => this.EditUserType(record)}> <i className="icon-pencil mr-2"  ></i>Edit</span>
                        <span className="btn bg-primary-dark" onClick={() => this.AssignRoles(record)}> <i className="fa fa-briefcase mr-2"></i>Assign Roles</span>
                    </Fragment>
                );
            }
        }
    ];

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
    };

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    };

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Manage User Types
                        <small>Manage user types in the system.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.AddUserTypeMode} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">
                            <i className="fa fa-plus mr-2"></i>
                            Add New User Type</Button>

                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>{this.state.mode ? "Add User Type" : "Edit User Type"}</ModalHeader>
                            <form onSubmit={this.handleSubmit}>
                                <ModalBody>
                                    <FormGroup>
                                        <label>User Type Name :</label>
                                        <input className="form-control" name="name"
                                            value={this.state.mode ? this.state.userType.name : this.state.editedUserType.name}
                                            onChange={this.handleChange} type="text" required></input>
                                    </FormGroup>

                                    <FormGroup>
                                        <label>Description :</label>
                                        <input className="form-control" name="description"
                                            value={this.state.mode ? this.state.userType.description : this.state.editedUserType.description}
                                            onChange={this.handleChange} type="text" required></input>
                                    </FormGroup>
                                    {/* <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Role Type : </label>
                    <select className="form-control" id="exampleFormControlSelect1" name="type"
                      onChange={this.handleChange}
                      value={this.state.mode? this.state.userType.type:this.state.editedUserType.type}
                    >
                      <option value="0">Select role</option>
                      <option value="Admin">Admin</option>
                      <option value="Customer_Admin">Customer Admin</option>
                      <option value="User">Normal User</option>
                    </select>
                  </div> */}
                                </ModalBody>
                                <ModalFooter>
                                    <button className="btn btn-sm btn-success mr-3  px-5" type="submit">
                                        Save
                                    </button>
                                </ModalFooter>
                            </form>
                        </Modal>

                        <Modal isOpen={this.state.modal2} toggle={this.toggleModal2}>
                            <ModalHeader toggle={this.toggleModal2}>Assign role to user type</ModalHeader>
                            <form onSubmit={this.AssignRoleToUserType}>
                                <ModalBody>
                                    <FormGroup>
                                        <label>Select Role :</label>
                                        <select className="form-control" name="role"
                                            value={this.state.role}
                                            onChange={this.HandleOnSelect} type="text" required>
                                            <option>--Select Role--</option>
                                            {
                                                this.state.roleList.map(row => {
                                                    return <option value={row.id}>{row.name}</option>;
                                                })
                                            }
                                        </select>

                                    </FormGroup>
                                    <div>
                                        <table className="">
                                            <h5>Selected roles</h5>
                                            {this.state.roleNames.map((row, i) => {
                                                return <span class="badge badge-pill badge-danger p-2 m-2">{row}</span>;

                                            })}
                                        </table>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <button className="btn btn-sm btn-success mr-3  px-5" type="submit">
                                        Save
                                    </button>
                                </ModalFooter>
                            </form>
                        </Modal>
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
                                records={this.state.userTypes}
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

export default ManageUserType;
