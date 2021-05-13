import React, {Component} from 'react';
import {withTranslation, Trans} from 'react-i18next';
import ContentWrapper from '../../Layout/ContentWrapper';
import {Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import EasyPieChart from 'easy-pie-chart';

import CardTool from '../../Common/CardTool'
import Sparkline from '../../Common/Sparklines';
import FlotChart from '../../Charts/Flot';
import Now from '../../Common/Now';

class UserDashboard extends Component {

    state = {
        flotData: [{
            "label": "Uniques",
            "color": "#768294",
            "data": [
                ["Mar", 70], ["Apr", 85], ["May", 59], ["Jun", 93], ["Jul", 66], ["Aug", 86], ["Sep", 60]
            ]
        }, {
            "label": "Recurrent",
            "color": "#1f92fe",
            "data": [
                ["Mar", 21], ["Apr", 12], ["May", 27], ["Jun", 24], ["Jul", 16], ["Aug", 39], ["Sep", 15]
            ]
        }],


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

        flotOptions: {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true,
                    radius: 4
                },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1,
                    fill: 0.5
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
                min: 0,
                max: 150, // optional: use it for a clear represetation
                tickColor: '#eee',
                //position: 'right' or 'left',
                tickFormatter: v => v /* + ' visitors'*/
            },
            shadowSize: 0
        },

        dropdownOpen: false

    }

    componentDidMount() {
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

    render() {
        // Usse t function instead of Trans component
        // const { t } = this.props;

        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Dashboard
                        <small>Welcome to esms</small>
                    </div>
                </div>
                { /* START cards box */}
                <Row>
                    <Col xl={3} md={6}>
                        { /* START card */}
                        <div className="card flex-row align-items-center text-white align-items-stretch border-0">
                            <div
                                className="col-4 d-flex align-items-center bg-dark justify-content-center rounded-left">
                                <em className="icon-layers fa-3x"></em>
                            </div>
                            <div className="col-8 py-3 bg-dark rounded-right">
                                <div className="h2 mt-0">1,700</div>
                                <div className="text-uppercase">Purchased Sms</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} md={6}>
                        { /* START card */}
                        <div className="card flex-row align-items-center align-items-stretch border-0">
                            <div
                                className="col-4 d-flex align-items-center bg-info justify-content-center rounded-left">
                                <em className="icon-bubble fa-3x"></em>
                            </div>
                            <div className="col-8 py-3 bg-info rounded-right">
                                <div className="h2 mt-0">800</div>
                                <div className="text-uppercase">Message Sent</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} lg={6} md={12}>
                        { /* START card */}
                        <div className="card flex-row align-items-center align-items-stretch border-0">
                            <div
                                className="col-4 d-flex align-items-center bg-danger justify-content-center rounded-left">
                                <em className="icon-bubble fa-3x"></em>
                            </div>
                            <div className="col-8 py-3 bg-danger rounded-right">
                                <div className="h2 mt-0">8,500</div>
                                <div className="text-uppercase">Message Failed</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} lg={6} md={12}>
                        { /* START card */}
                        <div className="card flex-row align-items-center align-items-stretch border-0">
                            <div
                                className="col-4 d-flex align-items-center bg-green justify-content-center rounded-left">
                                <em className="icon-bubbles fa-3x"></em>
                            </div>
                            <div className="col-8 py-3 bg-green rounded-right">
                                <div className="h2 mt-0">500</div>
                                <div className="text-uppercase">Message Balance</div>
                            </div>
                        </div>
                    </Col>
                    
                </Row>
                { /* END cards box */}
                <Row>
                    { /* START dashboard main content */}
                    <Col xl={9}>
                        { /* START chart */}
                        <Row>
                            <Col xl={12}>
                                { /* START card */}
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
                                { /* END widget */}
                            </Col>
                        </Row>
                        { /* END chart */}
                    </Col>
                    { /* END dashboard main content */}
                    { /* START dashboard sidebar */}
                    <Col xl={3}>
                        { /* START loader widget */}
                        <div className="card card-default">
                            <div className="card-body">
                               
                                <div className="">Delivery Success Rate</div>
                                <div className="text-center py-4">
                                    <div ref="easypie" data-percent="70" className="easypie-chart easypie-chart-lg">
                                        <span>70%</span>
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
                        { /* END loader widget */}
                    </Col>
                    { /* END dashboard sidebar */}
                </Row>
            </ContentWrapper>
        );
    }
}

export default withTranslation('translations')(UserDashboard);
