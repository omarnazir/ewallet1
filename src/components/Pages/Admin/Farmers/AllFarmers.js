import React, { Component } from "react";
import ContentWrapper from "../../../Layout/ContentWrapper";

import { Container, Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import Moment from 'moment';
import ReactDatatable from '@ashvin27/react-datatable';
import { ExportReactCSV } from "../../../Common/ReactCSV";
import { AuthService, FarmersService } from '../../../../services';
import { Redirect } from 'react-router-dom';
import axios from "../../../../services/axios";

class AllFarmers extends Component {
  state = {
    farmersList: [],
    farmersReport: [],
    loading: true,
    trackId: null,
    formSearch: {
      startDate: "",
      endDate: "",
      msisdn: "",
      amcos: ""
    },
    amcosList: [],
    mcuList: [],
    mcuId: 0,
    amcosId: 0
  };

  componentDidMount() {
    const isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      this.setState({ redirect: "/login" });
    }

    let data = {
      "limit": ""
    };

    this.GetAllMCU()



    FarmersService.getAllFarmers(data).then(res => {
      console.log(res.data);
      this.setState({ loading: false });
      this.setState({ farmersList: res.data.results });
      this.setState({ trackId: res.data.trackId });
    });
  }

  GetAllMCU = () => {
    axios.get('/mcos').then(res => {
      this.setState({ mcuList: res.data });
    });
  };

  GetMCUAmcos = (id) => {
    axios.get('/amcos/mcos/' + id).then(res => {
      this.setState({ amcosList: res.data });
    });
  };

  handleOnComplexChange = (e) => {
    e.preventDefault();
    if ([e.target.name] == "mcos") {
      this.GetMCUAmcos(e.target.value);
      this.setState({ amcosId: 0 });
    }

    if ([e.target.name] == "amcos") {
      this.setState({ amcosId: e.target.value });
    }
  }

  handleOnChange = (e) => {
    e.preventDefault();
    this.setState({ formSearch: { ...this.state.formSearch, [e.target.name]: e.target.value } });
    console.log(this.state.formSearch);
  }

  searchFromFarmers = () => {
    this.setState({loading:true})
    // let data = {...this.state.formSearch}

    let data = {
      startDate: this.state.formSearch.startDate,
      endDate: this.state.formSearch.endDate,
      amcos: +this.state.amcosId
    }

    console.log(data)

    FarmersService.getAllFarmers(data).then(res=>{
      this.setState({loading:false})
      this.setState({farmersList:res.data.results})
      this.setState({trackId: res.data.trackId})

      console.log(res.data.results)
    })
  }

  loadMoreData = trackId => {
    this.setState({ loading: true });
    const data = {
      trackId
    };

    console.log(data);

    FarmersService.getAllFarmers(data).then(res => {
      this.setState({ loading: false });
      this.setState({ trackId: res.data.trackId });
      this.setState({ farmersList: res.data.results });
    });
  };


  onGenerateReportClick = () => {
    let farmersReportData = this.state.farmersList.map(farmer => {
      console.log(farmer);
      farmer.amcos = farmer.amcos.name;
      farmer.district = farmer.district.name;
      farmer.region = farmer.region.name;
      farmer.mainCrop = farmer.mainCrop.name;
      farmer.secondaryCrop = farmer.secondaryCrop.name;
      farmer.village = farmer.village.name;
      farmer.ward = farmer.ward.name;

      return farmer;
    });

    this.setState({ farmersReport: farmersReportData });
  };




  reportFilename = `FARMER_${new Date().toLocaleTimeString()}.csv`;

  formatDate = (date) => {
    return Moment(date).format('lll');
  };

  ViewCustomerDetails = (row) => {
    return this.props.history.push('/admin-farmer-details/' + row.id, row);
  };

  AddFarmer = () => {
    return this.props.history.push("/admin-add-farmer");
  };


  AddActionButtonStyle = {
    color: 'white',
    background: "#003366"
  };

  config = {
    page_size: 25,
    length_menu: [25, 50, 100],
    show_filter: true,
    show_pagination: true,
    pagination: 'advance',
    filename: "Contact List",
    button: {
      // excel: true,
      // print: true,
      // csv: true
    },
    language: {
      loading_text: "Please be patient while data loads..."
    }
  };

  ucFirst = (str) => {
    if (!str) return str;
    if (str.trim() == "undefined") return "";
    return str[0].toUpperCase() + str.slice(1);
  };



  columns = [
    {
      key: "id",
      text: "#",
      sortable: true,
      cell: (record, index) => {
        return index + 1;
      }
    },
    {
      key: "firstName",
      text: "FULL NAME",
      cell: (record, index) => {
        // const firstName=record.firstName;
        // const middleName=record.middleName=="undefined"?" ":record.middleName;
        // const lastName=record.surname;
        // return (record.firstName +" "+record.middleName+" "+record.surname)
        // return this.ucFirst(firstName)+" "+this.ucFirst(middleName)+" "+this.ucFirst(lastName);
        return this.ucFirst(record.firstName);
      }
    },
    {
      key: "middleName",
      text: "MIDDLE NAME",
      cell: (record, index) => {
        return this.ucFirst(record.middleName);
      }
    },
    {
      key: "surname",
      text: "LAST NAME",
      cell: (record, index) => {
        return this.ucFirst(record.surname);
      }
    },
    {
      key: "sex",
      text: "GENDER",
    },
    {
      key: "dateOfBirth",
      text: "AGE",
    },
    {
      key: "msisdn",
      text: "PHONE NUMBER",
    },
    {
      key: "memberID",
      text: "MEMBER ID",
    },
    {
      key: "mainCrop",
      text: "MAIN CROP",
      cell: (record, index) => {

        try {
          return (record.mainCrop.name);
        } catch (error) {
          return 'N/A';
        }
      }
    },
    {
      key: "registrationDate",
      text: "DATE REGISTERED",
      sortable: true,
      cell: (record, index) => {
        return (this.formatDate(record.registrationDate));
      }
    },
    {
      key: "id",
      text: "ACTION",
      cell: (record, index) => {
        return (
          <Button style={{
            color: 'white',
            background: "#003366"
          }} className="btn btn-success"
            onClick={() => {
              this.ViewCustomerDetails(record);
            }}
          >
            <i className="fa fa-eye"></i>
          </Button>
        );
      }
    }

  ];


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <ContentWrapper>
        <div className="content-heading">
          <div className="mr-auto flex-row">
            Farmers List
            <small>Showing all farmers.</small>
          </div>
          <div className="flex-row">
            <Button onClick={this.AddFarmer} style={this.AddActionButtonStyle} className="btn-pill-right">
              <i className="fa fa-plus mr-2"></i>
              Register Farmer </Button>
            <span onClick={this.onGenerateReportClick} >
              <ExportReactCSV csvData={this.state.farmersReport} fileName={this.reportFilename} />
            </span>
          </div>
        </div>
        <div className="">
          {/* <div>
            <label>Search Options</label>
            <select className="form-control col-6" >
              <option value="none" >Search Options</option>
              <option value="date" >Date created</option>
              <option value="phone">Phone Number</option>
              <option value="amcos">AMCOS</option>
              <option value="member">Member ID</option>
              <option value="all">View all Options</option>
            </select>
          </div> */}
          <form className="my-3">
            <div className="form-row">
              <div className="col-2 date">
                <label>From</label>
                <input onChange={this.handleOnChange} type="date" name="startDate" className="form-control" placeholder="Start Date" />
              </div>
              <div className="col-2 date">
                <label>To</label>
                <input onChange={this.handleOnChange} type="date" name="endDate" className="form-control" placeholder="End Date" />
              </div>
              <div className="col-2 phone">
                <label>MCU</label>
                <select className="form-control" name="mcos" onChange={this.handleOnComplexChange}>
                  <option>--Select MCU--</option>
                  {
                    this.state.mcuList.map(row => {
                      return (
                        <option value={row.id}>{row.name}</option>
                      );
                    })
                  }
                </select>
              </div>
              <div className="col-2 amcos">
                <label>AMCOS</label>
                <select className="form-control" name="amcos" onChange={this.handleOnComplexChange}>
                  <option>--Select AMCOS--</option>
                  {
                    this.state.amcosList.map(row => {
                      return (
                        <option value={row.id}>{row.name}</option>
                      );
                    })
                  }
                </select>
              </div>

              <div className="col-2 d-flex align-items-end">
                <input onClick={this.searchFromFarmers} className="btn btn-success form-control" value="Search Farmer" />
              </div>
            </div>
          </form>
        </div>
        <Container fluid>
          <Card>
            <CardHeader>
              <div className="d-flex flex-row justify-content-end">
                <button onClick={() => this.loadMoreData(this.state.trackId)} className="btn btn-success" >Load More Data</button>
              </div>
            </CardHeader>
            <CardBody>

              <ReactDatatable
                extraButtons={this.extraButtons}
                config={this.config}
                records={this.state.farmersList}
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

export default AllFarmers;
