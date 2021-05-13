import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import PageLoader from './components/Common/PageLoader';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';
import CustomerList from './components/Customers/CustomerList/CustomerList';
import PostPaidCustomers from './components/Customers/PostPaid/PostPaidCustomers';
import Senders from './components/Senders/Senders';
import ReservedNumbers from './components/Settings/ReservedNumbers';
import RestrictedWords from './components/Settings/RestrictedWords';
import SmsTemplates from './components/SmsTemplates/SmsTemplates';
import Tariffs from './components/Tarriffs/Tarriff/Tariffs';
import Transactions from './components/Transactions/Transactions';
import UsersManagement from './components/Users/UsersManagement';
import MobileOperator from './components/Settings/MobileOperator';
import SendersRequested from './components/Senders/SendersRequested';
import AddSenderId from './components/Senders/AddSenderId';
import AddTarriff from './components/Tarriffs/Tarriff/AddTarriff';
import AddUser from './components/Users/AddUser';
import AddSmsTemplate from './components/SmsTemplates/AddSmsTemplate';
import AddTariffBand from './components/Tarriffs/TarriffBand/AddTariffBand';
import TariffBand from './components/Tarriffs/TarriffBand/TariffBand';
import UserDashboard from './components/UsersPages/Dashboard/UserDashboard';
import UserSenderIds from './components/UsersPages/Senders/Senders';
import AddUserSenderId from './components/UsersPages/Senders/AddSenderId';
import UserOutbox from './components/UsersPages/Sms/Outbox/UserOutbox';
import UserScheduledSms from './components/UsersPages/Sms/ScheduledSms/UserScheduledSms';
import UserContactList from './components/UsersPages/Contactlist/UserContactlist';
import AddUserContactList from './components/UsersPages/Contactlist/AddUserContactlist';
import UserPage from './components/UsersPages/User/UserPage';
import PurchaseSms from './components/UsersPages/Sms/PurchaseSmsPrePaid/PurchaseSms';
import PrePaidInvoiceList from './components/UsersPages/InvoicesPrePaid/PrePaidInvoiceList';
import AddUserRequestedSms from './components/UsersPages/Sms/RequestedSms/AddUserRequestedSms';
import UserRequestedSmsList from './components/UsersPages/Sms/RequestedSms/UserRequestedSmsList';
import AddNormalUser from './components/UsersPages/User/AddUser';
import SendSmsCompose from './components/UsersPages/Sms/SendSms/SendSms';


const waitFor = Tag => props => <Tag {...props} />;

const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
// const Operators = lazy(() => import('./components/Operators/List'));
const Sms = lazy(() => import('./components/Sms/List'));
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));

const listofPages = [
    '/login',
    '/register'
];

const Routes = ({ location }) => {
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = { enter: 500, exit: 500 };

    const animationName = 'rag-fadeIn'

    if (listofPages.indexOf(location.pathname) > -1) {
        return (
            // Page Layout component wrapper
            <BasePage>
                <Suspense fallback={<PageLoader />}>
                    <Switch location={location}>
                        <Route path="/login" component={waitFor(Login)} />
                        <Route path="/register" component={waitFor(Register)} />
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
                            <Suspense fallback={<PageLoader />}>
                                <Switch location={location}>
                                    {/* <Route path="/dashboard" component={waitFor(Dashboard)}/> */}
                                    <Route path="/dashboard" component={waitFor(Dashboard)} />

                                    <Route path="/mobile-operators" component={waitFor(MobileOperator)} />
                                    <Route path="/all-sms" component={waitFor(Sms)} />

                                    <Route path="/customers-list" component={waitFor(CustomerList)} />
                                    <Route path="/customers-postpaid" component={waitFor(PostPaidCustomers)} />
                                    <Route path="/transactions" component={waitFor(Transactions)} />


                                    <Route path="/add-senderid" component={waitFor(AddSenderId)} />
                                    <Route path="/senders" component={waitFor(Senders)} />


                                    <Route path="/add-sms-templates" component={waitFor(AddSmsTemplate)} />
                                    <Route path="/senders-requested" component={waitFor(SendersRequested)} />
                                    <Route path="/sms-templates" component={waitFor(SmsTemplates)} />

                                    <Route path="/add-tariff" component={waitFor(AddTarriff)} />
                                    <Route path="/manage-tariffs" component={waitFor(Tariffs)} />
                                    <Route path="/add-tariff-band" component={waitFor(AddTariffBand)} />
                                    <Route path="/manage-tariff-bands" component={waitFor(TariffBand)} />


                                    <Route path="/add-new-user" component={waitFor(AddUser)} />
                                    <Route path="/manage-users" component={waitFor(UsersManagement)} />
                                    <Route path="/restricted-words" component={waitFor(RestrictedWords)} />
                                    <Route path="/reserved-numbers" component={waitFor(ReservedNumbers)} />


                                {/* User Roles -{type Prepaid & Post Paid}  */}

                                <Route path="/user/dashboard" component={waitFor(UserDashboard)}/>
                                <Route path="/user/senderId" component={waitFor(UserSenderIds)}/>
                                <Route path="/user/add-senderId" component={waitFor(AddUserSenderId)}/>


                                <Route path="/user/send-sms" component={waitFor(SendSmsCompose)}/>
                                <Route path="/user/outbox" component={waitFor(UserOutbox)}/>
                                <Route path="/user/scheduled-sms" component={waitFor(UserScheduledSms)}/>
                                <Route path="/user/contact-list" component={waitFor(UserContactList)}/>
                                <Route path="/user/add-contact-list" component={waitFor(AddUserContactList)}/>

                                <Route path="/user/sms-purchase" component={waitFor(PurchaseSms)}/>


                                <Route path="/user/add-user" component={waitFor(AddNormalUser)}/>
                                <Route path="/user/manage-user" component={waitFor(UserPage)}/>

                                <Route path="/user/prepaid-invoices" component={waitFor(PrePaidInvoiceList)}/>


                                <Route path="/user/sms-requested" component={waitFor(UserRequestedSmsList)}/>
                                <Route path="/user/add-sms-request" component={waitFor(AddUserRequestedSms)}/>



                                {/*
                                <Route path="/summary-reports" component={waitFor(SmsSummaryReports)}/>
                                <Route path="/sender-reports" component={waitFor(SenderReports)}/>
                                */}

                                    <Redirect to="/dashboard" />
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