import React, {Component} from 'react';
import {withTranslation, Trans} from 'react-i18next';
import ContentWrapper from '../../../Layout/ContentWrapper';
import {Row, Col} from 'reactstrap';
import EasyPieChart from 'easy-pie-chart';
import {Redirect} from 'react-router-dom';
import CardTool from '../../../Common/CardTool'
import Sparkline from '../../../Common/Sparklines';
import FlotChart from '../../../Common/Flot';
import { AuthService,DashboardService } from '../../../../services';




class Dashboard extends Component {

    state = {
        barStackedData: [ {
            "label": "Regions",
            "color": "#37bc9b",
            "data": []
        }],
        barStackedData2: [ {
            "label": "Regions",
            "color": "#37bc9b",
            "data": [
                ["Arusha", 29],
                ["15", 56],
                ["16", 14],
                ["17", 21],
                ["18", 5],
                ["19", 24],
                ["20", 37],
                ["21", 22],
                ["22", 28],
                ["23", 9],
                ["24", 14],
                ["25", 21],
                ["26", 5]
            ]
        }],
        barStackedOptions: {
            series: {
                stack: true,
                bars: {
                    align: 'center',
                    lineWidth: 0,
                    show: true,
                    barWidth: 0.1,
                    fill: 0.9
                }
            },
            grid: {
                borderColor: '#eee',
                borderWidth: 1,
                hoverable: true,
                backgroundColor: '#fcfcfc'
            },
            tooltip: true,
            tooltipOpts: {
                content: (label, x, y) => x + ' : ' + y
            },
            xaxis: {
                tickColor: '#fcfcfc',
                mode: 'categories'
            },
            yaxis: {
                // position: 'right' or 'left'
                tickColor: '#eee'
            },
            shadowSize: 0
        },
        dropdownOpen: false,
        dashboardData: {}
    }

    componentDidMount() {
        
        const isAuthenticated = AuthService.isAuthenticated();
        if (!isAuthenticated) {
          this.setState({ redirect: "/login" })
        }

        // Easy pie
        let pieOptions1 = {
            animate: {
                duration: 800,
                enabled: true
            },
            barColor: '#23b7e5',
            trackColor: 'rgba(200,200,200,0.4)',
            scaleColor: false,
            lineWidth: 10,
            lineCap: 'round',
            size: 145
        };
        new EasyPieChart(this.refs.easypie, pieOptions1);
       
        this.getDashboardData();
        this.getDashboardChartData();
    }

    getDashboardData=()=>{
        DashboardService.getAdminDashboard().then(res=>{
            this.setState({ dashboardData: res.data })
        })
    }

    getDashboardChartData=()=>{
        DashboardService.getDashboardChartData().then(res=>{
            const result=res.data;
            const finalResult=[];
            result.forEach(item => {
               const itemArray=[];
               itemArray.push(item.region)
               itemArray.push(item.farmers);
               finalResult.push(itemArray);
              
            });
           const barStackedData=[ {
                "label": "Regions",
                "color": "#37bc9b",
                "data": finalResult
            }]
            this.setState({barStackedData})
        })
    }

    changeLanguage = lng => {
        this.props.i18n.changeLanguage(lng);
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    logout=()=>{
        SenderIdService.logout().then((res) => {
            this.setState({redirect:"/login"})
        }, (err) => {
            this.setState({redirect:"/login"})
        })
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
       
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>
                    Dashboard
                     <small>Welcome to mkulima platform</small>
                    </div>
                </div>
                <Row>
                    <Col xl={3} md={6}>
                        { /* START card */}
                        <div className="card flex-row align-items-center text-white align-items-stretch border-0">
                            <div
                                className="col-4 d-flex align-items-center bg-dark justify-content-center rounded-left">
                                <em className="icon-people fa-3x"></em>
                            </div>
                            <div className="col-8 py-3 bg-dark rounded-right">
                                <div className="h2 mt-0">{this.state.dashboardData.totalFarmers}</div>
                                <div className="text-uppercase">FARMERS</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} md={6}>
                        { /* START card */}
                        <div className="card flex-row align-items-center align-items-stretch border-0">
                            <div
                                className="col-4 d-flex align-items-center bg-danger justify-content-center rounded-left">
                                <em className="fa fa-building fa-3x"></em>
                            </div>
                            <div className="col-8 py-3 bg-danger rounded-right">
                                <div className="h2 mt-0">{this.state.dashboardData.totalMcos}</div>
                                <div className="text-uppercase">MCU</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} lg={6} md={12}>
                        <div className="card flex-row align-items-center align-items-stretch border-0">
                            <div
                                className="col-4 d-flex align-items-center bg-green justify-content-center rounded-left">
                                <em className="icon-layers fa-3x"></em>
                            </div>
                            <div className="col-8 py-3 bg-green rounded-right">
                                <div className="h2 mt-0">{this.state.dashboardData.totalAmcos}</div>
                                <div className="text-uppercase">AMCOS</div>
                            </div>
                        </div>
                    </Col>
                     <Col xl={3} lg={6} md={12}>
                        <div className="card flex-row align-items-center align-items-stretch border-0">
                            <div
                                className="col-4 d-flex align-items-center bg-info justify-content-center rounded-left">
                                <em className="fa fa-dice-six fa-3x"></em>
                            </div>
                            <div className="col-8 py-3 bg-info rounded-right">
                            <div className="h2 mt-0">{this.state.dashboardData.totalCollectionCenters}</div>
                                <div className="text-uppercase">COLLECTION CENTERS</div>
                            </div>
                        </div>
                    </Col> 
                </Row>
                <Row>
                    <Col xl={9}>
                        <Row>
                            <Col xl={12}>
                                <div className="card card-default">
                                    <div className="card-header">
                                        <CardTool refresh onRefresh={(_, done) => setTimeout(done, 2000)}/>
                                        <div className="card-title"> Farmer Statistics</div>
                                    </div>
                                    <div className="card-body">
                                        <FlotChart data={this.state.barStackedData} options={this.state.barStackedOptions} 
                                                   height="250px"/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={3}>
                        <div className="card card-default">
                            <div className="card-body">
                               
                                <div className="">Platform USSD Success Rate</div>
                                <div className="text-center py-4">
                                    <div ref="easypie" data-percent="70" className="easypie-chart easypie-chart-lg">
                                        <span>98%</span>
                                    </div>
                                </div>
                                <Sparkline options={{
                                    barColor: '#23b7e5',
                                    height: 30,
                                    barWidth: 5,
                                    barSpacing: 2
                                }}
                                           values="5,4,8,7,8,5,4,6,5,5,9,4,6,3,4,7,5,4,7"
                                           className="text-center"/>
                            </div>
                            <div className="card-footer">
                                <p className="text-muted">
                                    <span className="text-dark"> Over 18,000 USSD sessions</span>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </ContentWrapper>
        );
    }
}

export default withTranslation('translations')(Dashboard);
