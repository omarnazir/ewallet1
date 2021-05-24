import React, {Component} from 'react';
import {withTranslation, Trans} from 'react-i18next';
import ContentWrapper from '../../../Layout/ContentWrapper';
import axios from "../../../../services/axios";
import {Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button} from 'reactstrap';
import EasyPieChart from 'easy-pie-chart';
import {Redirect} from 'react-router-dom';
import CardTool from '../../../Common/CardTool'
import Sparkline from '../../../Common/Sparklines';
import FlotChart from '../../../Common/Flot';
import Now from '../../../Common/Now';

class Dashboard extends Component {

    state = {
        barStackedData: [{
            "label": "Failed",
            "color": "#f05050",
            "data": [
                ["14", 86],
                ["15", 136],
                ["16", 97],
                ["17", 110],
                ["18", 62],
                ["19", 85],
                ["20", 115],
                ["21", 78],
                ["22", 104],
                ["23", 82],
                ["24", 97],
                ["25", 110],
                ["26", 62]
            ]
        }, {
            "label": "Pending",
            "color": "#23b7e5",
            "data": [
                ["14", 49],
                ["15", 81],
                ["16", 47],
                ["17", 44],
                ["18", 100],
                ["19", 49],
                ["20", 94],
                ["21", 44],
                ["22", 52],
                ["23", 17],
                ["24", 47],
                ["25", 44],
                ["26", 100]
            ]
        }, {
            "label": "Delivered",
            "color": "#37bc9b",
            "data": [
                ["14", 29],
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
                    barWidth: 0.6,
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
        dashboardData: {},

    }

    componentDidMount() {

        const token = sessionStorage.getItem('token');
        if (token == null || token.length === 0) {
            this.setState({redirect: '/login'});
        }


        axios.get("/dashboard/admin")
        .then(res => {
            const response = res.data;
            this.setState({ dashboardData: response })
            console.log(response);
        })


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

       
    
    
    }

    changeLanguage = lng => {
        this.props.i18n.changeLanguage(lng);
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    logout = () => {
        sessionStorage.clear();
        this.setState({redirect: '/login'});
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
                     <small>Welcome to esms</small>
                    </div>
                </div>
                <Row>
                    <Col xl={3} md={6}>
                        { /* START card */}
                        <div className="card flex-row align-items-center text-white align-items-stretch border-0">
                            <div
                                className="col-4 d-flex align-items-center bg-dark justify-content-center rounded-left">
                                <em className="icon-layers fa-3x"></em>
                            </div>
                            <div className="col-8 py-3 bg-dark rounded-right">
                                <div className="h2 mt-0">{this.state.dashboardData.totalMessageTemplates}</div>
                                <div className="text-uppercase">Message templates</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} md={6}>
                        { /* START card */}
                        <div className="card flex-row align-items-center align-items-stretch border-0">
                            <div
                                className="col-4 d-flex align-items-center bg-danger justify-content-center rounded-left">
                                <em className="icon-globe fa-3x"></em>
                            </div>
                            <div className="col-8 py-3 bg-danger rounded-right">
                                <div className="h2 mt-0">{this.state.dashboardData.totalTariffs}</div>
                                <div className="text-uppercase">Total tariffs</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} lg={6} md={12}>
                        <div className="card flex-row align-items-center align-items-stretch border-0">
                            <div
                                className="col-4 d-flex align-items-center bg-green justify-content-center rounded-left">
                                <em className="icon-bubbles fa-3x"></em>
                            </div>
                            <div className="col-8 py-3 bg-green rounded-right">
                                <div className="h2 mt-0">{this.state.dashboardData.totalSenderIds}</div>
                                <div className="text-uppercase">Sender ID's</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} lg={6} md={12}>
                        <div className="card flex-row align-items-center align-items-stretch border-0">
                            <div
                                className="col-4 d-flex align-items-center bg-info justify-content-center rounded-left">
                                <em className="icon-user fa-3x"></em>
                            </div>
                            <div className="col-8 py-3 bg-info rounded-right">
                                <div className="h2 mt-0">{this.state.dashboardData.totalCustomers}</div>
                                <div className="text-uppercase">Customers</div>
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
                                        <div className="card-title"> Messages statistics</div>
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
                               
                                <div className="">Delivery Success Rate</div>
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
                                    <span className="text-dark"> Over 18,000 sms sent</span>
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
