/*!
 *
 * Angle - Bootstrap Admin Template
 *
 * Version: 4.8
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

// App Routes
import Routes from '../src/routers/Routes';
import { Redirect } from 'react-router-dom';

// Vendor dependencies
import "./Vendor";
// Application Styles
import './styles/bootstrap.scss';
import './styles/app.scss'
// import 'src/styles/custom.styles.css';
import IdleTimer from './services/IdleTimeout';



class App extends Component {

    state = {
        isTimeout: false,
        timeExpiring: 0
    };

    timer = new IdleTimer(600, () => {
        this.setState({
            isTimeout: true
        });
    });




    render() {
        const basename = process.env.NODE_ENV === 'development' ? '/' : (PUBLIC_URL || '/');

        return (

            <BrowserRouter basename={basename}>
                {this.state.isTimeout ? <Redirect to="/login" /> : <Routes />}
                {/* <Routes /> */}
            </BrowserRouter>
        );
    }
}

export default App;
