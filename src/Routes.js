import React, {Suspense, lazy} from 'react';
import {withRouter, Switch, Route, Redirect} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import PageLoader from './components/Common/PageLoader';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';
import CustomerList from './components/Customers/CustomerList/CustomerList';
import PostPaidCustomers from './components/Customers/PostPaid/PostPaidCustomers';
import Senders from './components/Senders/Senders';
import ReservedNumbers from './components/Settings/ReservedNumbers';
import RestrictedWords from './components/Settings/RestrictedWords';
import SmsTemplates from './components/SmsTemplates/SmsTemplates';
import Tariffs from './components/Tarriffs/Tariffs';
import Transactions from './components/Transactions/Transactions';
import UsersManagement from './components/Users/UsersManagement';
import MobileOperator from './components/Settings/MobileOperator';

const waitFor = Tag => props => <Tag {...props}/>;

const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
// const Operators = lazy(() => import('./components/Operators/List'));
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
                                    {/* <Route path="/dashboard" component={waitFor(Dashboard)}/> */}
                                    <Route path="/dashboard" component={waitFor(Dashboard)}/>
                                    
                                    <Route path="/mobile-operators" component={waitFor(MobileOperator)}/>
                                    <Route path="/all-sms" component={waitFor(Sms)}/>

                                    <Route path="/customers-list" component={waitFor(CustomerList)}/>
                                    <Route path="/customers-postpaid" component={waitFor(PostPaidCustomers)}/>
                                    <Route path="/transactions" component={waitFor(Transactions)}/>
                                    <Route path="/senders" component={waitFor(Senders)} />
                                    <Route path="/sms-templates" component={waitFor(SmsTemplates)}/>
                                    <Route path="/manage-tariffs" component={waitFor(Tariffs)}/>
                                    <Route path="/manage-users" component={waitFor(UsersManagement)}/>
                                    <Route path="/restricted-words" component={waitFor(RestrictedWords)}/>
                                    <Route path="/reserved-numbers" component={waitFor(ReservedNumbers)}/>

                                    
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