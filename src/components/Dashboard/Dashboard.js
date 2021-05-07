import React, {Component} from 'react';
import {withTranslation, Trans} from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import {Row, Col, Button} from 'reactstrap';
import EasyPieChart from 'easy-pie-chart';
import {Redirect} from 'react-router-dom';

import CardTool from '../Common/CardTool'
import Sparkline from '../Common/Sparklines';
import FlotChart from '../Charts/Flot';

class Dashboard extends Component {

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

        dropdownOpen: false,
        redirect: null
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token == null || token.length === 0) {
            this.setState({redirect: '/login'});
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
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    logout = () => {
        localStorage.removeItem('token');
        this.setState({redirect: '/login'});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Dashboard
                        <small><Trans i18nKey='dashboard.WELCOME'></Trans></small>
                    </div>
                    <div className="ml-auto">
                        <Button onClick={this.logout} color="danger" size="sm">Logout</Button>
                    </div>
                </div>
                { /* START cards box */}
                <Row>
                    <Col xl={3} md={6}>
                        { /* START card */}
                        <div className="card flex-row align-items-center text-white align-items-stretch border-0">
                            <div
                                className="col-4 d-flex align-items-center bg-dark justify-content-center rounded-left">
                                <em className="icon-cloud-upload fa-3x"></em>
                            </div>
                            <div className="col-8 py-3 bg-dark rounded-right">
                                <div className="h2 mt-0">1,700</div>
                                <div className="text-uppercase">Requested message templates</div>
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
                                <div className="h2 mt-0">800</div>
                                <div className="text-uppercase">Total tariffs</div>
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
                                <div className="text-uppercase">Sender ID's</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} lg={6} md={12}>
                        { /* START card */}
                        <div className="card flex-row align-items-center align-items-stretch border-0">
                            <div
                                className="col-4 d-flex align-items-center bg-info justify-content-center rounded-left">
                                <em className="icon-user fa-3x"></em>
                            </div>
                            <div className="col-8 py-3 bg-info rounded-right">
                                <div className="h2 mt-0">8,500</div>
                                <div className="text-uppercase">Post paid customers</div>
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
                                        <div className="card-title">Inbound messages statistics</div>
                                    </div>
                                    <div className="card-body">
                                        <FlotChart data={this.state.flotData} options={this.state.flotOptions}
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
                                <a className="text-muted float-right" href="">
                                    <em className="fa fa-arrow-right"></em>
                                </a>
                                <div className="text-info">Average Monthly Messages</div>
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
                                    <em className="fa fa-upload fa-fw"></em>
                                    <span>This Month</span>
                                    <span className="text-dark">18,000 Messages</span>
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

export default withTranslation('translations')(Dashboard);
