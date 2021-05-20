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
import CustomerDetails from './components/Customers/CustomerList/CustomerDetails';
import SmsTemplatesRequested from './components/SmsTemplates/SmsTemplatesRequested';


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
                                    <Route path="/admin/dashboard" component={waitFor(Dashboard)} />

                                    <Route path="/admin/mobile-operators" component={waitFor(MobileOperator)} />
                                    <Route path="/admin/sms-log" component={waitFor(Sms)} />

                                    <Route path="/admin/customers-list" component={waitFor(CustomerList)} />
                                    <Route path="/admin/customers-details/1" component={waitFor(CustomerDetails)}/>
                                    <Route path="/admin/customers-postpaid" component={waitFor(PostPaidCustomers)} />
                                    <Route path="/admin/transactions" component={waitFor(Transactions)} />


                                    <Route path="/admin/add-senderid" component={waitFor(AddSenderId)} />
                                    <Route path="/admin/senders" component={waitFor(Senders)} />


                                    <Route path="/admin/add-sms-templates" component={waitFor(AddSmsTemplate)} />
                                    <Route path="/admin/senders-requested" component={waitFor(SendersRequested)} />
                                    <Route path="/admin/sms-requested-templates" component={waitFor(SmsTemplatesRequested)}/>
                                    <Route path="/admin/sms-templates" component={waitFor(SmsTemplates)} />

                                    <Route path="/admin/add-tariff" component={waitFor(AddTarriff)} />
                                    <Route path="/admin/manage-tariffs" component={waitFor(Tariffs)} />
                                    <Route path="/admin/add-tariff-band" component={waitFor(AddTariffBand)} />
                                    <Route path="/admin/manage-tariff-bands" component={waitFor(TariffBand)} />


                                    <Route path="/admin/add-new-user" component={waitFor(AddUser)} />
                                    <Route path="/admin/manage-users" component={waitFor(UsersManagement)} />
                                    <Route path="/admin/restricted-words" component={waitFor(RestrictedWords)} />
                                    <Route path="/admin/reserved-numbers" component={waitFor(ReservedNumbers)} />


                                {/* User Roles -{type Prepaid & Post Paid}  */}

                                <Route path="/dashboard" component={waitFor(UserDashboard)}/>
                                <Route path="/senderId" component={waitFor(UserSenderIds)}/>
                                <Route path="/add-senderId" component={waitFor(AddUserSenderId)}/>


                                <Route path="/send-sms" component={waitFor(SendSmsCompose)}/>
                                <Route path="/outbox" component={waitFor(UserOutbox)}/>
                                <Route path="/scheduled-sms" component={waitFor(UserScheduledSms)}/>
                                <Route path="/contact-lists" component={waitFor(UserContactList)}/>
                                <Route path="/add-contact-list" component={waitFor(AddUserContactList)}/>

                                <Route path="/sms-purchase" component={waitFor(PurchaseSms)}/>


                                <Route path="/add-user" component={waitFor(AddNormalUser)}/>
                                <Route path="/manage-user" component={waitFor(UserPage)}/>

                                <Route path="/prepaid-invoices" component={waitFor(PrePaidInvoiceList)}/>


                                <Route path="/sms-requests" component={waitFor(UserRequestedSmsList)}/>
                                <Route path="/add-sms-request" component={waitFor(AddUserRequestedSms)}/>
                                



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