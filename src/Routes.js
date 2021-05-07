import React, {Suspense, lazy} from 'react';
import {withRouter, Switch, Route, Redirect} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import PageLoader from './components/Common/PageLoader';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';

const waitFor = Tag => props => <Tag {...props}/>;

const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const Operators = lazy(() => import('./components/Operators/List'));
const Sms = lazy(() => import('./components/Sms/List'));
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));

const listofPages = [
    '/login',
    '/register'
];

const Routes = ({location}) => {
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = {enter: 500, exit: 500};

    const animationName = 'rag-fadeIn'

    if (listofPages.indexOf(location.pathname) > -1) {
        return (
            // Page Layout component wrapper
            <BasePage>
                <Suspense fallback={<PageLoader/>}>
                    <Switch location={location}>
                        <Route path="/login" component={waitFor(Login)}/>
                        <Route path="/register" component={waitFor(Register)}/>
                    </Switch>
                </Suspense>
            </BasePage>
        )
    } else {
        return (
            <Base>
                <TransitionGroup>
                    <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={false}>
                        <div>
                            <Suspense fallback={<PageLoader/>}>
                                <Switch location={location}>
                                    <Route path="/dashboard" component={waitFor(Dashboard)}/>
                                    <Route path="/operators-list" component={waitFor(Operators)}/>
                                    <Route path="/sms" component={waitFor(Sms)}/>
                                    <Redirect to="/dashboard"/>
                                </Switch>
                            </Suspense>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Base>
        )
    }
}

export default withRouter(Routes);