import React, { Component } from "react";
import ContentWrapper from "../../../../Layout/ContentWrapper";
import axios from "../../../../../services/axios";
import {
    Container,
    Card,
    CardBody,
    Button,
    Row,
    Col,
    CardFooter
} from "reactstrap";
import FormValidator from '../../../../Common/FormValidator';
import {SuccessAlert,DeleteAlert} from "../../../../Common/AppAlerts";

class AddCollectionCenter extends Component {

    state = {
        collectionCenterName:"",
        amcosId: '',
        regionId: '',
        districtId: '',
        wardId: '',
        villageId: '',
        registrarId: '',

        regions: [],
        districts: [],
        wards: [],
        villages: [],
        amcos: [],
        crops: [],
        registrars: [],
        mcos: []

    }

    componentDidMount() {
        this.getAllRegions();
    }

    getAllMCOS() {
        axios.get("/mcos").then(res => { this.setState({ mcos: res.data }) })
    }

    getAllAmcosByVillage(id) {
        axios.get("/amcos/byVillage/" + id).then(res => { this.setState({ mcos: res.data }) })

    }

    getAllRegions() {
        axios.get("/regions").then(res => { this.setState({ regions: res.data }) })
    }

    getAllDistrictsByRegion(id) {
        axios.get("/regions/" + id + "/districts").then(res => { this.setState({ districts: res.data }) })
    }
    getAllWardsByDistrict(id) {
        axios.get("/wards/byDistrict/" + id).then(res => { this.setState({ wards: res.data }) })
    }
    getAllVillagesByWard(id) {
        axios.get("/villages/byWard/" + id).then(res => this.setState({ villages: res.data }))
    }

    handleComplexChange = event => {

        console.log("Field Name: " + [event.target.name] + " Field Value: " + [event.target.value])
        if ([event.target.name] == "regionId") {
            this.getAllDistrictsByRegion([event.target.value]);
            this.setState({ districtId: 0 });
            this.setState({ wardId: 0 });
            this.setState({ villageId: 0 });

            this.setState({ regionId: event.target.value });

        }
        if ([event.target.name] == "districtId") {
            this.getAllWardsByDistrict([event.target.value]);
            this.setState({ wardId: 0 })
            this.setState({ villageId: 0 })

            this.setState({ districtId: event.target.value })
        }
        if ([event.target.name] == "wardId") {
            this.getAllVillagesByWard([event.target.value]);
            this.setState({ villageId: 0 })

            this.setState({ wardId: event.target.value })
        }

        if (event.target.name == "villageId") {
            this.setState({ villageId: event.target.value })
            this.getAllAmcosByVillage([event.target.value])

        }
    }


    validateOnChange = event => {
        const input = event.target;
        const form = input.form
        const value = input.type === 'checkbox' ? input.checked : input.value;

        const result = FormValidator.validate(input);

        if (result != null) {
            this.setState({
                [form.name]: {
                    ...this.state[form.name],
                    [input.name]: value,
                    errors: {
                        ...this.state[form.name].errors,
                        [input.name]: result
                    }
                }
            });
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = e => {
        e.preventDefault()
        const form = e.target;
        const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT'].includes(i.nodeName))

        const { errors, hasError } = FormValidator.bulkValidate(inputs)

        this.setState({
            [form.name]: {
                ...this.state[form.name],
                errors
            }
        });

        console.log(hasError ? 'Form has errors. Check!' : 'Form Submitted!')


        if (!hasError) {
            const collectionCenter = {
                "name": this.state.collectionCenterName,
                "amcos_id": this.state.amcosId,
                "village_id": this.state.villageId
            }      
            axios.post("/collection-centers", collectionCenter).then(res => {
                SuccessAlert("Added Collection Center Successfully")
                this.ViewAllAmcos();
            })
        }
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }


    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method]
    }

    ViewAllAmcos = () => {
        return this.props.history.push('/admin-collection-centers')
    }

    AddActionButtonStyle = {
        color: 'white',
        background: "#003366"
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div className="mr-auto flex-row">
                        Add New Collection Center
                        <small>Adding a new collection center.</small>
                    </div>
                    <div className="flex-row">
                        <Button onClick={this.ViewAllAmcos} style={this.AddActionButtonStyle} className="btn-pill-right mr-2">View All Collection Center</Button>
                    </div>
                </div>
                <Container fluid>
                <form className="mb-3" onSubmit={this.onSubmit}>
                    <Card className="pure-form card-default">
                        <CardBody>
                        
                                <Row>
                                    <Col md={4}>
                                        <div className="form-group">
                                            <label>Region <span className="red">*</span> </label>
                                            <select name="regionId" className="form-control" value={this.state.regionId} onChange={this.handleComplexChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.regions.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                            <span className="text-danger">{this.state.regionIdError}</span>
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <div className="form-group">
                                            <label>District <span className="red">*</span> </label>
                                            <select name="districtId" className="form-control" value={this.state.districtId} onChange={this.handleComplexChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.districts.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                            <span className="text-danger">{this.state.districtIdError}</span>
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <div className="form-group">
                                            <label>Ward <span className="red">*</span> </label>
                                            <select name="wardId" className="form-control" value={this.state.wardId} onChange={this.handleComplexChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.wards.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                            <span className="text-danger">{this.state.wardIdError}</span>
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <div className="form-group">
                                            <label>Village <span className="red">*</span> </label>
                                            <select name="villageId" className="form-control" value={this.state.villageId} onChange={this.handleComplexChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.villages.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                            <span className="text-danger">{this.state.villageIdError}</span>
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <div className="form-group">
                                            <label>Amcos<span className="red">*</span> </label>
                                            <select name="amcosId" className="form-control" value={this.state.amcosId} onChange={this.handleChange}>
                                                <option value="">-- Select --</option>
                                                {
                                                    this.state.mcos.map((data, index) => {
                                                        return <option key={index} value={data.id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                            <span className="text-danger">{this.state.amcosIdError}</span>
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <div className="form-group">
                                            <label>Collection Center Name <span className="red">*</span></label>
                                            <input placeholder="Write collection center name ..."
                                                name="collectionCenterName"
                                                className="form-control"
                                                onChange={this.handleChange}
                                                value={this.state.collectionCenterName} 
                                                required/>
                                            <span className="text-danger">{this.state.nameError}</span>
                                        </div>
                                    </Col>
                                </Row>

                           
                        </CardBody>
                        <CardFooter>
                            <div className="d-flex align-items-center">
                                <div className="ml-auto">
                                    <button className="btn btn-danger px-5 mr-2" onClick={this.ViewAllAmcos}>Cancel</button>
                                    <button type="submit" style={this.AddActionButtonStyle} className="btn btn-primary px-5">Save</button>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                    </form>

                </Container>
            </ContentWrapper>
        );
    }
}

export default AddCollectionCenter;
